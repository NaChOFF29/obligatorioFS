# Obligatorio Full Stack - API

## 🚀 Despliegue en Vercel

### Variables de entorno requeridas en Vercel:

1. **MONGO_URI**: Tu string de conexión a MongoDB Atlas
   ```
   mongodb+srv://usuario:password@cluster.mongodb.net/obligatoriofs
   ```

2. **JWT_SECRET**: Una cadena aleatoria segura para firmar tokens
   ```
   tu_jwt_secret_super_seguro_aqui
   ```

3. **NODE_ENV**: Ambiente de ejecución
   ```
   production
   ```

### 📝 Configuración en Vercel Dashboard:

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega las siguientes variables:
   - `MONGO_URI`: Tu URI de MongoDB Atlas
   - `JWT_SECRET`: Un string seguro para JWT
   - `NODE_ENV`: `production`

### 🔗 URL de la API desplegada:

```
https://obligatorio-fs-five.vercel.app
```

### 📋 Endpoints disponibles:

#### Autenticación (públicos):
- `POST /v1/auth/register` - Registro de usuario
- `POST /v1/auth/login` - Inicio de sesión

#### Consultas públicas:
- `GET /v1/productos/publicos` - Listar todos los productos de todos los usuarios

#### Protegidos (requieren token JWT):
- `GET /v1/categorias` - Listar categorías
- `GET /v1/categorias/:id` - Obtener categoría por ID
- `GET /v1/productos` - Listar productos del usuario
- `POST /v1/productos` - Crear producto
- `PUT /v1/productos/:id` - Modificar producto
- `DELETE /v1/productos/:id` - Eliminar producto
- `PATCH /v1/usuarios/cambio-plan` - Cambiar plan de usuario (de plus a premium)

### 🧪 Ejemplo de uso:

1. **Registro:**
```bash
POST https://obligatorio-fs-five.vercel.app/v1/auth/register
Content-Type: application/json

{
  "username": "usuario123",
  "password": "password123",
  "nombre": "Juan Pérez"
}
```

2. **Login:**
```bash
POST https://obligatorio-fs-five.vercel.app/v1/auth/login
Content-Type: application/json

{
  "username": "usuario123",
  "password": "password123"
}
```

3. **Usar token en otras peticiones:**
```bash
GET https://obligatorio-fs-five.vercel.app/v1/categorias
Authorization: Bearer tu_token_jwt_aqui
```

4. **Consultar productos públicos (sin autenticación):**
```bash
GET https://obligatorio-fs-five.vercel.app/v1/productos/publicos
```

## 🛠️ Desarrollo local

1. Clonar repositorio
2. `npm install`
3. Copiar `.env.example` a `.env` y configurar variables
4. `npm run dev`