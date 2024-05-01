import Transaction from "../models/transaction.model.js";

const transactionResolver = {
  Query: {
    transactions: async (_, __, context) => {
      try {
        if(!context.getUser()) throw new Error("User Unauthorized");

        const userId = await context.getUser()._id;
        const transactions = await Transaction.find({ userId }).sort({ date: -1 });

        return transactions;
      } catch (error) {
        console.log(`Transaction Resolver | Query | transactions | ${error}`);
        throw new Error(error.message || "An error occurred while fetching transactions"); 
      }
    },
    transaction: async (_, { transactionId }, context) => {
      try {
        if(!context.getUser()) throw new Error("User Unauthorized");
  
        const transaction = await Transaction.findById(transactionId);
  
        return transaction;
      } catch (error) {
        console.log(`Transaction Resolver | Query | transaction | ${error}`);
        throw new Error(error.message || "An error occurred while fetching a transaction"); 
      }
    },
    categoryStatistics: async (_, __, context) => {
      try {
        if(!context.getUser()) throw new Error("User Unauthorized");

        const userId = context.getUser()._id;
        const transactions = await Transaction.aggregate([
          { "$match": { userId } },
          { "$group": {
              "_id": "$category",
              "totalAmount": { "$sum": "$amount" }
            }
          },
          { "$project": {
              "category": "$_id",
              totalAmount: 1,
              _id: 0
            }
          }
        ]);

        return transactions;
      } catch (error) {
        console.log(`Transaction Resolver | Query | categoryStatistics | ${error}`);
        throw new Error(error.message || "An error occurred while fetching a category statistics"); 
      }
    }
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        if(!context.getUser()) throw new Error("User Unauthorized");

        const userId = await context.getUser()._id;
        const { description, paymentType, category, amount, date } = input;

        if(!description || !paymentType || !category || !amount || !date) throw new Error("Missing required fields.");

        const new_transaction = new Transaction({ userId, ...input });
        await new_transaction.save();

        return new_transaction;
      } catch (error) {
        console.log(`Transaction Resolver | Mutation | createTransaction | ${error}`);
        throw new Error(error.message || "An error occurred while creating a transaction"); 
      }
    },
    updateTransaction: async (_, { input }, context) => {
      console.log(input);
      try {
        if(!context.getUser()) throw new Error("User Unauthorized");

        const updated_transaction = await Transaction.findByIdAndUpdate(input.transactionId, input, { new: true });

        return updated_transaction;
      } catch (error) {
        console.log(`Transaction Resolver | Mutation | updateTransaction | ${error}`);
        throw new Error(error.message || "An error occurred while updating a transaction");
      }
    },
    deleteTransaction: async (_, { transactionId }, context) => {
      try {
        if(!context.getUser()) throw new Error("User Unauthorized");
        
        const deleted_transaction = await Transaction.findByIdAndDelete(transactionId);

        return deleted_transaction;
      } catch (error) {
        console.log(`Transaction Resolver | Mutation | deleteTransaction | ${error}`);
        throw new Error(error.message || "An error occurred while deleting a transaction");
      }
    }
  },
  // TODO: Add Transaction + User Relationship
}

export default transactionResolver;
