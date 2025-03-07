import { Router } from "express";
import { router as authRouter } from "./auth/auth.router.js";
import { router as moviesRouter } from "./movies/movies.router.js";
import { router as usersRouter } from "./users/users.router.js";
const router = Router()


router.use("/auth", authRouter )
router.use("/admin" ,moviesRouter )
router.use("/user",usersRouter)



export {router}