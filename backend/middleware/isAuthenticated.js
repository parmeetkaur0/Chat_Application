import jwt from "jsonwebtoken";
import {User} from "../models/userModel.js";

const isAuthenticated = async (req, res, next) => {
     try {
        const token = req.cookies.token; // OR headers

        if (!token) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);
         if (!decoded) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.id = decoded.userId;  

        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(401).json({ message: "User not found" });
        }

        req.user = user; // ✅ VERY IMPORTANT

        next();
    } catch (error) {
        return res.status(401).json({ message: "Invalid token" });
    }
};

export default isAuthenticated;

