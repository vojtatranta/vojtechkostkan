"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import EditableContent from '@/components/editable-content';
import { useLang } from '@/components/lang-context';

type ContactFormProps = {
  initialContent?: Record<string, string | undefined>;
  initialContentCs?: Record<string, string | undefined>;
  initialContentEn?: Record<string, string | undefined>;
};

export default function ContactForm({ initialContent = {}, initialContentCs, initialContentEn }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const byLoc = (id: string) => ({ cs: initialContentCs?.[id], en: initialContentEn?.[id] });
  const { locale } = useLang();

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
        placeholderByLocale={{ cs: "Potřebujete pomoc s instalacemi, topením nebo opravami?", en: "Need help with installations, heating or repairs?" }}
        initialValue={initialContent["contact.form.title"]}
        initialValueByLocale={byLoc("contact.form.title")}
      />
      <EditableContent
        id="contact.form.desc1"
        as="p"
        className="text-neutral-600 mb-8 text-center"
        placeholder={
          "Jako kvalifikovaný instalatér a topenář vám osobně pomůžu s jakýmkoliv problémem. Napište mi a já se vám co nejdříve ozvu na telefon."
        }
        placeholderByLocale={{
          cs: "Jako kvalifikovaný instalatér a topenář vám osobně pomůžu s jakýmkoliv problémem. Napište mi a já se vám co nejdříve ozvu na telefon.",
          en: "As a qualified plumber and heating technician, I'll personally help you with any issue. Send me a message and I'll get back to you as soon as possible.",
        }}
        initialValue={initialContent["contact.form.desc1"]}
        initialValueByLocale={byLoc("contact.form.desc1")}
      />
      <EditableContent
        id="contact.form.desc2"
        as="p"
        className="text-sm text-neutral-500 mb-8 text-center"
        placeholder="Pracuji v Praze a okolí."
        placeholderByLocale={{ cs: "Pracuji v Praze a okolí.", en: "I work in Prague and nearby." }}
        initialValue={initialContent["contact.form.desc2"]}
        initialValueByLocale={byLoc("contact.form.desc2")}
      />

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <Label htmlFor="email" className="text-sm font-medium text-neutral-700">
              {locale === 'cs' ? 'Váš e-mail' : 'Your email'} <span className="text-neutral-400">{locale === 'cs' ? '(pro emailovou odpověď)' : '(for email reply)'}</span>
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              className="mt-2"
              placeholder={locale === 'cs' ? 'vas@email.cz' : 'your@email.com'}
            />
          </div>
          
          <div>
            <Label htmlFor="phone" className="text-sm font-medium text-neutral-700">
              {locale === 'cs' ? 'Váš telefon' : 'Your phone'} <span className="text-red-500">*</span>
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
            {locale === 'cs' ? 'Zpráva' : 'Message'} <span className="text-red-500">*</span>
          </Label>
          <Textarea
            id="message"
            name="message"
            required
            rows={5}
            className="mt-2"
            placeholder={locale === 'cs' ? 'Popište prosím váš problém nebo požadavek...' : 'Please describe your issue or request...'}
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
                placeholderByLocale={{ cs: 'Poslat poptávku', en: 'Send request' }}
                initialValue={initialContent["contact.form.button"]}
                initialValueByLocale={byLoc("contact.form.button")}
              />
            )}
          </Button>
        </div>

        <EditableContent
          id="contact.form.footnote"
          as="p"
          className="text-xs text-neutral-500 text-center"
          placeholder="* Označená pole jsou povinná"
          placeholderByLocale={{ cs: '* Označená pole jsou povinná', en: '* Required fields' }}
          initialValue={initialContent["contact.form.footnote"]}
          initialValueByLocale={byLoc("contact.form.footnote")}
        />
      </form>
    </div>
  );
}