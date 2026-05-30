import { User } from "@prisma/client";
import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "react-email";

type Props = {
  user: User;
  url: string;
};

const logoSrc = process.env.NEXT_PUBLIC_LOGO_URL;

export const OrderDetailsTemplate = ({ user, url }: Props) => (
  <Html>
    <Head />
    <Body style={main}>
      <Preview>Your order details are here!</Preview>
      <Container style={container}>
        <div style={image}>
          <Img
            src={logoSrc}
            alt="Bookmark Manager"
            width={214}
            height={"auto"}
            style={{ display: "block" }}
          />
        </div>
        <Text style={paragraph}>Hi {user.username || "there"},</Text>
        <Text style={paragraph}></Text>
        <Section style={btnContainer}>
          <Button
            style={button}
            href={url}
            rel="noopener noreferrer"
            target="_blank"
          >
            Download invoice
          </Button>
        </Section>
        <Text style={paragraph}>
          This link will expire in 1 hour. If you did not create an account,
          please ignore this email.
        </Text>
        <Text style={paragraph}>
          Best,
          <br />
          Techbots Team
        </Text>
        <Hr style={hr} />
        <Text style={footer}>
          This email was sent to {user.email}. If you did not create an account,
          please ignore.
        </Text>
        <Text style={footer}>© 2026 Techbots. All rights reserved.</Text>
      </Container>
    </Body>
  </Html>
);

const main = {
  backgroundColor: "#ffffff",
  fontFamily:
    '-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
  margin: "0 auto",
  padding: "32px",
  backgroundColor: "#FFF",
};

const image = { backgroundColor: "#ffffff", width: "fit-content" };

const paragraph = {
  fontSize: "14px",
  lineHeight: "22px",
};

const btnContainer = {
  display: "flex",
  textAlign: "center" as const,
};

const button = {
  width: "fit-content",
  backgroundColor: "#5F51E8",
  borderRadius: "3px",
  color: "#fff",
  fontSize: "16px",
  textDecoration: "none",
  textAlign: "center" as const,
  display: "block",
  padding: "12px",
};

const hr = {
  borderColor: "#cccccc",
  margin: "20px 0",
};

const footer = {
  color: "#8898aa",
  fontSize: "12px",
};
