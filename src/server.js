const express = require('express');
const app = express();
const PORT = 1212;

const connectDb = require('./config/dbConfig');

const User = require('./model/user');

const start = async() => {

    app.use(express.json());
    app.use(express.urlencoded({extended:true}));

    app.listen(PORT, async() => {
        console.log(`server is listening on PORT ${PORT}`)
        connectDb();

        const user = new User({name:"aman",age:21});
        await user.save();
        console.log(user)
        
    });

}

start();