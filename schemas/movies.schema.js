import { Schema, model } from "mongoose";

const movieSchema = new Schema(
    {
        title: { type: String, required: true },
        ageRestriction: { type: Number, required: true },
        image: { type: String, required: true },
        targetAudience: { type: String, required: true }, // Example: "For Kids"
        genre: { type: [String], required: true }, // Example: ["Animation", "Comedy", "Adventure"]
        availableDate: { type: String, required: true }, // Example: "Today", "Tomorrow", "Day after tomorrow"
        availableTime: { type: String }, // Example: "14:30" (only if available today)
        format: { type: String, required: true }, // Example: "2D", "3D", "4D"
        price: { type: String, required: true },
        hallNumber: { type: String, required: true },
        director: { type: String, required: true },
        duration: { type: String, required: true }, // in minutes
        country: { type: String, required: true },
        year: { type: String, required: true },
        description: { type: String, required: true },
        format:{type :String  , required:false},
        ticket_count:{type:Number , required:false , default:1}

    },
    { versionKey: false }
);

const movieSchemas = model("Movies", movieSchema);
export default movieSchemas;
