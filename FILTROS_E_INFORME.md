# 📅 Filtro por Fecha y 📊 Informe de Uso - Documentación

## ✅ Funcionalidades Implementadas

### 1️⃣ **Filtro por Fecha en Productos**

Se ha agregado un parámetro de query `fecha` para filtrar productos por rango temporal.

#### 📍 **Endpoints disponibles:**

**A) Productos Públicos:**
```
GET /v1/productos/publicos?fecha={filtro}
```

**B) Mis Productos (autenticado):**
```
GET /v1/productos?fecha={filtro}
Authorization: Bearer {token}
```

#### 🎯 **Valores del parámetro `fecha`:**

| Valor | Descripción | Rango |
|-------|-------------|-------|
| `semana` | Productos de la última semana | Últimos 7 días |
| `mes` | Productos del último mes | Últimos 30 días |
| `historico` | Todos los productos históricos | Sin límite temporal |
| *(omitir)* | Todos los productos | Sin filtro |

#### 📋 **Ejemplos de uso:**

```bash
# Obtener productos públicos de la última semana
GET http://localhost:3000/v1/productos/publicos?fecha=semana

# Obtener mis productos del último mes
GET http://localhost:3000/v1/productos?fecha=mes
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Obtener todos los productos históricos
GET http://localhost:3000/v1/productos/publicos?fecha=historico
```

#### 📦 **Respuesta exitosa:**

```json
{
  "message": "Productos públicos",
  "filtro": "semana",
  "total": 5,
  "productos": [
    {
      "_id": "673abc123...",
      "nombre": "Laptop Gaming",
      "descripcion": "Alta gama",
      "precio": 1299.99,
      "categoria": {
        "_id": "507f1f77...",
        "nombre": "Electrónica"
      },
      "usuario": {
        "_id": "673def456...",
        "username": "usuario1"
      },
      "createdAt": "2025-11-05T10:30:00.000Z"
    }
    // ... más productos
  ]
}
```

---

### 2️⃣ **Informe de Uso por Plan**

Nuevo endpoint que devuelve estadísticas de uso de la aplicación: cantidad de productos y porcentaje de uso por cada plan.

#### 📍 **Endpoint:**

```
GET /v1/productos/informe-uso
Authorization: Bearer {token}
```

⚠️ **Requiere autenticación**

#### 📦 **Respuesta exitosa:**

```json
{
  "totalProductos": 150,
  "totalUsuarios": 25,
  "informePorPlan": [
    {
      "plan": "plus",
      "cantidadProductos": 45,
      "cantidadUsuarios": 8,
      "porcentajeUso": "30.00%"
    },
    {
      "plan": "premium",
      "cantidadProductos": 105,
      "cantidadUsuarios": 12,
      "porcentajeUso": "70.00%"
    },
    {
      "plan": "sin-plan",
      "cantidadProductos": 0,
      "cantidadUsuarios": 5,
      "porcentajeUso": "0%"
    }
  ]
}
```

#### 🔍 **Descripción de campos:**

| Campo | Descripción |
|-------|-------------|
| `totalProductos` | Cantidad total de productos en la aplicación |
| `totalUsuarios` | Cantidad total de usuarios registrados |
| `plan` | Nombre del plan (plus, premium, sin-plan) |
| `cantidadProductos` | Cantidad de productos creados por usuarios de este plan |
| `cantidadUsuarios` | Cantidad de usuarios que tienen este plan |
| `porcentajeUso` | Porcentaje de productos del total que corresponden a este plan |

#### 📋 **Ejemplo de uso con cURL:**

```bash
curl -X GET http://localhost:3000/v1/productos/informe-uso \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

---

## 🎨 **Implementación en el Frontend**

### **Filtro por Fecha:**

Para implementar el filtro en el frontend, simplemente agrega el parámetro de query:

```javascript
// React/Vue/Angular ejemplo
const filtrarProductos = async (filtroFecha) => {
  const url = filtroFecha 
    ? `/v1/productos/publicos?fecha=${filtroFecha}`
    : '/v1/productos/publicos';
  
  const response = await fetch(url);
  const data = await response.json();
  return data;
};

