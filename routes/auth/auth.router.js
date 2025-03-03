import { Router } from "express";
import { login, signUp, verifyOtp } from "../../controller/auth.controller.js";

const router = Router()

router.post("/register" ,signUp ) // -1
router.post("/register-otp" ,verifyOtp )  // -2
router.post("/login" ,login )  // -3


export {router}