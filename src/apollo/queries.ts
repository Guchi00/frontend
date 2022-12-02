import { gql } from '@apollo/client';

export const BUSINESSES = gql`
  query Businesses {
    businesses {
      _id
      name
      address
      size
    }
  }
`;

export const CUSTOMERS = gql`
  query Customers {
    customers {
      _id
      firstName
      lastName
      email
      password
      businessId
    }
  }
`;

export const USERS = gql`
  query Users {
    users {
      _id
      firstName
      lastName
      email
      password
      businessId
    }
  }
`;
