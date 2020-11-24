import React from 'react'

//components
import AddBook from './addBook';
import AddAuthor from './addAuthor';

//scss
import './../scss/footer.scss'

const Footer = () => {



    return(
        <div className="footer">
            <div className="formContainer">
                <AddBook />
                <AddAuthor />
            </div>
        </div>
    )
}

export default Footer;