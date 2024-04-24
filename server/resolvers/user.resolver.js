import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

const userResolver = {
  Query: {
    authUser: async (_, __, context) => {
      try {
        const user = await context.getUser();

        return user;
      } catch (error) {
        console.log(`User Resolver | Query | authUser Error | ${error}`);
        throw new Error(error.message || "An error occurred while authenticating user");
      }
    },
    user: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);

        return user;
      } catch (error) {
        console.log(`User Resolver | Query | User Error | ${error}`);
        throw new Error(error.message || "An error occurred while fetching user record.");
      }
    },
  },
  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { email_address, first_name, last_name, password } = context;

        if (!email_address || !first_name || !last_name || !password) {
          throw new Error("Missing required fields.");
        }

        const is_existing_email = User.findOne({ email_address });

        if (is_existing_email) {
          throw new Error("Email Address is already registered.");
        }

        const salt = await bcrypt.genSalt(16);
        const hashed_password = await bcrypt.hash(password, salt);

        const new_user = new User({
          email_address, first_name, last_name,
          password: hashed_password
        });

        await new_user.save();
        await context.login(new_user);

        return new_user;
      } catch (error) {
        console.log(`User Resolver | Mutation | signUp Error | ${error}`);
        throw new Error(error.message || "An error occurred during sign up");
      }
    },
    signIn: async (_, { input }, context) => {
      try {
        const { email_address, password } = input;

        const { user } = await context.authenticate("graphql-local", { email_address, password });
        await context.login(user);

        return user;
      } catch (error) {
        console.log(`User Resolver | Mutation | signIn Error | ${error}`);
        throw new Error(error.message || "An error occurred during sign in");
      }
    },
    signOut: async(_, __, context) => {
      try {
        await context.logout();

        req.session.destroy(err => {
          if(err) throw err;
        });

        res.clearCookie("connect.sid");

        return { message: "You are signed out" }
      } catch (error) {
        console.log(`User Resolver | Mutation | signOut Error | ${error}`);
        throw new Error(error.message || "An error occurred during sign out")
      }
    }
  },
  // TODO: Add User + Transaction Relationship
}

export default userResolver;
