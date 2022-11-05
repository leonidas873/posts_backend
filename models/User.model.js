import mongoose from "mongoose"
import validator from 'validator';
import bcrypt from 'bcrypt';

const Schema = mongoose.Schema


const userSchema = new Schema({
    nickname: {
        type:String,
        required:[true, "please eneter nickname"],
        unique:true,
        lowercase:true,
    },
    email: {
        type:String,
        required:[true, "please eneter an email"],
        unique:true,
        lowercase:true,
        validate:[validator.isEmail, "Please enter valid email"]
    },
    password: {
        type:String,
        required:[true, "please eneter an email"],
    },
})

// fire function after doc saved to db

// userSchema.post('save', function(doc, next){
//     console.log("new use was created adn saved", doc)
//     next()
// })

// fire function before doc saved to db

userSchema.pre('save', async function(next){
    console.log('user about to be created an saved', this)
    const salt = await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password, salt)
    next()
})

// static method to login user-select: 

userSchema.statics.login = async function(email, password) {
    const user = await this.findOne({email});

    if(user){
       const auth = await bcrypt.compare(password, user.password)
       if(auth){
        return user
       }
       throw Error('incorrect password')
    }
    throw Error ('incorrect email')
}

export default mongoose.model('user', userSchema)