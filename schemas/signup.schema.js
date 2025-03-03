import { Schema, model } from "mongoose";

const signUp = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: false,
  },
  role:{
    type:String,
    default:"user"
  }
},{
    versionKey:false
});

const signUpSchemas = model("User", signUp);
export default signUpSchemas;
