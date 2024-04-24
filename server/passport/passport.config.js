import passport from "passport";
import bcrypt from "bcryptjs";

import User from "../models/user.model.js";
import { GraphQLLocalStrategy } from "graphql-passport";

export const configurePassport = async () => {
  passport.serializeUser((user, done) => {
    console.log("Serializing user...");
    done(null, user.id);
  });

  passport.deserializeUser(async (id, done) => {
    console.log("Deserializing user...");
    
    try {
      const user = await User.findById(id);

      done(null, user);
    } catch (error) {
      done(error);
    }
  });

  passport.use(
    new GraphQLLocalStrategy(async (email_address, password, done) => {
      try {
        const user = await User.findOne({ email_address });

        if(!user) {
          throw new Error("Incorrect email address or password");
        }

        const is_password_valid = await bcrypt.compare(password, user.password);

        if(!is_password_valid) {
          throw new Error("Incorrect email address or password");
        }

        return done(null, user);
      } catch (error) {
        return done(error);
      }
    })
  )
}