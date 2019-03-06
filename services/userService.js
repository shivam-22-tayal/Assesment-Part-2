const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

mongoose.connect('mongodb://localhost:27017/jwtsample');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    }
});
const businessUserSchema = new Schema({
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    password:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    },
    gender:{
        type: String,
        required: true
    },
    businessid:{
        type: String,
        required:true
    }
});
const User = mongoose.model('User',userSchema);
const Business = mongoose.model('Business',businessUserSchema)

const signup = (user,callback)=>{
    // synchronous method for hashing
    let hashedPassword = bcrypt.hashSync(user.password,10);
    const userObj = new User({
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: hashedPassword,
        phone: user.phone,
        gender: user.gender
    });
    User.create(userObj,(err,response)=>{
        callback(err,response);
    });   
}
const findUser = (email,callback)=>{
    User.findOne({ email: email},(err,data)=>{
        callback(err,data);
    });
}

//business singup
const businessUserSignup = (business,callback)=>{
    // synchronous method for hashing
    let hashedPassword = bcrypt.hashSync(user.password,10);
    const businessObj = new Business({
        firstName: business.firstName,
        lastName: business.lastName,
        email: business.email,
        password: hashedPassword,
        phone: business.phone,
        gender: business.gender,
        businessid: business.businessid
    });
    Business.create(businessObj,(err,response)=>{
        callback(err,response);
    });   
}

module.exports= {
    signup : signup,
    findUser : findUser,
    businessUserSignup: businessUserSignup
}