# Mongoose Basic
## connection
```
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/DB_NAME')
 ```
or
```
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/DB_NAME',
()=>{
    console.log('connected');
},(err)=>{
    console.error(err);
})
 ```

 or
 ```
const mongoose = require('mongoose');
const { DB_URL } = require('./serverConfig');

const connectDb = async() => {
    try {
        await mongoose.connect(DB_URL);
    } catch (error) {
        throw error;
    }
}

module.exports = connectDb;
 ```

## Schema 
A schema is a JSON object that defines the the structure and contents of your data.
eg. User Schema has a name:string, email:string, password:string

## Model
A schema in an actual form. Individual user object from db, you can interact with.

```
/model/user.js
const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String
    },
    age: {
        type: Number
    }
});

const User = mongoose.model('User',UserSchema);

module.exports = User;
```

### server.js

```
const user = new User({name:"aman",age:21});
await user.save();
console.log(user)
```

OR 

```
const user = await User.create({name:"aman",age:21});
console.log(user);
```