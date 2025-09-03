import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [value, setValue] = useState("");

  const submit = (e) => {
    e.preventDefault();
    const v = value.trim();
    if (!v) return;
    onSend(v);
    setValue("");
  };

  return (
    <form onSubmit={submit} className="mt-4 flex gap-2">
      <input
        className="flex-1 rounded-xl px-3 py-2 bg-white/10 text-white outline-none placeholder:text-white/60"
        placeholder="Xabar yozing…"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <button className="rounded-xl px-4 py-2 bg-blue-600 text-white">Yuborish</button>
    </form>
  );
}
