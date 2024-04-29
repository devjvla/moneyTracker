import { gql } from '@apollo/client';

export const USER_SIGNUP = gql`
  mutation SignUp($input: SignUpInput!) {
    signUp(input: $input) {
      _id
      first_name
      last_name
      email_address
    }
  }
`;

export const USER_SIGNIN = gql`
  mutation SignIn($input: SignInInput!) {
    signIn(input: $input) {
      _id
      first_name
      last_name
      email_address
    }
  }
`

export const USER_SIGNOUT = gql`
  mutation SignOut {
    signOut {
      message
    }
  }
`