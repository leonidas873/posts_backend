import UserModel from "../models/User.model.js"
import  jwt  from "jsonwebtoken";

// handle errors

const handleErrors = (err) =>{
    console.log(err)
    let errors = {email:'', password:''};

    // duplicate error 

    if(err.code === 11000) {
        errors.email = "that email is already used"
    }

    // validation errors
    if(err.message.includes('user validation failed')){
        Object.values(err.errors).forEach(({properties})=>{
            errors[properties.path] = properties.message
        })
    }

    if(err.message==='incorrect email'){
        errors.email = 'incorrect email'
    }

    if(err.message ==='incorrect password'){
        errors.password = 'incorrect password'
    }

    return errors
}

// create token
const maxAge = 3 * 24 * 50 * 60
const createAccessToken = (user) => {
 
   return jwt.sign({...user}, process.env.ACCESS_TOKEN_SECRET,{
    expiresIn:maxAge
   })

}

// signup controller

export const signUpAsync = async (req, res) => {
    const {email, password, nickname} = req.body
    console.log(email, password, nickname)
    try {
        const user = await UserModel.create({email, password, nickname});
        res.status(201).send("user is created succesfully")
    } catch (err) {
        res.status(400).json(handleErrors(err))
    }
}

//  login controller

export const loginAsync = async (req, res) => {
    const {email, password} = req.body;

    try {

        const user = await UserModel.login(email, password);
        const accessToken = createAccessToken(user);

        res.status(200).json({userId:user._id, nickname:user.nickname, accessToken})

    } catch (err) {
        const errors = handleErrors(err)
        res.status(400).json(errors);
    }
}


