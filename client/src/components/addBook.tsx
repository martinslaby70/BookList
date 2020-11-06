import React, {useState} from 'react';
import {useMutation, useQuery} from '@apollo/client';

import author from './../intefaces/author';

import {getAuthorsQuery, addBookMutation, getBooksQuery} from './../queries/queries';

const AddBook = () => {

    const {loading, error, data} = useQuery(getAuthorsQuery);
    const [addBook] = useMutation(addBookMutation);
    

    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('');

    const DisplayAuthors = () => {
        if (loading) return null
        if (error) return 'something went wrong'
        return data.authors.map((author: author) => <option key={author.id} value={author.id}>{author.name}</option>);    
    }

    const HandleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addBook({
            variables: {
                name,
                genre,
                authorId
            },
            refetchQueries: [
                {
                    query: getBooksQuery
                }
            ]
        })
    }

    return(
        <form onSubmit={(e) => HandleSubmit(e)}>
            <div className="field">
                <label>Book name:</label>
                <input type="text" onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="field">
                <label>genre:</label>
                <input type="text" onChange={(e) => setGenre(e.target.value)}/>
            </div>
            <div className="field">
                <label>Author:</label>
                <select onChange={(e) => setAuthorId(e.target.value)}>
                    <option>Select author</option>
                    <DisplayAuthors />
                </select>
            </div>

            <button>add</button>
        </form>
    )
}

export default AddBook;