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

        // const user = await User.create({
        //     name:"rahul",
        //     age: 22,
        //     email: "rahul@gmail.com",
        //     hobbies:['sports','learnin']
        // })
        // console.log(user);

        // const user = new User({name:"aman",age:21});
        // user.name = "rahul";

        // await user.save();
        // console.log(user)
        

        // const user = await User.findById('63f9dcf6a358ce39c7df871f');
        // user.bestFriend = '63f9dd0cea062cc17756638f'
        // await user.save();
        // console.log(user);

        
        // const user = await User.findOne({name:"aman"}).populate("bestFriend");
        // const user = await User.where('name').equals('aman').populate('bestFriend')
        // console.log(user);


    });

}

start();