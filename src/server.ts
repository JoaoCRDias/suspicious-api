import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import { auth } from "./routes/auth";
import { users } from "./routes/users";

dotenv.config();
const app = express();
const port = Number(process.env.PORT);

app.use(bodyParser.json());

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(auth);
app.use(users);
app.use("/", (req, res) => res.json({ message: "It works..." }));

mongoose
  .connect(
    `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PWD}@${process.env.DB_URI}/suspicious-db`,
    {
      useNewUrlParser: true
    } as ConnectOptions
  )
  .then((res) => {
    console.log("Connected to mongoDB");
    app.listen(port, "0.0.0.0", 0, () =>
      console.log(`Servidor rodando na porta ${port}`)
    );
  })
  .catch((error) => console.log(error));
