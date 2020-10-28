import graphql, { GraphQLSchema } from 'graphql';

const { GraphQLObjectType, GraphQLString, GraphQLSchema } = graphql;

const BookType = new GraphQLObjectType({
    name: 'Book',
    field: () => ({
        id: {type: GraphQLString},
        name: {type: GraphQLString},
        gendre: {type: GraphQLString}
    })
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: BookType,
            args: {
                id: {type: GraphQLString}
            },
            resolve(parent, args){
               //code to get data from database 
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
})