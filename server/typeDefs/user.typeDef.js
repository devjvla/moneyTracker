const userTypeDef = `#graphql
  type User {
    _id: ID!
    first_name: String!
    last_name: String!
    email_address: String!
    password: String!
    transactions: [Transaction!]
  }

  type Query {
    # users: [User!], // Removed because it's not needed for the application.
    authUser: User
    user(userId: ID!): User
  }

  type Mutation {
    signUp(input: SignUpInput!): User
    signIn(input: SignInInput!): User
    signOut: SignOutResponse
  }

  input SignUpInput {
    first_name: String!
    last_name: String!
    email_address: String!
    password: String!
  }

  input SignInInput {
    email_address: String!
    password: String!
  }

  type SignOutResponse {
    message: String!
  }
`

export default userTypeDef;
