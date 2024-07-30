import Users from "../models/Users.js";
import Profile from "../models/Profile.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//userRegister
//post Request
export const Register = async (req, res) => {
    const {
        firstname,
        lastname,
        email,
        password,
        phone_number,
        country_code,
    } = req.body;

    try {
        // Check if user exists
        const existingUser = await Users.findOne({ phone_number });
        if (existingUser) {
            return res.status(409).json({
                message: `User with phone number ${phone_number} already exists`,
            });
        }

        // Hash the password asynchronously
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const newUser = await Users.create({
            name: `${firstname} ${lastname}`,
            email,
            phone_number,
            country_code,
            password: hashedPassword,
        });
        await Profile.create({ user_id: newUser?._id });

        // Respond with the created user
        res.status(201).json({
             newUser,
            message: "Successfully registered",
        })
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Registration Failed" });
    }
};

//userLogin
//post
export const Login = async (req, res) => {
    const { phone_number, password } = req.body;

    try {
        // Check if user exists
        const user = await Users.findOne({ phone_number });
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Check if password is correct
        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        // Generate JWT tokens
        const accessToken = jwt.sign({ id: user._id }, process.env.LOGIN_SECRET, { expiresIn: '6h' });
        const refreshToken = jwt.sign({ id: user._id }, process.env.LOGIN_SECRET, { expiresIn: '7d' });

        // Update the user's tokens in the database 
        const updates = {  accessToken, refreshToken };
        const updatedUser = await Users.findByIdAndUpdate(
            user._id,
            { $set: updates },
            { new: true }
        )
        .select("name email phone_number ");

        // Respond with the user and tokens
        res.status(200).json({
            message: "Login successful",
            user: updatedUser,
            accessToken,
            refreshToken
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Login Failed" });
    }
};


//logout
//get
export const Logout = async (req, res) => {
    const user = req.userId;
    try {
        const loggedUser = await Users.findById(
            user
          );
          if (!loggedUser) {
            return res.status(404).json({ message: "User does not exist" });
          }
         
            // Remove the user's tokens
          const updates = await Users.findByIdAndUpdate(
            loggedUser._id,
            { $set: {access_token: null} },
            { new: true }
          );
      
        // Respond with a success message
        res.status(200).json({ message: "Logout successful", updatedUser: updates });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Logout Failed" });
    }
};
