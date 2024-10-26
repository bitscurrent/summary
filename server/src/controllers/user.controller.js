
import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";
import generateJWT from "../utils/jwt.util.js";


const registerUser = async (req, res) => {
    const { fullname, email, password } = req.body;

    // Express validations
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // First check if user already exists
        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password with a salt round of 10
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        await User.create({
            email,
            fullname,
            password: hashedPassword,
        });

        res.status(201).json({
            message: "User registered successfully",
        });
    } catch (error) {
        console.error("Error creating user:", error); // Log the error for debugging
        res.status(500).json({ message: "Error creating user" });
    }
};


const loginUser = async (req, res) => {
	const { email, password } = req.body;

	// Express validations
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(400).json({ errors: errors.array() });
	}

	try {
		// Check if user exists
		const user = await User.findOne({ email });
		if (!user) {
			return res.status(400).json({ message: "User doesn't exist" });
		}

		// Check for password match
		const isMatch = await bcrypt.compare(password, user.password);
		if (!isMatch) {
			return res.status(401).send("Incorrect password");
		}

		// Generate JWT token
		const jwtToken = generateJWT( { email: user.email });

		// Set token in cookie
		res.cookie("token", jwtToken, {
			secure: true,
			httpOnly: false, // Adjust as needed for security
			sameSite: "none"  // Adjust based on client/server requirements
		});

		// Return success response
		res.status(200).json({
			message: `Welcome, ${user.fullname}`,
			jwtToken: jwtToken  // Include the token in the response
		});
	} catch (error) {
		console.error("Error logging in:", error);
		res.status(500).json("Error logging in");
	}
};




export { 
    registerUser,
    loginUser
 };
