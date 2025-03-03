import { Router } from "express";
import { signUp } from "../../controller/auth.controller.js";

const router = Router()

router.get("/sign-up" ,signUp )




export {router}