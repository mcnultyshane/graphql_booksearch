import gql from 'graphql-tag'

export const GET_ME = gql`
    {
        me {
            _id
            username
            email
            bookcount
            savedBooks {
                bookId
                authors
                description
                title
                image
                link
            }
        }
    }
`;