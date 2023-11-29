import { User } from "../models/User.js";

export const loginUser = async (req, res) => {
   try {
      const { email, password } = req.body;
      let user = await User.findOne({ email }).select("+password");
      if (!user) return res.status(500).json({ success: false, message: "User Dosn't Exist" })
      let isPasswordMAtch = await user.comparePassword(password);
      if (!isPasswordMAtch) return res.status(500).json({ success: false, message: "Password dostn't match" });
      const token = await user.getJWTToken();
      const options = {
         expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
         httpOnly: true,
         secure: true,
         sameSite: "none",
      };
      res.status(200).cookie("token", token, options).json({ success: true, user })
   } catch (error) {
      return res.status(200).json({ success: false, message: error.message })
   }
}

export const registerUser = async (req, res) => {
   try {
      const { name, email, password, } = req.body;
      let user = await User.findOne({ email });
      if (user) return res.status(500).json({ success: false, message: "User Already Exist" });
      user = await User.create({ name, email, password });
      const token = await user.getJWTToken();

      const options = {
         expires: new Date(Date.now() + 15 * 24 * 60 * 60 * 1000),
         httpOnly: true,
         secure: true,
         sameSite: "none",
       };

      res.status(200).cookie("token", token, options).json({ success: true, user })
   } catch (error) {
      return res.status(200).json({ success: false, message: error.message })
   }
}

export const logoutUser = async (req, res) => {
   try {
     const options = {
       expires: new Date(0), // Set expiration date to a past date
       httpOnly: true,
       secure: true,
       sameSite: "none",
     };
     res.status(200).cookie("token", "null", options).json({ success: true, message: "Logout Successfully" });
   } catch (error) {
     return res.status(500).json({ success: false, message: error.message });
   }
 };

export const profile = async (req, res) => {
   try {
      let user = await User.findById(req.user._id)
      if (!user) return res.status(500).json({ success: false, message: "User not found" })
      res.status(200).json({ success: true, user })
   } catch (error) {
      res.status(200).json({ success: false, message: error.message })
   }
}