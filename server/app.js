import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import passport from "passport";
import session from "express-session";
import mongoStore from "connect-mongo";
import mongoose from "mongoose";

import "./passport";
import "./db";
import userRoute from "./routes/userRoute";
const app = express();

app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());
const CokieStore = mongoStore(session);
app.use(
  session({
    secret: "secret",
    resave: false,
    saveUninitialized: true,
    store: new CokieStore({ mongooseConnection: mongoose.connection })
  })
);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());
//----------------------------------------
app.use("/api/user", userRoute);
//----------------------------------------
const port = process.env.PORT || 5000;

const handleListen = () => {
  console.log(`Listened on Server - PORT : ${port} `);
};

app.listen(port, handleListen);
