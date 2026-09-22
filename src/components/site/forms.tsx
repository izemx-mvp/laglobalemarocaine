import { useState, type FormEvent } from "react";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function LeadForm({ quote = false }: { quote?: boolean }) {
  const [success, setSuccess] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [product, setProduct] = useState("");
  function submit(e: FormEvent) {
    e.preventDefault();
    if (!name.trim() || !email.includes("@") || (quote && !product)) return;
    setSuccess(true);
  }
  if (success)
    return (
      <div
        role="status"
        className="flex min-h-80 flex-col items-center justify-center rounded-lg bg-secondary p-10 text-center animate-in fade-in zoom-in"
      >
        <CheckCircle2 className="size-14 text-primary" />
        <h2 className="mt-5 text-3xl font-bold">Demande bien reçue</h2>
        <p className="mt-3 max-w-md text-muted-foreground">
          Merci {name}. Notre équipe prendra connaissance de votre message et vous répondra dans les
          meilleurs délais ouvrés.
        </p>
        <Button variant="outline" className="mt-7" onClick={() => setSuccess(false)}>
          Envoyer une autre demande
        </Button>
      </div>
    );
  return (
    <form onSubmit={submit} className="grid gap-5" noValidate>
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label={quote ? "Nom / Société" : "Nom complet"} required>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            aria-invalid={!name && undefined}
            className="h-12"
            placeholder={quote ? "Votre nom ou entreprise" : "Votre nom"}
          />
        </Field>
        <Field label="E-mail" required>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            required
            className="h-12"
            placeholder="vous@entreprise.ma"
          />
        </Field>
      </div>
      {quote && (
        <>
          <div className="grid gap-5 sm:grid-cols-2">
            <Field label="Téléphone">
              <Input type="tel" className="h-12" placeholder="+212 ..." />
            </Field>
            <Field label="Type de produit" required>
              <Select value={product} onValueChange={setProduct} required>
                <SelectTrigger className="h-12">
                  <SelectValue placeholder="Sélectionner" />
                </SelectTrigger>
                <SelectContent>
                  {[
                    "Films plastiques",
                    "Sacs industriels",
                    "Housses de protection",
                    "Gaines plastiques",
                    "Films pour serres",
                    "Autre besoin",
                  ].map((x) => (
                    <SelectItem key={x} value={x}>
                      {x}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </Field>
          </div>
          <Field label="Quantité / volume envisagé">
            <Input className="h-12" placeholder="Précisez l’unité ou la cadence souhaitée" />
          </Field>
        </>
      )}
      <Field label={quote ? "Votre besoin" : "Message"} required>
        <Textarea
          required
          className="min-h-36 resize-y"
          placeholder={
            quote
              ? "Dimensions, épaisseur, usage, contraintes techniques, délai souhaité…"
              : "Comment pouvons-nous vous aider ?"
          }
        />
      </Field>
      <p className="text-xs text-muted-foreground">Les champs marqués d’un * sont obligatoires.</p>
      <Button type="submit" variant="cta" size="lg" className="w-full sm:w-fit">
        {quote ? "Envoyer ma demande" : "Envoyer le message"} <Send />
      </Button>
    </form>
  );
}
function Field({
  label,
  required,
  children,
}: {
  label: string;
  required?: boolean;
  children: React.ReactNode;
}) {
  return (
    <label className="grid gap-2 text-sm font-medium">
      {label}
      {required ? " *" : ""}
      {children}
    </label>
  );
}
