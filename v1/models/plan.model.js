import mongoose from "mongoose";
const { Schema, model } = mongoose;

const planSchema = new Schema({
    nombre: {type:String, required:true},
    descripcion: {type:String, required:true},
})

export default model("Plan", planSchema, "planes");