CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name VARCHAR(150) NOT NULL,
  email VARCHAR(150) UNIQUE NOT NULL,
  password_hash TEXT NOT NULL,
  plan_type VARCHAR(50) DEFAULT 'free',
  status BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMP DEFAULT NOW()
);