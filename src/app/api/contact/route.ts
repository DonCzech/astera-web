import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: { rejectUnauthorized: false },
  max: 5,
});

let tableReady = false;
async function ensureTable() {
  if (tableReady) return;
  await pool.query(`
    CREATE TABLE IF NOT EXISTS contact_messages (
      id SERIAL PRIMARY KEY,
      name TEXT NOT NULL,
      email TEXT NOT NULL,
      subject TEXT DEFAULT '',
      message TEXT NOT NULL,
      lang TEXT DEFAULT 'cs',
      created_at TIMESTAMPTZ DEFAULT now()
    )
  `);
  tableReady = true;
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, subject, message, lang } = body;

    if (!name || !email || !message) {
      return Response.json({ error: "Missing required fields" }, { status: 400 });
    }

    await ensureTable();
    await pool.query(
      "INSERT INTO contact_messages (name, email, subject, message, lang) VALUES ($1, $2, $3, $4, $5)",
      [String(name).slice(0, 200), String(email).slice(0, 200), String(subject ?? "").slice(0, 300), String(message).slice(0, 5000), String(lang ?? "cs").slice(0, 5)]
    );

    return Response.json({ ok: true });
  } catch (err) {
    console.error("[contact API]", err);
    return Response.json({ error: "Server error" }, { status: 500 });
  }
}
