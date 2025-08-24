import * as React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Section,
  Text,
  Hr,
} from "@react-email/components";

interface ContactEmailProps {
  email?: string | null;
  phone: string;
  message: string;
  submittedAt?: string;
  siteDomain?: string;
}

export default function ContactEmail({
  email,
  phone,
  message,
  submittedAt,
  siteDomain,
}: ContactEmailProps) {
  const safeMessage = (message || "").split("\n").map((line, idx) => (
    <React.Fragment key={idx}>
      {line}
      <br />
    </React.Fragment>
  ));

  return (
    <Html>
      <Head />
      <Body style={styles.body}>
        <Container style={styles.container}>
          <Section>
            <Text style={styles.h1}>Nová zpráva z kontaktního formuláře</Text>
          </Section>

          <Section style={styles.card}>
            <Text style={styles.label}>Telefon</Text>
            <Text style={styles.value}>{phone}</Text>

            <Hr style={styles.hr} />

            <Text style={styles.label}>E-mail</Text>
            <Text style={styles.value}>{email || "Nezadán"}</Text>

            <Hr style={styles.hr} />

            <Text style={styles.label}>Zpráva</Text>
            <Text style={styles.message}>{safeMessage}</Text>
          </Section>

          <Section>
            <Text style={styles.footer}>
              Odesláno: {submittedAt || new Date().toLocaleString("cs-CZ")} • Web: {siteDomain || 'vojtechkostkan.cz'}
            </Text>
          </Section>
        </Container>
      </Body>
    </Html>
  );
}

const styles: Record<string, React.CSSProperties> = {
  body: {
    backgroundColor: "#f6f6f6",
    margin: 0,
    padding: "24px",
    fontFamily:
      "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
    color: "#111827",
  },
  container: {
    maxWidth: "560px",
    margin: "0 auto",
  },
  h1: {
    fontSize: "22px",
    fontWeight: 700,
    margin: 0,
    marginBottom: "12px",
  },
  card: {
    backgroundColor: "#ffffff",
    borderRadius: 12,
    padding: "20px",
    border: "1px solid #e5e7eb",
  },
  label: {
    fontSize: "12px",
    textTransform: "uppercase",
    letterSpacing: 0.6,
    color: "#6b7280",
    marginBottom: 4,
  },
  value: {
    fontSize: "16px",
    fontWeight: 600,
    marginTop: 0,
    marginBottom: 12,
  },
  message: {
    fontSize: "15px",
    lineHeight: 1.6,
    whiteSpace: "pre-wrap",
  },
  hr: {
    borderColor: "#f3f4f6",
    margin: "12px 0",
  },
  footer: {
    fontSize: "12px",
    color: "#6b7280",
    marginTop: 12,
  },
};
