import cors from "cors";
import express from "express";
import { episodesRouter } from "./routes/episodes";
import { progressRouter } from "./routes/progress";

const app = express();
const port = Number(process.env.PORT || 4000);
const allowedOrigins = (process.env.FRONTEND_URL || "")
  .split(",")
  .map((origin) => origin.trim())
  .filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin) {
        callback(null, true);
        return;
      }

      if (!allowedOrigins.length || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }

      callback(new Error("CORS origin not allowed"));
    }
  })
);
app.use(express.json());

app.get("/api/health", (_request, response) => {
  response.json({ status: "ok" });
});

app.use("/api/episodes", episodesRouter);
app.use("/api/progress", progressRouter);

app.use((error: unknown, _request: express.Request, response: express.Response, _next: express.NextFunction) => {
  console.error(error);
  response.status(500).json({
    message: "حدث خطأ في الخادم"
  });
});

app.listen(port, () => {
  console.log(`API listening on port ${port}`);
});