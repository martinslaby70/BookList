import React, { useState } from 'react';
import { useQuery} from '@apollo/client';
//interfaces
import book from './../intefaces/book';
import {getBooksQuery} from './../queries/queries';
import BookDetails from './bookDetails';


const BookList = () => {
    const [bookIdToShow, setBookIdToShow] = useState('');

    const { loading, error, data } = useQuery(getBooksQuery);

    const DisplayBooks = () => {
        if(loading) return <option disabled>Loading....</option>
        if(error) return <p>Ops! Something went wrong</p>

        return data.books.map((book: book) => {
            return(
                <li key={book.id} onClick={() => setBookIdToShow(book.id)}>{book.name}</li>
            )
        })
    }

    const deleteBook = (bookId: string) => {
        
    }

    return(
        <div>
            <h3>You currently have - {data?.books.length} books</h3>
            <ul id="book-list">
                <DisplayBooks />
            </ul>
            <BookDetails bookId={bookIdToShow}/>
        </div>
    )
}

export default BookList;