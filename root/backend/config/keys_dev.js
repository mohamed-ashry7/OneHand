
const dotenv=require('dotenv') ;
dotenv.config({
    path:require('find-config')('.env') 
});
module.exports = {
    mongoURI:process.env.DATABASE_CONNECTION_STRING,
    secretOrKey:'verysecretkey'
}