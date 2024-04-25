import { gql } from '@apollo/client';

export const userSignUp = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      _id
      first_name
      last_name
      email_address
    }
  }
`;

export const userSignIn = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      _id
      first_name
      last_name
      email_address
    }
  }
`

export const userSignOut = gql`
  mutation SignOut {
    signOut {
      message
    }
  }
`