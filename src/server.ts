import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import mongoose, { ConnectOptions } from "mongoose";
import { auth } from "./routes/auth";
import { users } from "./routes/users";

dotenv.config();

const app = express();
const port = 3000;

app.use(bodyParser.json());

// app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(auth);
app.use(users);

mongoose
  .connect("mongodb://127.0.0.1:27017/casa-do-criador", {
    useNewUrlParser: true
  } as ConnectOptions)
  .then((res) => {
    console.log("Connected to mongoDB");
    app.listen(port, () => {
      console.log(`Server started on port ${port}`);
    });
  })
  .catch((error) => console.log(error));
