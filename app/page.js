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
      {!submitted && (
        <>
          <p className="text-sm sm:text-base text-zinc-600 mb-6 tracking-wide">
            Send a sentence. Receive the one sent before you.
          </p>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
            className="w-full max-w-xl flex flex-col items-center"
          >
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type something..."
              className="w-full text-lg px-6 py-4 rounded-full bg-white shadow-md focus:outline-none focus:ring-2 focus:ring-orange-400 placeholder-zinc-400"
            />
            <button
              type="submit"
              className="mt-4 text-orange-600 hover:text-orange-800 transition font-medium"
            >
              ↵ Press Enter or click to send
            </button>
          </form>
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

      {/* Floating emoji hints */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <span
          className="floating-emoji text-5xl"
          style={{ top: "10%", left: "6%" }}
        >
          💬
        </span>
        <span
          className="floating-emoji text-6xl"
          style={{ top: "35%", right: "10%" }}
        >
          ✍️
        </span>
        <span
          className="floating-emoji text-7xl"
          style={{ bottom: "18%", left: "14%" }}
        >
          🧠
        </span>
        <span
          className="floating-emoji text-5xl"
          style={{ bottom: "8%", right: "18%" }}
        >
          📨
        </span>
      </div>
    </main>
  );
}
