import React, {useState, useRef, useEffect} from 'react';
import {useMutation} from '@apollo/client';

import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';

import {useQuery} from '@apollo/client';
import {getAuthorsQuery} from '../queries/queries';
import author from '../intefaces/author';

import { addBookMutation, getBooksQuery} from './../queries/queries';



const AddBook = () => {

    
    const [addBook] = useMutation(addBookMutation);
    

    const [name, setName] = useState('');
    const [genre, setGenre] = useState('');
    const [authorId, setAuthorId] = useState('');

    const nameRef = useRef<HTMLInputElement | null>(null);
    const genreRef = useRef<HTMLInputElement | null>(null);
    
    const {loading, error, data} = useQuery(getAuthorsQuery);
    
    

    const getAuthors = () => {
        let options: {value: string, label: string}[] = []; 
        if (loading) return ['loading..', 'loading...', 'loading..'];
        if (error) return ['error'];
        
        //return data.authors.map((author: author) => <option key={author.id} value={author.id}>{author.name}</option>);    
        data.authors.forEach((author: author) => {
            options.push({value: author.id, label: author.name});
        });
        console.log(options);
        return options;
        
        
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
        });
        if(nameRef.current && genreRef.current)
        {
            nameRef.current.value = '';
            genreRef.current.value = '';
        }
    }

    return(
        <form onSubmit={(e) => HandleSubmit(e)}>

            <div className="field">
                <label>Book name:</label>
                <input type="text" onChange={(e) => setName(e.target.value)} required ref={nameRef}/>
            </div>

            <div className="field">
                <label>Genre:</label>
                <input type="text" onChange={(e) => setGenre(e.target.value)} ref={genreRef}/>
            </div>
            
            <div className="field">
                <label>Author:</label>
                <Dropdown 
                    options={getAuthors()} 
                    placeholder="Select author" 
                    onChange={(e) => setAuthorId(e.value)}
                />
            </div>

            <div className="field">
                <button type="submit">Add book</button>
            </div>
            
        </form>
    )
}

export default AddBook;