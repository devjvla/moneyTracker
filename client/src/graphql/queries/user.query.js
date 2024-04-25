import { gql } from '@apollo/client';

export const getAuthUser = gql`
  query GetAuthenticatedUser {
    authUser {
      _id,
      first_name,
      last_name
      email_address,
    }
  }
`;