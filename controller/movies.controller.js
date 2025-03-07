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


export const chiptaol = async (req, res, next) => {
    try {
        // Requestdan ma'lumotlarni olish
        const { movie_id, chipta_soni } = req.body;
        
        if (!movie_id || !chipta_soni || chipta_soni <= 0) {
            return res.status(400).json({ 
                success: false, 
                message: "Movie ID va chipta soni to'g'ri kiritilishi shart" 
            });
        }

        // Kinoni bazadan topish
        const movie = await movieSchemas.findById(movie_id);
        
        if (!movie) {
            return res.status(404).json({ 
                success: false, 
                message: "Kino topilmadi" 
            });
        }
        
        // Yetarlicha chipta borligini tekshirish
        if (!movie.ticket_count || movie.ticket_count < chipta_soni) {
            return res.status(400).json({ 
                success: false, 
                message: "Yetarlicha chipta mavjud emas", 
                mavjud_chipta: movie.ticket_count || 0 
            });
        }
        
        // Chipta sonini yangilash
        const yangiChiptaSoni = movie.ticket_count - chipta_soni;
        
        // Bazada ma'lumotlarni yangilash
        const yangilanganKino = await movieSchemas.findByIdAndUpdate(
            movie_id,
            { ticket_count: yangiChiptaSoni },
            { new: true } // Yangilangan ma'lumotni qaytarish uchun
        );
        
        // Muvaffaqiyatli javob qaytarish
        res.status(200).json({
            success: true,
            message: "Chipta muvaffaqiyatli olindi",
            data: {
                movie_title: movie.title,
                olingan_chipta: chipta_soni,
                qolgan_chipta: yangilanganKino.ticket_count
            }
        });
        
    } catch (error) {
        console.error("Chipta olishda xatolik:", error);
        next(error);
    }
};