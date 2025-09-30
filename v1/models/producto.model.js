import mongoose from "mongoose";
const { Schema } = mongoose;

const productoSchema = new Schema({
  nombre: { type: String, required: true },
  descripcion: { type: String },
  precio: { type: Number, required: true },
  categoria: { type: Schema.Types.ObjectId, ref: "Categoria", required: true },
  usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Producto", productoSchema);
