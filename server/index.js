/* Express */
import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";

/* Passport JS */
import passport from "passport";
import session from "express-session";
import connectMongo from "connect-mongodb-session";
import { configurePassport } from "./passport/passport.config.js";

/* Apollo Server */
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import { buildContext } from "graphql-passport";

/* GraphQL */
import mergedTypeDefs from "./typeDefs/index.js";
import mergedResolvers from "./resolvers/index.js";

/* MongoDB */
import { connectDB } from "./db/connectDB.js";

dotenv.config();
const app = express();
const httpServer = http.createServer(app);

/* Session, Cookie, and PassportJS Setup */
const MongoDBStore = connectMongo(session);
const store = new MongoDBStore({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

// TODO: For dev purposes only
store.on("error", (err) => {
  console.log("STORE ERROR: ");
  console.log(err);
})

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1_800_000,
      httpOnly: true,
    },
    store
  })
);

configurePassport();
app.use(passport.initialize());
app.use(passport.session());

/* Apollo Server, Express Setup */
const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]
});

await server.start();

app.use(
  "/graphql",
  cors({
    origin: "http://localhost:3000",
    credentials: true
  }),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => buildContext({ req, res }),
    // context: async ({ req }) => ({ token: req.headers.token }),
  }),
);

await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));

// Connect to MongoDB
await connectDB();

console.log("Server running at http://localhost:4000/graphql");