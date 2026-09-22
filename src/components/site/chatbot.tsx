import { useState } from "react";
import { Bot, X } from "lucide-react";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import { Message, MessageContent, MessageResponse } from "@/components/ai-elements/message";
import {
  PromptInput,
  PromptInputFooter,
  PromptInputSubmit,
  PromptInputTextarea,
} from "@/components/ai-elements/prompt-input";
import { Shimmer } from "@/components/ai-elements/shimmer";
import { Button } from "@/components/ui/button";
import { contact } from "./site-data";

type ChatMessage = { id: string; role: "user" | "assistant"; content: string };

const welcome: ChatMessage = {
  id: "welcome",
  role: "assistant",
  content:
    "Bonjour 👋 Je suis l'assistant de La Globale Marocaine. Posez-moi vos questions sur nos produits, nos services ou notre entreprise — je suis là pour vous aider.",
};

export function Chatbot() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([welcome]);
  const [status, setStatus] = useState<"ready" | "submitted" | "streaming" | "error">("ready");

  async function sendMessage(text: string) {
    const trimmed = text.trim();
    if (!trimmed || status === "submitted" || status === "streaming") return;

    const userMessage: ChatMessage = { id: crypto.randomUUID(), role: "user", content: trimmed };
    const history = [...messages, userMessage].slice(-10);
    setMessages((current) => [...current, userMessage]);
    setStatus("submitted");

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: history.map(({ role, content }) => ({ role, content })),
        }),
      });
      if (!response.ok || !response.body) throw new Error("Chat indisponible");

      const assistantId = crypto.randomUUID();
      setMessages((current) => [...current, { id: assistantId, role: "assistant", content: "" }]);
      setStatus("streaming");
      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let content = "";
      while (true) {
        const chunk = await reader.read();
        if (chunk.done) break;
        content += decoder.decode(chunk.value, { stream: true });
        setMessages((current) =>
          current.map((message) =>
            message.id === assistantId ? { ...message, content } : message,
          ),
        );
      }
      setStatus("ready");
    } catch {
      setStatus("error");
      setMessages((current) => [
        ...current,
        {
          id: crypto.randomUUID(),
          role: "assistant",
          content: `Désolé, je rencontre un souci technique. Vous pouvez nous contacter directement au ${contact.phone} ou via notre [formulaire de contact](/contact).`,
        },
      ]);
    }
  }

  return (
    <div className="fixed bottom-5 right-5 z-50">
      <Button
        size="icon"
        onClick={() => setOpen((current) => !current)}
        aria-label={open ? "Fermer l’assistant" : "Ouvrir LGM Assistant"}
        aria-expanded={open}
        className="h-14 w-14 rounded-full animate-pulse-ring shadow-xl"
      >
        {open ? <X /> : <Bot />}
      </Button>
      {open && (
        <section
          aria-label="LGM Assistant"
          className="absolute bottom-17 right-0 flex h-[min(620px,calc(100svh-7rem))] w-[min(400px,calc(100vw-2rem))] flex-col overflow-hidden rounded-lg border bg-background shadow-2xl"
        >
          <header className="flex shrink-0 items-center gap-3 bg-primary-dark p-4 text-primary-foreground">
            <span className="grid size-10 place-items-center rounded-full bg-primary-foreground/10">
              <Bot aria-hidden="true" />
            </span>
            <div>
              <h2 className="font-semibold">LGM Assistant</h2>
              <p className="text-xs text-primary-foreground/75">Information & orientation</p>
            </div>
          </header>
          <Conversation className="min-h-0">
            <ConversationContent className="gap-5 p-5">
              {messages.map((message) => (
                <Message key={message.id} from={message.role}>
                  <MessageContent
                    className={
                      message.role === "user" ? "bg-primary text-primary-foreground" : undefined
                    }
                  >
                    <MessageResponse>{message.content}</MessageResponse>
                  </MessageContent>
                </Message>
              ))}
              {status === "submitted" && (
                <Message from="assistant">
                  <MessageContent>
                    <Shimmer>Je vous réponds…</Shimmer>
                  </MessageContent>
                </Message>
              )}
            </ConversationContent>
            <ConversationScrollButton aria-label="Revenir au dernier message" />
          </Conversation>
          <div className="shrink-0 border-t bg-background p-3">
            <PromptInput
              onSubmit={async ({ text }) => {
                await sendMessage(text);
              }}
              className="bg-secondary/50"
            >
              <PromptInputTextarea
                aria-label="Votre message"
                placeholder="Posez votre question…"
                disabled={status === "submitted" || status === "streaming"}
                className="min-h-16"
              />
              <PromptInputFooter className="justify-between">
                <span className="text-xs text-muted-foreground">Entrée pour envoyer</span>
                <PromptInputSubmit
                  status={status}
                  disabled={status === "submitted" || status === "streaming"}
                  aria-label="Envoyer le message"
                />
              </PromptInputFooter>
            </PromptInput>
          </div>
        </section>
      )}
    </div>
  );
}
