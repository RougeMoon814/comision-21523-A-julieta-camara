
import { validationResult } from "express-validator";

export const validator = (req, res, next) => {
    const errors = validationResult(req)

    // Check if all fields are empty
    const { title, description, poster } = req.body;
    if (title.trim() === '' && description.trim() === '' && poster.trim() === '') {
        return res.status(400).json({ message: "Please fill in at least one field" });
    }

    if (!errors.isEmpty()) {
        return res.status(400).json(errors)
    }

    next()
}