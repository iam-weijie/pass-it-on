import { supabase } from "../../../lib/supabaseClient";

export async function POST(req) {
  try {
    const { sentence } = await req.json();

    // Insert new sentence
    const { data: insertData, error: insertError } = await supabase
      .from("sentences")
      .insert({ sentence })
      .select("id")
      .single();

    if (insertError) throw insertError;

    // Fetch the previous sentence (the one with id just less than current)
    const { data: previousData, error: previousError } = await supabase
      .from("sentences")
      .select("sentence")
      .lt("id", insertData.id)
      .order("id", { ascending: false })
      .limit(1)
      .single();

    if (previousError && previousError.code !== "PGRST116") throw previousError;
    // PGRST116 = no rows found, which is fine for first sentence

    // Fetch total count
    const { count, error: countError } = await supabase
      .from("sentences")
      .select("*", { count: "exact", head: true });

    if (countError) throw countError;

    return new Response(
      JSON.stringify({
        previousSentence: previousData?.sentence ?? "You're the first one!",
        count,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Supabase error:", error);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
