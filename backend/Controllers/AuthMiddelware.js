import jwt from "jsonwebtoken"
import { User } from "../Models/User.js"


const authMiddleware = async (req, res, next) => {
    try {
        const token = req.cookies.token
  
        if (!token) {
            return res.status(401).json({ message: "Not authorized, no token" })
        }

        const decoded = jwt.verify(token, "secretkey")
        req.user = await User.findById(decoded.id).select("-password")

        if (!req.user) {
            return res.status(401).json({ message: "User not found" })
        }

        next()
    } catch {
        res.status(401).json({ message: "Invalid or expired token" })
    }
}

export { authMiddleware }
