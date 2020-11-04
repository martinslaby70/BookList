import React from 'react';
import {useQuery} from '@apollo/client';

import book from './../intefaces/book';

import {getBookQuery} from './../queries/queries';

interface props{
    bookId: string
}
const BookDetails = ({bookId}: props) => {

    const {data, loading, error} = useQuery(getBookQuery, {
        variables: {id: bookId}
    });
    
    const DisplayBookDetails = () => {
       
        if (bookId === '') return <p>Click on a book to display details</p>
        if(loading) return <p>loading</p>
        if(error) return <p>error</p>

        const {book}: {book: book} = data;

        return book ? (
            <div>
                <h2>{book.name}</h2>
                <p>{book.genre}</p>
                <p>{book.author?.name}</p>
                <p>all books by this author</p>
                <ul>
                    {book.author!.books!.map( (book: book) => {
                        return(
                            <li key={book.id}>{book.name}</li>
                        )
                    })}
                </ul>
            </div>
        ): (null)
    }
    

    return <DisplayBookDetails />
}

export default BookDetails;