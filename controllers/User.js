import bcrypt from 'bcryptjs'; // Make sure to install bcryptjs
import Users from "../models/Users.js";

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const userId = req.userId;
    let {
    firstname,
    lastname,
    phone_number,
    email,
    password,
    country_code
      } = req.body;

    try {
       const User = await Users.findById(id);
        if (!User) {
            return res.status(404).json({ message: "User not found" });
        }
      
    // perform update in users collection
    const existingUser = await Users.findById(User.id);
    firstname = firstname || existingUser.name.split(" ")[0];
    lastname = lastname || existingUser.name.split(" ")[1];
    // Check if the inputed phone_number already exists for another user
    if (phone_number && phone_number !== existingUser.phone_number) {
      const phoneExists = await Users.findOne({ phone_number });
      if (phoneExists) {
        return res.status(400).json({ message: "Phone number already exists" });
      }
    }

    // Check if the inputed fields already exists for another user
    const userUpdates = {
        name: `${firstname} ${lastname}`,
        email: email || existingUser.email,
        country_code: country_code || existingUser.country_code,
        phone_number: phone_number || existingUser.phone_number,
        updated_by: userId,
      };
      if (password) {
        const hashedPassword = bcrypt.hash(password, bcrypt.genSaltSync(10)); // Hash the new password
        userUpdates.password = hashedPassword; // Update the password field
    }
      const updatedUser = await Users.findByIdAndUpdate(
        existingUser._id,
        {
          $set: userUpdates,
        },
        {
          new: true,
        }
      ).select('-password');
      return res
      .status(200)
      .json({ message: "User successfully updated", updatedUser });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "User update failed" });
    }
};

//delete user

export const deleteUser = async (req, res) => {
    const { id } = req.params;

    try {
        const user = await Users.findOne({ _id: id }); // Find the user by ID
        console.log(user);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
       const deletedUser = await  Users.findByIdAndDelete(
        user._id,
        { access_token: null },
        { new: true }
    )
       return res.status(200).json({ 
            message: "User deleted successfully",
            deletedUser,
         });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "User delete failed" });
    }
};
