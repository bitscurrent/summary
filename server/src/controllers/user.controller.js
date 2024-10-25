
import USER from "../models/user.model.js";
import bcrypt from "bcrypt";
import { validationResult } from "express-validator";

const registerUser = async (req, res) => {
    const { fullname, email, password } = req.body;

    // Express validations
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        // First check if user already exists
        const user = await USER.findOne({ email });
        if (user) {
            return res.status(400).json({ message: "User already exists" });
        }

        // Hash the password with a salt round of 10
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert new user into the database
        await USER.create({
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

export { registerUser };
