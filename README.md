
# Cocos Challenge React Native

Este proyecto es una aplicación desarrollada en React Native que interactúa con diversos endpoints para visualizar información de instrumentos, portafolio, búsqueda de activos y órdenes.

## Instrucciones para levantar el proyecto

1. Instalar dependencias:
   ```bash
   yarn install
   ```

2. Ejecutar la aplicación:
   ```bash
   npx react-native run-ios
   ```

## Decisiones Técnicas

- **Estructura del proyecto**: Se diseñó para facilitar el mantenimiento y escalabilidad.
- **Gestión de estado**: Se utilizó Context API para manejar el estado global de la aplicación.
- **Testing**: Se incluyeron pruebas unitarias usando Jest y Testing Library.

### Endpoints utilizados
- **GET /instruments**: Listado de instrumentos.
- **GET /portfolio**: Listado del portafolio.
- **GET /search**: Búsqueda de activos por ticker.
- **POST /orders**: Creación de órdenes.

## Consideraciones adicionales
- El diseño está inspirado en aplicaciones como Coinbase y Robinhood.
- Se implementó manejo de errores robusto y validación en formularios.

---

¡Gracias por probar esta aplicación!
Nahuel Robles