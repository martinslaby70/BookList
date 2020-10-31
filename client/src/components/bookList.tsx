import React from 'react';
import {gql, useQuery} from '@apollo/client';
//interfaces
import book from './../intefaces/book';

const getBooksQuery = gql`
{
    books{
        name 
        id
    }
}
`

const BookList = () => {
    const { loading, error, data } = useQuery(getBooksQuery);

    const displayBooks = () => {
        if(loading) return <option disabled>Loading....</option>
        if(error) return <p>Ops! Something went wrong</p>

        return data.books.map((book: book) => {
            return(
            <li key={book.id}>{book.name}</li>
            )
        })
    }

    return(
        <div>
            <h3>You currently have - {data?.books.length} books</h3>
            <ul id="book-list">
                {displayBooks()}
            </ul>
        </div>
    )
}

export default BookList;