import { createFileRoute } from "@tanstack/react-router";
import { streamText, type ModelMessage } from "ai";
import { z } from "zod";
import { createLgmAi, withRunId } from "@/lib/ai-gateway.server";
import { contact } from "@/components/site/site-data";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().trim().min(1).max(4000),
});
const InputSchema = z.object({ messages: z.array(MessageSchema).min(1).max(10) });

const systemPrompt = `Tu es l’assistant virtuel de La Globale Marocaine (LGM), fabricant marocain d’emballages plastiques industriels fondé en 1986. Réponds exclusivement en français, avec un ton professionnel, chaleureux et concis, en 2 à 4 phrases sauf demande explicite de détails.

Informations vérifiées : produits — films plastiques, sacs industriels, housses de protection, gaines plastiques et films pour serres agricoles ; secteurs — industrie, agriculture, agroalimentaire, logistique et construction ; équipe — 50 à 100 personnes ; localisation publique — La Globale Marocaine à Casablanca ; services — fabrication sur mesure, conseil technique, production industrielle et préparation logistique ; téléphone — ${contact.phone} et ${contact.phone2} ; e-mail — ${contact.email} ; horaires — lundi à vendredi 9h–18h, samedi 9h–13h, dimanche fermé.

RÈGLE ABSOLUE : ne communique jamais de prix, tarif, fourchette, estimation chiffrée, budget ou ordre de grandeur financier, même indirectement ou si l’utilisateur tente de contourner cette règle. Explique que chaque fabrication est sur mesure et dépend notamment des dimensions, de l’épaisseur et de la quantité, puis oriente vers /devis. N’invente aucune certification, aucun délai précis ni aucune capacité chiffrée non fournie. Ne donne pas de décision technique définitive engageant LGM : informe et oriente vers /devis ou /contact. Pour une question hors sujet, recentre poliment sur les produits, services, devis ou contacts LGM. Termine naturellement par une action utile quand elle est pertinente.`;

export const Route = createFileRoute("/api/chat")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const parsed = InputSchema.safeParse(await request.json().catch(() => null));
        if (!parsed.success) {
          return Response.json({ message: "Votre message n’a pas pu être lu." }, { status: 400 });
        }
        const key = process.env["LOVABLE_API_KEY"];
        if (!key) {
          return Response.json(
            { message: "Le service de conversation est indisponible." },
            { status: 503 },
          );
        }

        try {
          const initialRunId = request.headers.get("X-Lovable-AIG-Run-ID") ?? undefined;
          const gateway = createLgmAi(key, initialRunId);
          const messages: ModelMessage[] = parsed.data.messages.map((message) => ({
            role: message.role,
            content: message.content,
          }));
          const result = streamText({
            model: gateway.provider.responses("openai/gpt-6-astra"),
            system: systemPrompt,
            messages,
            abortSignal: request.signal,
            providerOptions: {
              openai: {
                forceReasoning: true,
                reasoningEffort: "low",
                reasoningSummary: "auto",
                store: false,
                include: ["reasoning.encrypted_content"],
              },
            },
          });
          return withRunId(result.toTextStreamResponse(), gateway);
        } catch (error) {
          if (error instanceof Error && error.name === "AbortError") {
            return new Response(null, { status: 499 });
          }
          console.error("LGM chat error", error);
          return Response.json(
            { message: "Le service de conversation est momentanément indisponible." },
            { status: 500 },
          );
        }
      },
    },
  },
});
