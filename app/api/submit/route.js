import fs from "fs/promises";
import { NextResponse } from "next/server";
import path from "path";

const dataFile = path.join(process.cwd(), "data.json");

export async function POST(req) {
  const body = await req.json();
  const newSentence = body.sentence?.trim();

  if (!newSentence) {
    return NextResponse.json({ error: "Empty sentence" }, { status: 400 });
  }

  let data = {
    lastSentence: "You're the first one!",
    count: 0,
  };

  try {
    const file = await fs.readFile(dataFile, "utf8");
    data = JSON.parse(file);
  } catch (e) {
    console.log("Starting fresh data.json");
  }

  const response = {
    previousSentence: data.lastSentence,
    count: data.count + 1,
  };

  data.lastSentence = newSentence;
  data.count += 1;

  await fs.writeFile(dataFile, JSON.stringify(data), "utf8");

  return NextResponse.json(response);
}
