export const errorMiddleware = (err, req, res, next) => {
    console.error("Error:", err);
    
    const status = err.status || 500;
    const message = err.message || 'Error interno del servidor';
    
    // Respuesta base
    const errorResponse = {
        error: message
    };
    
    // En desarrollo, incluir más detalles
    if (process.env.NODE_ENV === "development") {
        errorResponse.stack = err.stack;
        errorResponse.details = err.details || null;
    }
    
    res.status(status).json(errorResponse);
};