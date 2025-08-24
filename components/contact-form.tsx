"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import EditableContent from '@/components/editable-content';

type ContactFormProps = {
  initialContent?: Record<string, string | undefined>;
};

export default function ContactForm({ initialContent = {} }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formData = new FormData(e.currentTarget);
    
    // Honeypot check - if website field is filled, it's likely spam
    if (formData.get('website')) {
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: formData.get('email'),
          phone: formData.get('phone'),
          message: formData.get('message'),
        }),
      });

      if (response.ok) {
        toast({
          title: "Zpráva odeslána!",
          description: "Děkujeme za vaši zprávu. Ozveme se vám co nejdříve.",
        });
        (e.target as HTMLFormElement).reset();
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      console.log('Contact form error:', error);
      toast({
        title: "Chyba při odesílání",
        description: "Zkuste to prosím znovu nebo nás kontaktujte telefonicky.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-2xl mx-auto">
      <EditableContent
        id="contact.form.title"
        as="h3"
        className="text-2xl font-light text-black mb-6 text-center"
        placeholder="Potřebujete pomoc s instalacemi, topením nebo opravami?"
        initialValue={initialContent["contact.form.title"]}
      />
      <EditableContent
        id="contact.form.desc1"
        as="p"
        className="text-neutral-600 mb-8 text-center"
        placeholder={
          "Jako kvalifikovaný instalatér a topenář vám osobně pomůžu s jakýmkoliv problémem. Napište mi a já se vám co nejdříve ozvu na telefon."
        }
        initialValue={initialContent["contact.form.desc1"]}
      />
      <EditableContent
        id="contact.form.desc2"
        as="p"
        className="text-sm text-neutral-500 mb-8 text-center"
        placeholder="Pracuji v Praze a okolí."
        initialValue={initialContent["contact.form.desc2"]}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-neutral-700">
              Váš e-mail <span className="text-neutral-400">(pro emailovou odpověď)</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              className="mt-2"
              placeholder="vas@email.cz"
            />
          </div>
          
          <div>
            <Label htmlFor="phone" className="text-sm font-medium text-neutral-700">
              Váš telefon <span className="text-red-500">*</span>
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              required
              className="mt-2"
              placeholder="+420 123 456 789"
            />
          </div>
        </div>

        <div>
          <Label htmlFor="message" className="text-sm font-medium text-neutral-700">
            Zpráva <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="message"
            name="message"
            required
            rows={5}
            className="mt-2"
            placeholder="Popište prosím váš problém nebo požadavek..."
          />
        </div>

        {/* Honeypot field - hidden from users */}
        <input
          type="text"
          name="website"
          style={{ display: 'none' }}
          tabIndex={-1}
          autoComplete="off"
        />

        <div className="text-center">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-medium rounded-full transition-colors"
          >
            {isSubmitting ? 'Odesílám...' : (
              <EditableContent
                id="contact.form.button"
                as="span"
                className="inline"
                placeholder="Poslat poptávku"
                initialValue={initialContent["contact.form.button"]}
              />
            )}
          </Button>
        </div>

        <EditableContent
          id="contact.form.footnote"
          as="p"
          className="text-xs text-neutral-500 text-center"
          placeholder="* Označená pole jsou povinná"
          initialValue={initialContent["contact.form.footnote"]}
        />
      </form>
    </div>
  );
}