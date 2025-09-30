import mongoose from "mongoose";
const { Schema } = mongoose;

const categoriaSchema = new Schema({
  nombre: { type: String, required: true, unique: true },
  descripcion: { type: String }
});

export default mongoose.model("Categoria", categoriaSchema);
