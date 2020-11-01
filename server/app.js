const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = 4000;

app.use(cors());

const mongoOptions = {
    useNewUrlParser: true,
    useUnifiedTopology: true 
}
mongoose.connect('mongodb+srv://martin:test123@cluster.arujq.mongodb.net/cluster?retryWrites=true&w=majority', mongoOptions);

mongoose.connection.once('open', () => console.log('database connected succesfully'));


app.use('/graphql', graphqlHTTP({
    schema
}));





app.listen(PORT, () => console.log(`lisening to port ${PORT}`))