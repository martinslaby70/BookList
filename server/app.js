import express from 'express';
import graphqlHTTP from 'graphql';

const app = express();
const PORT = 4000;


app.use('/graphql', graphqlHTTP({

}));





app.listen(PORT, () => console.log(`lisening to port ${PORT}`))