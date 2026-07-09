
import emailjs from "@emailjs/browser";

export const sendOrderEmail = async (order: any) => {
  return await emailjs.send(
    "service_4vc38of",
    "template_ib3fvey",
    order,
    "ZgCz14aXMuiPcMgHp",
  );
};