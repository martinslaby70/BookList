import React from 'react'
import {gql, useQuery} from '@apollo/client';

import author from './../intefaces/author';

const getAutohrsQuery = gql`
{
    authors{
        name 
        id
    }
}
`

const AddBook = () => {

    const {loading, error, data} = useQuery(getAutohrsQuery);

    const displayAuthors = () => {
        if (loading) return null
        if (error) return 'something went wrong'

        return data.authors.map((author: author) => <option key={author.id}>{author.name}</option>);    
        
    }

    return(
        <form>
            <div className="field">
                <label>Book name:</label>
                <input type="text"/>
            </div>
            <div className="field">
                <label>genre:</label>
                <input type="text"/>
            </div>
            <div className="field">
                <label>Author:</label>
                <select>
                    {displayAuthors()}
                </select>
            </div>

            <button>add</button>
        </form>
    )
}

export default AddBook;