import React, { useState } from 'react';

//apollo
import { useMutation, useQuery} from '@apollo/client';
import { getBooksQuery, removeBookMutation} from './../queries/queries';
//interfaces
import book from './../intefaces/book';

//components
import BookDetails from './bookDetails';

//scss
import './../scss/list.scss';


const BookList = () => {
    const [bookIdToShow, setBookIdToShow] = useState('');

    const { loading, error, data } = useQuery(getBooksQuery);
    const [removeBook] = useMutation(removeBookMutation); 

    const handleRemove = (id: string) => {
        if(id === bookIdToShow)
            setBookIdToShow('');

        removeBook({
            variables: {
                id
            },
            refetchQueries: [
                {
                    query: getBooksQuery
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
                    <button onClick={() => handleRemove(book.id)}> &#10005;</button> 
                </li>
            )
        })
    }

    

    return(
        <div className="list">
            <div className="bookList">
                <h3>You currently have - {data?.books.length} books</h3>
                <ul id="book-list">
                    <DisplayBooks />
                </ul>
            </div>
            <div className="bookDetails">
                <BookDetails bookId={bookIdToShow}/>
            </div>
        </div>
    )
}

export default BookList;