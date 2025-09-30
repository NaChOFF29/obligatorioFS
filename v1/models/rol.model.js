import mongoose from "mongoose";
const { Schema, model } = mongoose;

const rolSchema = new Schema({
    nombre: {type:String, required:true},
    descripcion: {type:String, required:true},
})

export default model("Rol", rolSchema, "roles");