import { Router } from "express";
import { getAllUsers } from "../../controller/users.controller.js";

const router = Router()

router.get("/get-all-users" , getAllUsers);


export {router}