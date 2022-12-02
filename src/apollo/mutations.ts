import { gql } from '@apollo/client';

export const CREATE_BUSINESS = gql`
  mutation CreateBusiness($input: BusinessInput!) {
    createBusiness(input: $input) {
      _id
      name
      address
      size
    }
  }
`;

export const UPDATE_BUSINESS = gql`
  mutation UpdateBusiness($id: String!, $input: BusinessInput!) {
    updateBusiness(id: $id, input: $input) {
      _id
      name
      address
      size
    }
  }
`;

export const DELETE_BUSINESS = gql`
  mutation DeleteBusiness($id: String!) {
    deleteBusiness(id: $id) {
      _id
      name
      address
      size
    }
  }
`;

export const CREATE_CUSTOMER = gql`
  mutation CreateCustomer($input: CustomerInput!) {
    createCustomer(input: $input) {
      _id
      firstName
      lastName
      email
      password
      businessId
    }
  }
`;

export const UPDATE_CUSTOMER = gql`
  mutation UpdateCustomer($id: String!, $input: CustomerInput!) {
    updateCustomer(id: $id, input: $input) {
      _id
      firstName
      lastName
      email
      password
      businessId
    }
  }
`;

export const DELETE_CUSTOMER = gql`
  mutation DeleteCustomer($id: String!) {
    deleteCustomer(id: $id) {
      _id
      firstName
      lastName
      email
      password
      businessId
    }
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser($input: UserInput!) {
    createUser(input: $input) {
      _id
      firstName
      lastName
      email
      password
      businessId
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser($id: String!, $input: UserInput!) {
    updateUser(id: $id, input: $input) {
      _id
      firstName
      lastName
      email
      password
      businessId
    }
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($id: String!) {
    deleteUser(id: $id) {
      _id
      firstName
      lastName
      email
      password
      businessId
    }
  }
`;
