import jwt from "jsonwebtoken";
import { User } from "../models/User.js"

export const isAuthenticated = async (req, res, next) => {
   try {
      const { token } = req.cookies;
      if (!token) return res.status(500).json({ success: false, message: "Please login first" })
      const decodedId = await jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decodedId._id)
      next();
   } catch (error) {
      res.status(500).json({ success: false, message: error.message })
   }
}
