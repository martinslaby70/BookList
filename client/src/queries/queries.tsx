import {gql} from '@apollo/client';


export const addBookMutation = gql`
    mutation($name: String!, $genre: String!, $authorId: ID!){
        addBook(name: $name, genre: $genre, authorId: $authorId){
            name
            id
        }
        
    }
`;
export const removeBookMutation = gql`
    mutation($id: ID!){
        removeBook(id: $id){
            msg
        }
    }
`;

export const getAuthorsQuery = gql`
    {
        authors{
            name 
            id
        }
    }
`;

export const getBooksQuery = gql`
    {
        books{
            name 
            id
        }
    }
`;

export const getBookQuery = gql`
    query($id: ID!){
        book(id: $id){
            name 
            id
            genre
            author{
                id
                name
                age
                books{
                    name
                    id
                }
            }
        }
    }
`;
