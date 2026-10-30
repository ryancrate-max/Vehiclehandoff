CREATE TABLE IF NOT EXISTS contact_messages (
  id TEXT PRIMARY KEY,
  created_at TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  sale_number TEXT,
  topic TEXT NOT NULL,
  subject TEXT,
  message TEXT NOT NULL,
  emailed INTEGER NOT NULL DEFAULT 0
);
