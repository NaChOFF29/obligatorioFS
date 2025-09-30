export const notFoundMiddleware = (req, res, next) => {
    const errorResponse = {
        error: 'Ruta no encontrada',
        method: req.method,
        url: req.originalUrl
    };
    
    // En desarrollo, incluir más información
    if (process.env.NODE_ENV === "development") {
        errorResponse.availableRoutes = [
            'POST /v1/auth/register',
            'POST /v1/auth/login',
            'GET /v1/productos/publicos',
            'GET /v1/productos (auth)',
            'POST /v1/productos (auth)',
            'GET /v1/categorias (auth)',
            'PATCH /v1/usuarios/cambio-plan (auth)'
        ];
    }
    
    res.status(404).json(errorResponse);
};