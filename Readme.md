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

const AddressSchema = mongoose.Schema({
    street: String,
    city: String
})

const UserSchema = mongoose.Schema({
    name: String,
    email: String,
    age: Number,
    hobbies: [String],
    bestFriend: mongoose.SchemaTypes.ObjectId, //reference
    address: AddressSchema,
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

// update
user.name = "rahul";
await user.save();
console.log(user); // name = rahul
```
 

## Validation
```
const UserSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String,
        minLenght: 10,
        maxLength: 130,
        required: true,
        lowercase: true, // automatically conver to lowercase
        // uppercase: true
    },
    age: {
        type: Number,
        min: 1,
        max: 100,
        validate: {
            validator: (val) =>{
                return val % 2 === 0 
            },
            message: (props) => {
                return `${props.value} is not an event number`
            }
        }
    },
    createdAt: {
        type: Date,
        immutable: true,  
        default: () => {
            Date.now()
        }
    },
    updatedAt: {
        type: Date,
        immutable: true,
        default: () => {
            Date.now()
        }
    }
    hobbies: [String],
    bestFriend: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'User'
    },  //reference
    address: AddressSchema,

});

```

``` default: () => { } ``` every time we create an user then this default function will call
``` immutable: true ``` means we cannot change it

## Query

### findById
```
const user = await User.findById('q3232423');
```
### find
```
const user = await User.find({ name: 'aman' }); 
```
### findOne
```
const user = await User.findOne({ name: 'aman' }); // first matches
```
### Model_Name.exits
``` 
const user = await User.exists({ name: 'aman' }); // return boolean 
```
### deleteOne
```
 await User.deleteOne({ name: 'aman' }); //firs matches 
```
### deleteMany
```
 await User.deleteMany({ age: 18 }); 
```
### where query
```
 const user = await User.where("name").equals("aman"); 
```
### gt, lt

```
 const user = await User.where("age").gt(18); 
```
```
// and query
 const user = await User.where("name").equals("aman").where("age").lt(40); 
```
```
// age between 18 to 48;
const users = await User.where("age").gt(18).lt(40);
```
### limit
```
// limit number of users you want
const users = await User.where("age").gt(18).lt(40).limit(2);
// fetching 2 results
```
### select
```
// select -> shows you particular fields onyl
const users = await User.where("age").gt(18).lt(40).limit(2).select("name");
// fetching 2 results having name field only
```
### populate
```
const user = await User.findOne({name:"aman"}).populate("bestFriend");
```

# Schema Methods
```
// add method to every instance we create
UserSchema.methods.sayHi = function() {
    console.log('hi, my name is ', this.name); // for every instance
}

// can only user function express, no arrow function allowed
UserSchema.statics.findByName = function(name) {
    return this.where({name: new RegExp(name,'i')});
}
const user = await User.findByName("aman").populate("bestFriend");
console.log(user.sayHi())
```

```
UserSchema.query.byName = function(name) {
    return this.where({name: new RegExp(name,'i')});
}

// now we can apply byName as a chaining
const user = await UserSchema.find().byName("aman");
console.log(user);
```

# Virtual

### pre
```
// do something before save, validate or remove
UserSchema.pre("save", function(next) {
    this.updatedAt = Date.now();
    next();
})  
```
### post
```
// do something after save, validate or remove
UserSchema.post("save", function(doc,next) {
    doc.sayHi();
    next();
})  
```
