const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');

const app = express();
const PORT = 4000;

mongoose.connect('mongodb+srv://martin:test123@cluster.arujq.mongodb.net/<dbname>?retryWrites=true&w=majority');
mongoose.connection.once('open', () => console.log('database connected succesfully'));

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));





app.listen(PORT, () => console.log(`lisening to port ${PORT}`))