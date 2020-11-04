import book from './book';

interface author{
    name: string,
    id: string,
    age?: number,
    books?: book[]
}

export default author;