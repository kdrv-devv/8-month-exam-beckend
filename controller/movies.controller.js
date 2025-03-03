import movieSchemas from "../schemas/movies.schema.js";
import { ResData } from "../utils/responseHelpers.js";
import dotenv from "dotenv";
dotenv.config();



export const addMovie = async (req, res, next) => {
    try {
        const newMovie = new movieSchemas(req.body); // Request body-dan malumot olamiz
        await newMovie.save(); // MongoDB-ga saqlaymiz
        res.status(201).json(new ResData(201, "Movie added successfully", newMovie));
    } catch (error) {
        next(error);
    }
};


export const editMovie = async (req, res, next) => {
    try {
        const { id } = req.params; // URL-dan ID olamiz
        const updatedMovie = await movieSchemas.findByIdAndUpdate(id, req.body, { 
            new: true,  // Yangilangan malumotni qaytaramiz
            runValidators: true // Validatsiyani ishga tushiramiz
        });

        if (!updatedMovie) {
            return res.status(404).json({ message: "Movie not found" });
        }

        res.status(200).json(new ResData(200, "Movie updated successfully", updatedMovie));
    } catch (error) {
        next(error);
    }
};


export const deleteMovie = async (req, res, next) => {
    try {
        const { id } = req.params;
        console.log("Deleting movie with ID:", id); // ID ni tekshiramiz
        
        const deletedMovie = await movieSchemas.findByIdAndDelete(id);

        if (!deletedMovie) {
            console.log("Movie not found!"); // Agar topilmasa log chiqaramiz
            return res.status(404).json({ message: "Movie not found" });
        }

        console.log("Movie deleted successfully:", deletedMovie); // O'chirish muvaffaqiyatli bo‘lsa log chiqaramiz
        res.status(200).json(new ResData(200, "Movie deleted successfully", deletedMovie));
    } catch (error) {
        console.error("Error deleting movie:", error);
        next(error);
    }
};


export const getAllMovies = async (req, res, next) => {
    try {
        const movies = await movieSchemas.find(); // Barcha kinolarni olib kelamiz
        res.status(200).json(new ResData(200, "Movies fetched successfully", movies));
    } catch (error) {
        next(error);
    }
};

export const getMovieById = async (req, res, next) => {
    try {
        const { id } = req.params; // URL dan ID ni olamiz
        const movie = await movieSchemas.findById(id); // MongoDB dan ID bo‘yicha qidiramiz

        if (!movie) {
            return res.status(404).json(new ResData(404, "Movie not found"));
        }

        res.status(200).json(new ResData(200, "Movie fetched successfully", movie));
    } catch (error) {
        next(error);
    }
};