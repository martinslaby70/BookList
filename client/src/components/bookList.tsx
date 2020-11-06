import React, { useState } from 'react';

//apollo
import { useMutation, useQuery} from '@apollo/client';
import { getBooksQuery, removeBookMutation, getBookQuery} from './../queries/queries';
//interfaces
import book from './../intefaces/book';

//components
import BookDetails from './bookDetails';


const BookList = () => {
    const [bookIdToShow, setBookIdToShow] = useState('');

    const { loading, error, data } = useQuery(getBooksQuery);
    const [removeBook] = useMutation(removeBookMutation); 

    const handleRemove = (id: string) => {
        removeBook({
            variables: {
                id
            },
            refetchQueries: [
                {
                    query: getBooksQuery
                },
                {
                    query: getBookQuery
                }
            ]           
        });
    }
    
    const DisplayBooks = () => {
        if(loading) return <option disabled>Loading....</option>
        if(error) return <p>Ops! Something went wrong</p>

        return data.books.map((book: book) => {
            return(
                <li key={book.id}> 
                    <p onClick={() => setBookIdToShow(book.id)}>{book.name}</p>
                    <button onClick={() => handleRemove(book.id)}> &#10005; {book.id}</button> 
                </li>
            )
        })
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