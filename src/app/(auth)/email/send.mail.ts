import { Resend } from "resend";
import { render } from "react-email";
import { createElement } from "react";
import { OrderDetailsTemplate, type EmailRecipient } from "./order.template";

type SendEmailResult =
  | {
      ok: true;
    }
  | {
      ok: false;
      error: unknown;
    };

export const sendEmail = async (
  emailOrUser: EmailRecipient | string,
  url: string,
): Promise<SendEmailResult> => {
  const apiKey = process.env.RESEND_API_KEY;
  const user =
    typeof emailOrUser === "string" ? { email: emailOrUser } : emailOrUser;

  if (!apiKey) {
    console.error(
      "RESEND_API_KEY is missing. Skipping order confirmation email.",
    );
    return {
      ok: false,
      error: new Error("RESEND_API_KEY is missing"),
    };
  }

  if (!user.email || !url) {
    console.error(
      "Missing email recipient or URL. Skipping order confirmation email.",
    );
    return {
      ok: false,
      error: new Error("Missing email recipient or URL"),
    };
  }

  try {
    const resend = new Resend(apiKey);
    const email = createElement(OrderDetailsTemplate, { user, url });
    const html = await render(email);
    const text = await render(email, { plainText: true });

    await resend.emails.send({
      from: "support@ayob.dev",
      to: user.email,
      subject: "Your Order Details",
      html,
      text,
    });

    return { ok: true };
  } catch (error) {
    console.error("Failed to send order confirmation email", error);
    return { ok: false, error };
  }
};
