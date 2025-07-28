import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        const token = req.cookies.token;
        if (!token) {
            return res.status(401).json({ message: "User not authenticated." });
        }

        const decode = jwt.verify(token, process.env.JWT_SECRET_KEY);
        if (!decode) {
            return res.status(401).json({ message: "Invalid token" });
        }

        req.id = decode.userId;  // <-- Ensure decode.userId exists in your token payload
        // console.log("Authenticated user id:", req.id);
        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export default isAuthenticated;
