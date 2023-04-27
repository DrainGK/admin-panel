const express = require("express");
const connectDB = require("./config/db");
const dotenv = require("dotenv").config();
const userRouter = require("./routes/users");
const cors = require("cors");
const port = 5000;

//Connexion a la DB

connectDB();

const app = express();

//CORS
app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  });

  next();
});
//Middleware qui permet de traiter les donnees de la requete
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/api/auth", userRouter);
app.use("/post", require("./routes/post"));

// Lancer le serveur
app.listen(port, () => console.log("Le serveur a demarre au port " + port));
