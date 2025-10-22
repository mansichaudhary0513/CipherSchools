import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import { User } from "../Models/User.js"


dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;
const COOKIE_NAME = process.env.COOKIE_NAME;

const generateToken = (user) => {
    return jwt.sign(
        { id: user._id, email: user.email, fullName: user.fullName },
        JWT_SECRET,
        { expiresIn: "1d" }
    )
}

const Signup = async (req, res) => {
    try {

        const { fullName, email, password } = req.body
        if (!fullName || !email || !password) {
            return res.status(400).json({ message: "All fields required" })
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" })
        }

        const hashedPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ fullName, email, password: hashedPassword })
        const token = generateToken(user)

        res.cookie(COOKIE_NAME, token, {
            httpOnly: true,
            secure: "false",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        })

        res.status(201).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email
        })
    } catch {
        res.status(500).json({ message: "Server error" })
    }
}


const Login = async (req, res) => {
    try {
        
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(400).json({ message: "All fields required" })
        }

        const user = await User.findOne({ email })
        if (!user) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" })
        }

        const token = generateToken(user)

        res.cookie(COOKIE_NAME, token, {
            httpOnly: true,
            secure: "false",
            sameSite: "lax",
            maxAge: 24 * 60 * 60 * 1000
        })

        res.json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email
        })
    } catch {
        res.status(500).json({ message: "Server error" })
    }
}

const Logout = async (req, res) => {
    try {
        console.log('logout called');
        res.clearCookie(COOKIE_NAME, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax"
        })
        res.status(200).json({ message: "Logged out successfully" })
    } catch {
        res.status(500).json({ message: "Server error" })
    }
}



const verifyUser = async (req, res) => {
    try {
        if (!req.user) {
            return res.status(401).json({ message: "Not authorized" })
        }
        res.status(200).json({
            success: true,
            message: "User verified successfully",
            user: req.user, 
        })
    } 
    catch (error) {
        res.status(500).json({ message: "Server error", error: error.message })
    }
}


export { Signup, Login, Logout, verifyUser}
