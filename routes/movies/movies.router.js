import { Router } from "express";
import { addMovie, chiptaol, deleteMovie, editMovie, getAllMovies, getMovieById } from "../../controller/movies.controller.js";
import { verifyMiddlewere } from "../../middleware/verifytokenmiddleware.js";

const router = Router()

router.get("/get-movies", getAllMovies);
router.get("/get-movies/:id", getMovieById);
router.post("/add-movie" , addMovie ) 
router.patch("/edit-movie/:id", editMovie ) 
router.delete("/delete-movie/:id", deleteMovie);
router.patch("/chiptaol" ,chiptaol )
export {router}

