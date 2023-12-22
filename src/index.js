import express from "express";
import "dotenv/config";
import appMiddleware from "./middleware/index.js";
const app = express();
const PORT = process.env.PORT || 8080;

app.use(appMiddleware);

app.listen(PORT, () => {
    console.log(`Server berjalan pada Port https://mentorin.et.r.appspot.com:${PORT}`);
});
