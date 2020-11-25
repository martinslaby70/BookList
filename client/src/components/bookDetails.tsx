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
       
        if (bookId === '') return <div><h3>Click on a book to display details</h3></div>
        if(loading) return <p>loading</p>
        if(error) return <p>error</p>

        const {book}: {book: book} = data;

        return book ? (
            <div>
                <h2>{book.name}</h2>
                <p><span>Genre : </span>{book.genre}</p>
                <p><span>Author: </span>{book.author?.name}</p>
                <p className="gap">All books by {book.author?.name}</p>

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