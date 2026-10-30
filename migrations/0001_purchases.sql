-- VehicleHandoff paid kits, written by the Stripe webhook.
CREATE TABLE IF NOT EXISTS purchases (
  session_id TEXT PRIMARY KEY,
  kit TEXT NOT NULL,
  province TEXT NOT NULL,
  email TEXT,
  amount_total INTEGER NOT NULL,
  currency TEXT NOT NULL,
  livemode INTEGER NOT NULL DEFAULT 0,
  payment_status TEXT NOT NULL,
  created_at TEXT NOT NULL
);
CREATE INDEX IF NOT EXISTS idx_purchases_email ON purchases (email);
