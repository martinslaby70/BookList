import React, { useRef, useState } from 'react'

import {addAuthorMutation, getAuthorsQuery} from './../queries/queries';
import {useMutation} from '@apollo/client';

const AddAuthor = () => {
    const [name, setName] = useState('');
    const [age, setAge] = useState(0);

    const nameRef = useRef<HTMLInputElement | null>(null);
    const ageRef = useRef<HTMLInputElement | null>(null);

    const [addAuthor] = useMutation(addAuthorMutation);
    

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        addAuthor({
            variables: {
                name,
                age
            },
            refetchQueries: [
                {
                    query: getAuthorsQuery
                }
            ]
        });
        if (ageRef.current && nameRef.current)
        {
            ageRef.current.value = '';
            nameRef.current.value = '';
        }
    }

    return(
        <form onSubmit={handleSubmit}>
            <div className="field">
                <label>Name:</label>
                <input type="text" onChange={(e) => setName(e.target.value)} ref={nameRef} required/> 
            </div>
            <div className="field">
                <label>Age:</label>
                <input type="number" onChange={(e) => setAge(Number(e.target.value))} ref={ageRef} required/> 
            </div>
            <div className="field">
                <button type="submit">Add Author</button>
            </div>
        </form>
    )
}

export default AddAuthor;