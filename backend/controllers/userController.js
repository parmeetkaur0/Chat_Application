import { User } from "../models/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
    try {
        const { fullName, username,email, password, confirmPassword, gender } = req.body;
        if (!fullName || !username || !email || !password || !confirmPassword || !gender) {
            return res.status(400).json({ message: "All fields are required" });
        }
        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Password do not match" });
        }

        const user = await User.findOne({ username });
        if (user) {
            return res.status(400).json({ message: "Username already exit try different" });
        }
        const userEmail = await User.findOne({ email });
        if (userEmail) {
            return res.status(400).json({ message: "User already exist" });
        }
       
        const hashedPassword = await bcrypt.hash(password, 10);

        // profilePhoto
        const profilePhoto = `https://ui-avatars.com/api/?name=${encodeURIComponent(fullName)}&size=200&rounded=true&bold=true`;

        await User.create({
            fullName,
            username,
            email,
            password: hashedPassword,
            profilePhoto,
            gender
        });
        return res.status(201).json({
            message: "Account created successfully.",
            success: true
        })
    } catch (error) {
        console.log(error);
    }
};

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "All fields are required" });
        }

        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "Incorrect username or password" });
        }

        const isPasswordMatch = await bcrypt.compare(password, user.password);
        if (!isPasswordMatch) {
            return res.status(400).json({ message: "Incorrect username or password" });
        }

        const tokenData = { userId: user._id };
        const token = jwt.sign(tokenData, process.env.JWT_SECRET_KEY, { expiresIn: '1d' });

        return res
            .status(200)
            .cookie("token", token, {
                httpOnly: true,
                secure: true,           // ✅ Required for cross-origin & HTTPS
                sameSite: 'None',       // ✅ Allow cross-site requests (Vercel <-> Render)
                maxAge: 24 * 60 * 60 * 1000 // 1 day
            })
            .json({
                _id: user._id,
                username: user.username,
                fullName: user.fullName,
                profilePhoto: user.profilePhoto
            });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const logout = (req, res) => {
    try {
        return res.status(200).cookie("token", "", { maxAge: 0 }).json({
            message: "logged out successfully."
        })
    } catch (error) {
        console.log(error);
    }
}
export const getOtherUsers = async (req, res) => {
    try {
        const loggedInUserId = req.id;
        const otherUsers = await User.find({ _id: { $ne: loggedInUserId } }).select("-password");
        return res.status(200).json(otherUsers);
    } catch (error) {
        console.log(error);
    }
}

export const updateProfile = async (req, res) => {
    try {
        if (!req.user || !req.user._id) {
            return res.status(401).json({ message: "Unauthorized" });
        }

        const userId = req.user._id;
        const { fullName, username } = req.body;

        if (!fullName || !username) {
            return res.status(400).json({ message: 'FullName and Username are required' });
        }

        const existingUser = await User.findOne({
            username,
            _id: { $ne: userId }
        });

        if (existingUser) {
            return res.status(400).json({ message: 'Username already taken' });
        }

        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { fullName, username },
            { new: true, runValidators: true }
        ).select("-password");

        return res.status(200).json({ updatedUser });

    } catch (error) {
        console.error("Update Profile Error:", error);

        if (error.code === 11000) {
            return res.status(400).json({ message: "Username already exists" });
        }

        res.status(500).json({ message: error.message });
    }
};
