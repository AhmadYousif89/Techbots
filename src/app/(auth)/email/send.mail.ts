import { Resend } from "resend";
import { render } from "react-email";
import { createElement } from "react";
import { User } from "@prisma/client";
import { OrderDetailsTemplate } from "./order.template";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendEmail = async (user: User, url: string) => {
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
};
