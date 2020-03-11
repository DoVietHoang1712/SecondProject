const {mongoose} = require('../database/database');
const jwt = require('jsonwebtoken');
const secret = 'secret';

const UserSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

const User = mongoose.model('User', UserSchema);

const Register = async(name, email, password) => {
    try {
        let foundUser = await User.find({email});
        if(foundUser.length > 0) {
            throw 'Email is existed';
        } else{
            let newUser = new User();
            newUser.name = name;
            newUser.email = email;
            newUser.password = password;
            await newUser.save();
        }
    } catch (error) {
        throw error;
    }
}

const Login = async (email, password) => {
    try {
        let foundUser = await User.find({email}).exec();
        if(foundUser.length == 0){
            throw 'Email is not registed';
        } else{
            if(password === foundUser.password){
                let object = {id: foundUser.id};
                let tokenKey = await jwt.sign(object, secret, {expiresIn: 86400});
                return tokenKey;
            } else{
                throw 'Incorrect Password';
            } 
        }
    } catch (error) {
        throw error;
    }
}

const Verify = async (tokenKey) => {
    try {
        let decode = await jwt.verify(tokenKey, secret);
        if(Date.now() / 1000 > decode.exp) {
            throw 'Token het han';
        }
        let foundUser = await User.findById(decode.id);
        return foundUser;
    } catch (error) {
        throw error;
    }
}

module.exports = {User, Register, Login, Verify};