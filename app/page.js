"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [previous, setPrevious] = useState("");
  const [count, setCount] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  async function handleSubmit() {
    if (!input.trim()) return;
    const res = await fetch("/api/submit", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ sentence: input }),
    });

    const data = await res.json();
    setPrevious(data.previousSentence);
    setCount(data.count);
    setInput("");
    setSubmitted(true);
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-orange-100 to-yellow-50 flex flex-col items-center justify-center px-4 text-zinc-800 font-sans">
      <p className="text-sm sm:text-base text-zinc-600 mb-6 tracking-wide">
        Send a sentence. Receive the one sent before you.
      </p>

      {!submitted && (
        <>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type something meaningful, funny, random..."
            className="w-full max-w-xl text-lg px-6 py-4 rounded-full bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-zinc-400"
          />
          <button
            onClick={handleSubmit}
            className="mt-4 text-orange-600 hover:text-orange-800 transition font-medium"
          >
            ↵ Press Enter or click to send
          </button>
        </>
      )}

      {submitted && (
        <div className="mt-10 text-center animate-fadeIn space-y-3">
          <p className="text-zinc-500 text-sm">Previous person said:</p>
          <p className="text-xl italic text-orange-800">“{previous}”</p>
          <p className="text-sm text-zinc-400">
            You are the <strong>{count}th</strong> participant
          </p>
          <button
            onClick={() => setSubmitted(false)}
            className="mt-4 text-orange-600 hover:text-orange-800 transition underline text-sm"
          >
            Send another?
          </button>
        </div>
      )}
    </main>
  );
}
