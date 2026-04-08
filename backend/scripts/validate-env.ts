import { assertDatabaseEnvironment } from "../src/lib/database-env";

try {
  assertDatabaseEnvironment();
  console.log("Database environment is valid.");
} catch (error) {
  const message = error instanceof Error ? error.message : "Invalid database environment.";
  console.error(message);
  process.exit(1);
}
