import { gql } from '@apollo/client'

export const ALL_BOOKS = gql`
  query {
    allBooks  {
      name
      author
      published
    }
  }
`

export const ALL_AUTHORS = gql`
  query {
    allAuthors  {
      name
      born
      bookCount
    }
  }
`

export const ALL_DATA = gql`
  query {
    allBooks  {
      title
      author
      published
    }
    allAuthors  {
      name
      born
      bookCount
    }
  }
`

export const ADD_BOOK = gql`
  mutation AddBook($title: String!, $published: Int!, $author: String!, $genres: [String!]!) {
    addBook(
        title: $title, 
        published: $published, 
        author: $author,
        genres: $genres
    ) {
        title
        published
        author
        id
        genres
    }
}
`

/*

export const CREATE_PERSON = gql`
  mutation createPerson($name: String!, $street: String!, $city: String!, $phone: String) {
    addPerson(
      name: $name,
      street: $street,
      city: $city,
      phone: $phone
    ) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`

export const FIND_PERSON = gql`
  query findPersonByName($nameToSearch: String!) {
    findPerson(name: $nameToSearch) {
      name
      phone
      id
      address {
        street
        city
      }
    }
  }
`
export const EDIT_NUMBER = gql`
  mutation editNumber($name: String!, $phone: String!) {
    editNumber(name: $name, phone: $phone)  {
      name
      phone
      address {
        street
        city
      }
      id
    }
  }
`


const typeDefs = `
  type Book {
    title: String!,
    published: Int!,
    author: String!,
    id: ID!,
    genres: [String!]
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!,
      published: Int!,
      author: String!,
      genres: [String!]
    ): Book
    editAuthor(
      name: String!
      setBornTo: Int!
    ): Author
  }
`*/