import { ResData } from "../utils/responseHelpers.js";
import signUpSchemas from "../schemas/signup.schema.js";

export const getAllUsers = async (req, res, next) => {
    try {
        const users = await signUpSchemas.find(); // Barcha foydalanuvchilarni olib kelamiz
        res.status(200).json(new ResData(200, "Users fetched successfully", users));
    } catch (error) {
        next(error);
    }
};