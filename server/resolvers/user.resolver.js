import User from "../models/user.model.js";
import Transaction from "../models/transaction.model.js";
import bcrypt from "bcryptjs";

const userResolver = {
  Query: {
    authUser: async (_, __, context) => {
      try {
        const user = await context.getUser();

        return user;
      } catch (error) {
        console.log(`User Resolver | Query | authUser | ${error}`);
        throw new Error(error.message || "An error occurred while authenticating user");
      }
    },
    user: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);

        return user;
      } catch (error) {
        console.log(`User Resolver | Query | User | ${error}`);
        throw new Error(error.message || "An error occurred while fetching user record.");
      }
    }
  },
  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { email_address, first_name, last_name, password } = input;

        if (!email_address || !first_name || !last_name || !password) throw new Error("Missing required fields.");

        const is_existing_email = await User.findOne({ email_address });

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
        console.log(`User Resolver | Mutation | signUp | ${error}`);
        throw new Error(error.message || "An error occurred during sign up");
      }
    },
    signIn: async (_, { input }, context) => {
      try {
        const { email_address, password } = input;

        const { user } = await context.authenticate("graphql-local", { email: email_address, password });
        console.log("USER: ", user);
        await context.login(user);

        return user;
      } catch (error) {
        console.log(`User Resolver | Mutation | signIn | ${error}`);
        throw new Error(error.message || "An error occurred during sign in");
      }
    },
    signOut: async(_, __, context) => {
      try {
        await context.logout();

        context.req.session.destroy(err => {
          if(err) throw err;
        });

        context.res.clearCookie("connect.sid");

        return { message: "You are signed out" }
      } catch (error) {
        console.log(`User Resolver | Mutation | signOut | ${error}`);
        throw new Error(error.message || "An error occurred during sign out");
      }
    }
  },
  // TODO: Add User + Transaction Relationship
  // User: {
  //   transactions: async(parent) => {
  //     try {
  //       const transactions = Transaction.find({ userId: parent._id });

  //       return transactions;
  //     } catch (error) {
  //       console.log(`User Resolver | Relationship | transactions | ${error}`);
  //       throw new Error(error.message || "An error occurred while fetching transactions");
  //     }
  //   }
  // }
}

export default userResolver;
