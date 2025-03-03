import { Router } from "express";
import { router as authRouter } from "./auth/auth.router.js";
import { router as moviesRouter } from "./movies/movies.router.js";
const router = Router()


router.use("/auth", authRouter )
router.use("/admin" ,moviesRouter )



export {router}