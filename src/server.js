import express from "express";
import TeamsController from "./controllers/teams-controller";
import Middleware from "./middleware/middleware";
import dotenv from "dotenv";

dotenv.config();

const PORT = process.env.PORT || 3000;

const app = express();

Middleware(app);
app.use("/api/teams", TeamsController);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
