import author from './author';

interface book {
    name: string,
    id: string,
    genre?: string,
    authorId?: string,
    author?: author
}

export default book;