// Uso:
filtrarProductos('semana');  // Última semana
filtrarProductos('mes');     // Último mes
filtrarProductos('historico'); // Todos
filtrarProductos(null);      // Sin filtro
```

### **Componente de Filtro (React):**

```jsx
function FiltroFecha({ onFiltroChange }) {
  return (
    <select onChange={(e) => onFiltroChange(e.target.value)}>
      <option value="">Todos</option>
      <option value="semana">Última semana</option>
      <option value="mes">Último mes</option>
      <option value="historico">Histórico</option>
    </select>
  );
}
```

### **Informe de Uso:**

```javascript
// Obtener informe de uso
const obtenerInforme = async (token) => {
  const response = await fetch('/v1/productos/informe-uso', {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  const informe = await response.json();
  
  // Renderizar gráfico o tabla con los datos
  console.log(`Total productos: ${informe.totalProductos}`);
  informe.informePorPlan.forEach(item => {
    console.log(`${item.plan}: ${item.cantidadProductos} (${item.porcentajeUso})`);
  });
};
```

---

## ✅ **Ventajas de la Implementación en Backend**

1. ✅ **Rendimiento**: Menos datos transferidos por la red
2. ✅ **Eficiencia**: La base de datos filtra antes de enviar
3. ✅ **Escalabilidad**: Soporta grandes volúmenes de datos
4. ✅ **Consistencia**: La lógica está centralizada
5. ✅ **Cacheable**: Las respuestas pueden cachearse fácilmente
6. ✅ **Indexación**: Se pueden crear índices en la BD para mejorar las consultas

---

## 🧪 **Pruebas en Postman**

La colección actualizada incluye:

### **Carpeta "🏪 Productos Públicos (con filtros)":**
- ✅ Todos los productos públicos
- ✅ Productos públicos - Última semana
- ✅ Productos públicos - Último mes
- ✅ Productos públicos - Histórico

### **Carpeta "📦 Productos Autenticados":**
- ✅ Obtener mis productos - Todos
- ✅ Obtener mis productos - Última semana
- ✅ Obtener mis productos - Último mes
- ✅ Obtener mis productos - Histórico

### **Carpeta "📊 Informe de Uso":**
- ✅ Obtener informe de uso

---

## 📝 **Notas Técnicas**

### **Implementación de Filtros:**

```javascript
// En productos.services.js
const query = { usuario: userId };

if (filtroFecha === 'semana') {
  const haceSemana = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  query.createdAt = { $gte: haceSemana };
} else if (filtroFecha === 'mes') {
  const haceMes = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
  query.createdAt = { $gte: haceMes };
}

const productos = await Producto.find(query).sort({ createdAt: -1 });
```

### **Cálculo de Porcentajes:**

```javascript
// En informe de uso
const porcentaje = totalProductos > 0 
  ? ((cantidadProductos / totalProductos) * 100).toFixed(2) + '%'
  : '0%';
```

---

## 🚀 **Próximas Mejoras Recomendadas**

1. 📅 **Filtros personalizados**: Permitir fechas específicas (`?desde=YYYY-MM-DD&hasta=YYYY-MM-DD`)
2. 📄 **Paginación**: Implementar `limit` y `skip` para grandes volúmenes
3. 📈 **Más métricas**: Precio promedio, categorías más usadas, etc.
4. 🔍 **Filtros combinados**: Por fecha + categoría + precio
5. 💾 **Cache**: Implementar Redis para cachear informes
6. 📊 **Gráficos**: Endpoint para datos específicos de visualización

---

## 📞 **Contacto y Soporte**

Si encuentras algún problema o tienes sugerencias:
- Revisa los logs del servidor
- Verifica que el token JWT sea válido
- Confirma que las fechas de creación existan en la BD
- Revisa la estructura de respuesta en Postman
