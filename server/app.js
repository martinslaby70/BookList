import express from 'express';
import graphqlHTTP from 'graphql';
import schema from './schema/schema';

const app = express();
const PORT = 4000;


app.use('/graphql', graphqlHTTP({
    schema: schema
}));





app.listen(PORT, () => console.log(`lisening to port ${PORT}`))