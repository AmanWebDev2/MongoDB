const mongoose = require('mongoose');

const AddressSchema = mongoose.Schema({
    street: String,
    city: String
})

const UserSchema = mongoose.Schema({
    name: {
        type: String,
    },
    email: {
        type: String
    },
    age: {
        type: Number,
        min: 1,
        max: 100,
        validate: {
            validator: (val) => {
                return val % 2 === 0; 
            },
            message: (props) => {
                console.log(props);
                return `${props.value} is not an even number`
            }
        }
    },
    hobbies: [String], // ["sleeping","reading"]
    bestFriend:{
       type: mongoose.SchemaTypes.ObjectId,
       ref: 'User'
    }, //reference
    address: AddressSchema,
    createdAt: {
        type: Date,
        immutable: true, // cannot change created at 
        default: () => {
            Date.now()  // run every time we save or create
        }
    },
    updatedAt: Date,

});

const User = mongoose.model('User',UserSchema);

module.exports = User;