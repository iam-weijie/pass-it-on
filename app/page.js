"use client";
import { useState } from "react";

export default function Home() {
  const [input, setInput] = useState("");
  const [previous, setPrevious] = useState("");
  const [count, setCount] = useState(null);

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
  }

  return (
    <main
      style={{
        padding: "2rem",
        maxWidth: "600px",
        margin: "auto",
        textAlign: "center",
      }}
    >
      <h1>PassItOn 🔁</h1>
      <input
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Type your sentence..."
        style={{ width: "100%", padding: "0.5rem", marginTop: "1rem" }}
      />
      <button
        onClick={handleSubmit}
        style={{
          marginTop: "1rem",
          padding: "0.5rem 1rem",
          background: "#0070f3",
          color: "white",
          border: "none",
        }}
      >
        Submit
      </button>

      {previous && (
        <div style={{ marginTop: "2rem" }}>
          <p>
            <strong>Previous person said:</strong> {previous}
          </p>
          <p>
            You are the <strong>{count}th</strong> person to participate.
          </p>
        </div>
      )}
    </main>
  );
}
