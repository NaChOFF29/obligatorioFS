import mongoose from "mongoose";
const { Schema } = mongoose;
import Rol from "../models/rol.model.js";

const usuarioSchema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    rol: { type: Schema.Types.ObjectId, ref: "Rol", required: true, default:"68cea1869eb0f5acc29eb90a" },
    nombre: { type: String }
})

export default mongoose.model('Usuario', usuarioSchema);