import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import { typeDefs } from './schema.js';
import _db from './_db.js';

const resolvers={
    Query:{
        games(){
            return _db.games

        },
        reviews(){
            return _db.reviews
        },
        authors(){
            return _db.authors
        },
        review(_,args){
            return _db.reviews.find((review)=>review.id === args.id)

        },
        author(_,args){
            return _db.authors.find((author)=>author.id === args.id)

        },
        game(_,args){
            return _db.games.find((game)=>game.id === args.id)

        }

    },
    //Game means game schema-its like -> If someone asks for reviews inside a Game object, here’s how to get them.
    Game:{
        reviews(parent){
            return _db.reviews.filter((r)=>r.game_id===parent.id)
        }
    },
    Author:{
        reviews(parent){
            return _db.reviews.filter((r)=>r.author_id===parent.id)
        }
    },

    Review:{
        game(parent){
            return _db.games.filter((g)=>g.id===parent.game_id)
        },
        author(parent){
            return _db.authors.filter((a)=>a.id===parent.author_id)
        }
    }
}
//server setup
const server=new ApolloServer({
    typeDefs,
    resolvers


})

const {url} =await startStandaloneServer(server,{
    listen:{ port :4000 }
})

console.log("server started at port ",4000)


