import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const mongoURI = process.env.NODE_ENV === "development" ? 
            process.env.MONGO_URI_DEV : process.env.MONGO_URI;
            
        if (!mongoURI) {
            throw new Error("MongoDB URI no está definida en las variables de entorno");
        }

        await mongoose.connect(mongoURI, {
            maxPoolSize: 10, // Máximo 10 conexiones en el pool
            serverSelectionTimeoutMS: 5000, // Tiempo para seleccionar servidor
            socketTimeoutMS: 45000, // Timeout de socket
        });
        
        console.log("Base de datos conectada");
        
    } catch (error) {
        console.error("Error al conectar a la base de datos:", error);
        // En producción, no queremos que la app se caiga por error de DB
        if (process.env.NODE_ENV !== "production") {
            process.exit(1);
        }
    }
}

export default connectDB;