# 📊 Informe de Uso - Documentación Actualizada

## 🎯 **Endpoint**

```
GET /v1/productos/informe-uso
```

**Autenticación:** ✅ Requiere token JWT

**Headers:**
```
Authorization: Bearer {token}
```

---

## 📋 **Descripción**

Devuelve información de uso personalizada del usuario autenticado según su plan:

- **Plan PLUS**: Muestra cantidad, límite (10), productos restantes y porcentaje de uso
- **Plan PREMIUM**: Muestra cantidad de productos creados (sin límite, sin porcentaje)

---

## 📊 **Respuestas**

### **Usuario con Plan PLUS**

```json
{
  "usuario": "usuario1",
  "plan": "plus",
  "cantidadProductos": 7,
  "limiteProductos": 10,
  "productosRestantes": 3,
  "porcentajeUso": "70.00%"
}
```

**Campos:**
- `usuario`: Username del usuario autenticado
- `plan`: Tipo de plan ("plus")
- `cantidadProductos`: Cantidad de productos creados
- `limiteProductos`: Límite máximo (siempre 10 para plus)
- `productosRestantes`: Productos que aún puede crear
- `porcentajeUso`: Porcentaje de uso del límite

---

### **Usuario con Plan PREMIUM**

```json
{
  "usuario": "usuario2",
  "plan": "premium",
  "cantidadProductos": 25,
  "mensaje": "Plan premium: productos ilimitados"
}
```

**Campos:**
- `usuario`: Username del usuario autenticado
- `plan`: Tipo de plan ("premium")
- `cantidadProductos`: Cantidad de productos creados
- `mensaje`: Indicador de productos ilimitados

**Nota:** No incluye porcentaje porque el plan premium no tiene límite.

---

## 🧪 **Ejemplos de Uso**

### **Con cURL:**

```bash
# Obtener token primero
curl -X POST http://localhost:3000/v1/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"usuario1","password":"123456"}'

# Usar el token para obtener informe
curl -X GET http://localhost:3000/v1/productos/informe-uso \
  -H "Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
```

### **Con JavaScript/Fetch:**

```javascript
const obtenerInformeUso = async (token) => {
  const response = await fetch('/v1/productos/informe-uso', {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  });
  
  const informe = await response.json();
  
  if (informe.plan === 'plus') {
    console.log(`Uso: ${informe.porcentajeUso}`);
    console.log(`Restantes: ${informe.productosRestantes}`);
  } else if (informe.plan === 'premium') {
    console.log(informe.mensaje);
    console.log(`Total creados: ${informe.cantidadProductos}`);
  }
  
  return informe;
};
```

### **Con React:**

```jsx
function InformeUsoComponent({ token }) {
  const [informe, setInforme] = useState(null);

  useEffect(() => {
    fetch('/v1/productos/informe-uso', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(res => res.json())
    .then(data => setInforme(data));
  }, [token]);

  if (!informe) return <Spinner />;

  return (
    <div className="informe-uso">
      <h3>Informe de Uso - {informe.usuario}</h3>
      <p>Plan: {informe.plan.toUpperCase()}</p>
      <p>Productos creados: {informe.cantidadProductos}</p>
      
      {informe.plan === 'plus' && (
        <>
          <div className="progress-bar">
            <div style={{ width: informe.porcentajeUso }}>
              {informe.porcentajeUso}
            </div>
          </div>
          <p>Productos restantes: {informe.productosRestantes}</p>
        </>
      )}
      
      {informe.plan === 'premium' && (
        <p className="unlimited">✨ {informe.mensaje}</p>
      )}
    </div>
  );
}
```

---

## 🎨 **Ejemplo de UI Sugerido**

### **Para Plan PLUS:**

```
┌─────────────────────────────────────┐
│  📊 Informe de Uso                  │
├─────────────────────────────────────┤
│  Usuario: usuario1                  │
│  Plan: PLUS                         │
│                                     │
│  Productos creados: 7/10            │
│  ████████████░░░░░░░░ 70%          │
│                                     │
│  📦 Productos restantes: 3          │
└─────────────────────────────────────┘
```

### **Para Plan PREMIUM:**

```
┌─────────────────────────────────────┐
│  📊 Informe de Uso                  │
├─────────────────────────────────────┤
│  Usuario: usuario2                  │
│  Plan: PREMIUM ✨                   │
│                                     │
│  Productos creados: 25              │
│  ∞ Productos ilimitados             │
└─────────────────────────────────────┘
```

---

## 🔒 **Errores Posibles**

### **401 - No autorizado**
```json
{
  "error": "No autorizado. Falta token."
}
```
**Solución:** Incluir header `Authorization: Bearer {token}`

### **403 - Token no válido**
```json
{
  "error": "Token no válido."
}
```
**Solución:** Hacer login nuevamente para obtener un token válido

### **404 - Usuario no encontrado**
```json
{
  "error": "Usuario no encontrado"
}
```
**Solución:** Verificar que el usuario existe en la base de datos

---

## 📝 **Notas Técnicas**

### **Cálculo del Porcentaje (Plan PLUS):**

```javascript
const porcentajeUso = (cantidadProductos / 10) * 100;
// Ejemplo: (7 / 10) * 100 = 70%
```

### **Productos Restantes (Plan PLUS):**

```javascript
const productosRestantes = Math.max(0, 10 - cantidadProductos);
// Ejemplo: max(0, 10 - 7) = 3
```

### **Validación en el Backend:**

El servicio obtiene:
1. Usuario autenticado desde el token JWT
2. Su plan asociado mediante `.populate('plan')`
3. Cuenta de productos con `Producto.countDocuments()`
4. Construye respuesta según el tipo de plan

---

## 🚀 **Testing en Postman**

### **Request:**
```
GET http://localhost:3000/v1/productos/informe-uso
Authorization: Bearer {{authToken}}
```

### **Tests Sugeridos:**

```javascript
// Test para verificar respuesta exitosa
pm.test("Status code is 200", function () {
    pm.response.to.have.status(200);
});

// Test para usuario PLUS
pm.test("Plan PLUS tiene porcentaje", function () {
    var jsonData = pm.response.json();
    if (jsonData.plan === 'plus') {
        pm.expect(jsonData).to.have.property('porcentajeUso');
        pm.expect(jsonData).to.have.property('limiteProductos');
        pm.expect(jsonData.limiteProductos).to.equal(10);
    }
});

// Test para usuario PREMIUM
pm.test("Plan PREMIUM no tiene porcentaje", function () {
    var jsonData = pm.response.json();
    if (jsonData.plan === 'premium') {
        pm.expect(jsonData).to.not.have.property('porcentajeUso');
        pm.expect(jsonData).to.have.property('mensaje');
    }
});
```

---

## ✅ **Checklist de Implementación**

- ✅ Endpoint creado: `GET /v1/productos/informe-uso`
- ✅ Requiere autenticación JWT
- ✅ Plan PLUS: muestra porcentaje y límite
- ✅ Plan PREMIUM: muestra solo cantidad
- ✅ Manejo de errores implementado
- ✅ Documentación completa
- ⬜ Frontend implementado (pendiente)
- ⬜ Tests E2E (pendiente)

---

## 🎯 **Cumplimiento del Requisito 4.3.1**

✅ **Porcentaje o cantidad**: 
- Usuario PLUS → Porcentaje de uso (7/10 = 70%)
- Usuario PREMIUM → Cantidad de productos (sin porcentaje)

✅ **Componente aparte**: Endpoint dedicado `/informe-uso`

✅ **Usuarios plus y premium**: Lógica diferenciada por plan

---

**¡Implementación completa y lista para usar! 🎉**
