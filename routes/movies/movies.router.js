import { Router } from "express";
import { addMovie, deleteMovie, editMovie, getAllMovies, getMovieById } from "../../controller/movies.controller.js";
import { verifyMiddlewere } from "../../middleware/verifytokenmiddleware.js";

const router = Router()

router.get("/get-movies",verifyMiddlewere, getAllMovies);
router.get("/get-movies/:id",verifyMiddlewere, getMovieById);
router.post("/add-movie",verifyMiddlewere , addMovie ) 
router.patch("/edit-movie/:id",verifyMiddlewere , editMovie ) 
router.delete("/delete-movie/:id", verifyMiddlewere, deleteMovie);

export {router}