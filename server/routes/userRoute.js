import express from "express";
import User from "../models/User";
import passport from "passport";

const userRoute = express.Router();

userRoute.post("/register", async (req, res) => {
  const {
    body: { name, email, password }
  } = req;
  try {
    const user = await User({ name, email });
    await User.register(user, password);
    return res.status(200).json({ user: user });
  } catch (error) {
    return res.json({ error: error });
  }
});

userRoute.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) {
      console.log(err);
      return next(err);
    }
    if (!user) {
      console.log(user, info);
      return res.status(401).json({ message: "유저가 없어요" });
    }
    req.logIn(user, err => {
      if (err) {
        console.log(err);
        return next(err);
      }
      return res.status(200).json({ user });
    });
  })(req, res, next);
});
export default userRoute;
