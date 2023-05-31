const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const JWT_SECRET = "newtonSchool";

const decodeToken = (req, res, next) => {
    try {
        let { token } = req.body;
        console.log(token);
        const decodedToken = jwt.verify(token, JWT_SECRET);
        res.status(200).json({ payload: decodedToken, status: "Success" });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: err.message
        });
    }
};
const signup = async (req, res, next) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.create({
            username,
            email,
            password,
            profilePicture: "https://example.com/default-profile-picture.jpg",
            bio: "",
            location: "",
            website: "",
            socialMediaHandles: {
                twitter: "",
                linkedin: "",
            },
            interests: [],
            privacySettings: {
                isProfilePublic: true,
            },
        });
        res.status(201).json({
            status: "success",
            data: {
                user,
            },
        });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: err.message
        });
    }
};

const logout = (req, res) => {
    const token = req.headers.authorization;

    if (!token) {
        return res
            .status(401)
            .json({
                message: "Authentication failed: Missing token.",
                status: "Error",
            });
    }

    try {
        jwt.verify(token, JWT_SECRET);
        res.clearCookie("token");
        return res
            .status(200)
            .json({ message: "Logged out successfully.", status: "Success" });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: err.message
        });
    }
};

const login = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            message: "Please provide email and password",
            status: "Error",
        });
    }

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password",
                status: "Error",
                error: "Invalid Credentials",
            });
        }

        const passwordMatches = await bcrypt.compare(password, user.password);
        if (!passwordMatches) {
            return res.status(401).json({
                message: "Invalid email or password",
                status: "Error",
                error: "Invalid Credentials",
            });
        }

        const token = jwt.sign(
            { userId: user._id, username: user.username, email: user.email },
            JWT_SECRET,
            {
                expiresIn: "1h",
            }
        );

        res.status(200).json({ token, status: "Success" });
    } catch (err) {
        res.status(500).json({
            status: 'error',
            message: 'Internal Server Error',
            error: err.message
        });
    }
};

module.exports = { login, logout, signup, decodeToken };
