const forbiddenDatabasePatterns = [
  /localhost(?::\d+)?/i,
  /127\.0\.0\.1(?::\d+)?/i,
  /file:\.\//i,
  /host=localhost/i,
  /host=127\.0\.0\.1/i
];

function assertDatabaseUrl(name: "DATABASE_URL" | "DIRECT_URL", value: string | undefined) {
  if (!value || !value.trim()) {
    throw new Error(`${name} is required and must be provided from environment variables.`);
  }

  const normalized = value.trim();

  if (!/^postgres(ql)?:\/\//i.test(normalized)) {
    throw new Error(`${name} must be a PostgreSQL connection string.`);
  }

  if (forbiddenDatabasePatterns.some((pattern) => pattern.test(normalized))) {
    throw new Error(`${name} must not point to localhost, 127.0.0.1, or any local file database.`);
  }
}

export function assertDatabaseEnvironment() {
  assertDatabaseUrl("DATABASE_URL", process.env.DATABASE_URL);
  assertDatabaseUrl("DIRECT_URL", process.env.DIRECT_URL);
}
