import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
mutation login($email:String!, $password: String!) {
    login(email: $email, password: $password) {
        token
        user {
            _id
            username
        }
    }
}
`;
export const ADD_USER = gql`
mutation createUser($username: String!, $email: String!, $password: String!) {
    createUser(username: $username, email: $email, password: $password) {
        token
        user {
            _id
            username
            email
        }
    }
}
`;
export const SAVE_BOOK = gql`
mutation addBook($input: addBook!) {
    addBook(input: $input) {
        _id
        username
        savedBooks {
            bookId
            authors
            image
            link
            title
            description
        }
    }
}`;
export const REMOVE_BOOK = gql`
mutation deleteBook($bookId: ID!) {
    deleteBook(bookId: $bookId) {
        _id
        username
        email
        bookCount
        savedBooks {
            bookId
            authors
            image
            link
            title
            description
        }
    }
}`;