import React from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";
import { Instagram, Facebook, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

const INSTAGRAM_URL = "https://www.instagram.com/rkl_lambardosofficial/";
const FACEBOOK_URL = "https://www.facebook.com/";

export default function SignupFormDemo() {
  const { toast } = useToast();
  const [form, setForm] = React.useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    toast({ title: "Kiitos!", description: "Viestisi on lähetetty. Otamme yhteyttä pian." });
    setForm({ name: "", email: "", phone: "", message: "" });
  };

  return (
    <div className="w-full max-w-lg rounded-lg border border-border bg-card p-6 shadow-lg md:rounded-xl md:p-8">
      <h2 className="text-xl font-bold text-foreground">
        Lähetä viesti
      </h2>
      <p className="mt-2 max-w-sm text-sm text-muted-foreground">
        Vastaamme yhteydenottoihin nopeasti. Voit myös soittaa tai tavata meidät some-kanavillamme.
      </p>

      <form className="my-8" onSubmit={handleSubmit}>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="name">Nimi *</Label>
          <Input
            id="name"
            placeholder="Etu- ja sukunimi"
            type="text"
            required
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="focus-ring-primary focus-visible:ring-0"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="email">Sähköposti *</Label>
          <Input
            id="email"
            placeholder="sahkoposti@esimerkki.fi"
            type="email"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="focus-ring-primary focus-visible:ring-0"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-4">
          <Label htmlFor="phone">Puhelin</Label>
          <Input
            id="phone"
            placeholder="040 123 4567"
            type="tel"
            value={form.phone}
            onChange={(e) => setForm({ ...form, phone: e.target.value })}
            className="focus-ring-primary focus-visible:ring-0"
          />
        </LabelInputContainer>
        <LabelInputContainer className="mb-8">
          <Label htmlFor="message">Viesti *</Label>
          <Textarea
            id="message"
            placeholder="Kerro projektistasi tai kysymyksestäsi..."
            required
            rows={4}
            value={form.message}
            onChange={(e) => setForm({ ...form, message: e.target.value })}
            className="min-h-[100px] resize-none focus-ring-primary focus-visible:ring-0"
          />
        </LabelInputContainer>

        <Button type="submit" size="lg" className="w-full group/btn relative">
          Lähetä viesti
          <Send className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
        </Button>

        <div className="my-8 h-[1px] w-full bg-gradient-to-r from-transparent via-border to-transparent" />

        <div className="flex flex-col space-y-4">
          <a
            href={INSTAGRAM_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn relative flex h-10 w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-4 font-medium transition-colors hover:bg-muted"
          >
            <Instagram className="h-4 w-4" />
            <span className="text-sm">Seuraa Instagramissa</span>
            <BottomGradient />
          </a>
          <a
            href={FACEBOOK_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn relative flex h-10 w-full items-center justify-center gap-2 rounded-md border border-border bg-background px-4 font-medium transition-colors hover:bg-muted"
          >
            <Facebook className="h-4 w-4" />
            <span className="text-sm">Seuraa Facebookissa</span>
            <BottomGradient />
          </a>
        </div>
      </form>
    </div>
  );
}

const BottomGradient = () => (
  <>
    <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-primary to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
  </>
);

const LabelInputContainer = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <div className={cn("flex w-full flex-col space-y-2", className)}>
    {children}
  </div>
);
