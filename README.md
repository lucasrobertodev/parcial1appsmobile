# 📱 Gestor de Tareas - Parcial 1

**Opción elegida:** Gestor de tareas.

## 🚀 Cómo ejecutar la app
1. Abrir la terminal en la raíz del proyecto.
2. Instalar las dependencias ejecutando: `npm install`
3. Levantar el empaquetador ejecutando: `npm start`
4. Para correr la aplicación en el navegador web (modo demostración), presionar la tecla `w` en la terminal.
5. Para compilar e instalar la aplicación de forma nativa en un dispositivo Android conectado por USB, ejecutar: `npx expo run:android` (elegido para el video).

## ✨ Funcionalidades implementadas
* **Navegación (React Navigation):** Sistema estructurado en 4 pantallas obligatorias (Login, Registro, Home y Alta).
* **Autenticación Local:** Creación de cuenta y validación de credenciales en el Login.
* **Almacenamiento (AsyncStorage):** Persistencia de la sesión activa del usuario y de la lista de tareas para que no se pierdan al cerrar la aplicación.
* **Gestión de Tareas:** Posibilidad de agregar nuevos elementos, visualizarlos en una lista y eliminarlos individualmente.
* **Notificaciones Locales:** Disparo de un recordatorio nativo a los 3 segundos de guardar una nueva tarea.
* **Testing:** Suite de pruebas unitarias implementadas con Jest y RNTL para la lógica de negocio y componentes reutilizables (ejecutable con `npm test`).

## 🎥 Video DEMO
https://youtube.com/shorts/VbitL1xV0O4?feature=share

