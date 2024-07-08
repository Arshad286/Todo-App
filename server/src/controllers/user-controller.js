import jwt from "jsonwebtoken";
import User from "../models/user-model.js";
import bcrypt from "bcrypt";

//Create Account

export const createAccount = async (req, res) => {

try{
  const { firstName, lastName, email, password } = req.body;

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      error: true,
      message: "All Fields are required",
    });
  }

  //Check if user already exist
  const existingUser  = await User.findOne({ email: email });

  if (existingUser ) {
    return res.status(409).json({
      error: true,
      message: "User already exist",
    });
  }

  const hashedPassword = await bcrypt.hash(password, 10);


  //Create a new user
  const newuser = new User({
    firstName,
    lastName,
    email,
    password:hashedPassword,
  });

  await newuser.save();

  const accessToken = jwt.sign(
    {
      user:newuser,
    },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: "3600m",
    }
  );

  return res.status(201).json({
    error: false,
    user:{
        id: newuser.id,
        firstName: newuser.firstName,
        lastName: newuser.lastName,
        email: newuser.email,
    },
    accessToken,
    message: "Registration Successfull",
  });

}catch(error){
    return res.status(500).json({
        error:true,
        message: "Intenal server error",
    });
}
};

//Login
export const loginAccount = async(req, res) => {
    try{
        const {email, password} = req.body;
        
        if(!email){
            return res.status(400).json({
                message: "Email is required",
            });
        }

        if(!password){
            return res.status(400).json({
                message: "Password is required",
            });
        }

        // Find user by email
        const userInfo = await User.findOne({
            email:email
        });

         // Check if user exists
        if(!userInfo){
            return res.status(400).json({message: "User not found"});
        }

        // Compare passwords
        const passwordMatch = await bcrypt.compare(password, userInfo.password);

        if (!passwordMatch) {
          return res.status(400).json({
            error: true,
            message: " Invalid credentials",
  
          });
        }
            const accessToken =  jwt.sign({user: userInfo}, process.env.ACCESS_TOKEN_SECRET, {
                expiresIn: "3600m",
            })

            return res.status(200).json({
                error:false,
                message: "Login Successful",
                email: userInfo.email,
                accessToken,
            });
        

    }catch(error){
        return res.status(500).json({
            error:true,
            message: "Intenal server error",
        });
    }
}
