import signUpSchemas from "../schemas/signup.schema.js";
import { comparePassword, hashPassword, signInJwt } from "../utils/jwt.js";
import { ResData } from "../utils/responseHelpers.js";
import otpGenerator from "otp-generator";
import nodemailer from "nodemailer";
import dotenv from "dotenv";

dotenv.config();

const otpStore = new Map(); // OTP larni vaqtinchalik saqlash
const userStore = new Map(); // Ro‘yxatdan o‘tish uchun vaqtincha saqlash

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,

    },
});


// Userni vaqtincha saqlab, OTP yuborish
export const signUp = async (req, res, next) => {
    try {
        const { name, email, password, phonenumber } = req.body;

        const existingUser = await signUpSchemas.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const otp = otpGenerator.generate(6, { upperCaseAlphabets: false, specialChars: false });
        otpStore.set(email, { otp, expiresAt: Date.now() + 2 * 60 * 1000 }); // 2 daqiqa
        userStore.set(email, { name, email, password, phonenumber });

        await transporter.sendMail({
            from: process.env.EMAIL_USER,
            to: email,
            subject: "Your OTP Code",
            text: `Your OTP code is: ${otp}. This code will expire in 2 minutes.`,
        });
       
        
        res.status(200).json(new ResData(200, "OTP sent successfully", { email }));
    } catch (error) {
        next(error);
    }
};

// OTPni tekshirib, userni ro‘yxatdan o‘tkazish 
export const verifyOtp = async (req, res, next) => {
    try {
        const { email, otp } = req.body;

        if (!otpStore.has(email) || !userStore.has(email)) {
            return res.status(400).json({ message: "OTP expired or invalid" });
        }

        const storedOtp = otpStore.get(email);
        if (storedOtp.otp !== otp || Date.now() > storedOtp.expiresAt) {
            return res.status(400).json({ message: "Invalid or expired OTP" });
        }

        const { name, password, phonenumber } = userStore.get(email);
        otpStore.delete(email);
        userStore.delete(email);

        const hashedPassword = await hashPassword(password);
        const newUser = new signUpSchemas({ name, email, password: hashedPassword, phonenumber });
        await newUser.save();

        const token = signInJwt({ userId: newUser._id });
        res.status(201).json(new ResData(201, "User registered successfully", { token, user: newUser }));
    } catch (error) {
        next(error);
    }
};




//  3- bosqich login qilish 

export const login = async (req, res, next) => {
    try {
        const { email, password } = req.body;

        // 1️⃣ Email bo‘yicha foydalanuvchini topamiz
        const user = await signUpSchemas.findOne({ email });
        if (!user) {
            return res.status(400).json({ message: "User not found" });
        }

        // 2️⃣ Parolni tekshiramiz
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ message: "Invalid password" });
        }

        // 3️⃣ Token yaratamiz
        const token = signInJwt({ userId: user._id });

        // 4️⃣ User ma’lumotlari bilan token qaytaramiz
        res.status(200).json(new ResData(200, "Login successful", { token, user }));

    } catch (error) {
        next(error);
    }
};