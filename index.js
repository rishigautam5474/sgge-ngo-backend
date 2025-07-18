import env from "dotenv";
env.config();
import express from "express";
import MongoDbConnection from "./db/connection.js";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routes/auth.routes.js";
import galleryRouter from "./routes/gallery.routes.js";
const app = express();

const PORT = process.env.PORT || 4000;

MongoDbConnection(process.env.MONGOOSE_URI)
  .then(() => {
    console.log("MongoDb is connected successfully");
  })
  .catch((error) => {
    console.log(error,"error++++++++++");
  });

app.use(cors({
  origin: "http://localhost:5173"
}));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan('tiny'))

app.get("/", (req, res) => {
  res.send("Welcome NGO");
})

app.use("/api/v1/auth", authRouter);
app.use("/api/v1/gallery", galleryRouter);

app.listen(PORT, () => {
  console.log(`Server Started on PORT ${PORT}`);
});
