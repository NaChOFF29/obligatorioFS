// Middleware para manejar errores específicos de la aplicación
export const handleSpecificErrors = (err, req, res, next) => {
    // Error de MongoDB - duplicado (violación de unique constraint)
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue)[0];
        const value = err.keyValue[field];
        err.status = 400;
        err.message = `${field} '${value}' ya existe`;
    }
    
    // Error de validación de Mongoose
    if (err.name === 'ValidationError') {
        const errors = Object.values(err.errors).map(error => error.message);
        err.status = 400;
        err.message = `Error de validación: ${errors.join(', ')}`;
    }
    
    // Error de JWT
    if (err.name === 'JsonWebTokenError') {
        err.status = 401;
        err.message = 'Token inválido';
    }
    
    if (err.name === 'TokenExpiredError') {
        err.status = 401;
        err.message = 'Token expirado';
    }
    
    // Error de conexión a MongoDB
    if (err.name === 'MongoNetworkError') {
        err.status = 503;
        err.message = 'Error de conexión a la base de datos';
    }
    
    // Pasar al siguiente middleware (errorMiddleware)
    next(err);
};