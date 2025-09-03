// Placeholder: oldindan belgilangan javoblar yoki oddiy e'lon qoidalari
const quickReplyOptions = ["Assalomu alaykum", "Loyiha haqida", "Yordam kerak"];

function getBotReply(input) {
  const text = input.toLowerCase();
  if (text.includes("salom")) return "Va alaykum assalom! Qanday yordam bera olaman?";
  if (text.includes("loyiha")) return "Bu chat UI – React + Tailwind bilan yozilgan demo.";
  if (text.includes("yordam")) return "Albatta, savolingizni yozing.";
  return "Tushundim. Biroz batafsilroq yozib bera olasizmi?";
}

export { quickReplyOptions, getBotReply };
