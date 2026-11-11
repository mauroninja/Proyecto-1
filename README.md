# Proyecto Docker – Entrega 1

**Módulo:** Énfasis Profesional I (Integración Continua) – Politécnico Grancolombiano
**Entrega:** 1 (Semana 3) – Construcción de dos contenedores Docker comunicados entre sí

## Descripción

Este proyecto usa **Docker** para construir dos contenedores que se comunican entre sí:

| Contenedor | Imagen base | Función | Puerto |
|---|---|---|---|
| `app` | `node:20-alpine` | API sencilla hecha con Node.js y Express | 3000 (solo dentro de la red de Docker) |
| `nginx` | `nginx:alpine` | Proxy inverso que recibe las peticiones y se las reenvía a `app` | 8080 (en tu PC) → 80 |

Los dos contenedores están en la misma red de Docker (`red-proyecto`). Por eso nginx encuentra a la app por su nombre de servicio: `http://app:3000`.

## Arquitectura

```
 Navegador / cliente
        │  http://localhost:8080
        ▼
┌──────────────────┐   red-proyecto   ┌──────────────────┐
│  Contenedor      │ ───────────────► │  Contenedor      │
│  nginx (:80)     │  http://app:3000 │  app Node (:3000)│
└──────────────────┘                  └──────────────────┘
```

## Estructura del proyecto

```
proyecto-docker-entrega1/
├── app.js               # Aplicación Node.js (Express)
├── package.json         # Dependencias y script de inicio
├── Dockerfile           # Imagen del contenedor de la app
├── nginx.conf           # Configuración de nginx como proxy inverso
├── Dockerfile.nginx     # Imagen del contenedor nginx
├── docker-compose.yml   # Levanta los dos contenedores y la red
├── .dockerignore
└── README.md
```

## Requisitos

- [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y abierto
- [Git](https://git-scm.com/downloads) instalado
- Una cuenta en [GitHub](https://github.com)

## Cómo ejecutar el proyecto

1. Clona el repositorio y entra a la carpeta:
   ```bash
   git clone https://github.com/TU_USUARIO/proyecto-docker-entrega1.git
   cd proyecto-docker-entrega1
   ```
2. Construye y levanta los contenedores:
   ```bash
   docker compose up --build
   ```
3. Abre en el navegador: **http://localhost:8080**

Deberías ver una respuesta como esta:
```json
{
  "mensaje": "Hola desde el contenedor de la aplicación Node.js",
  "contenedor": "a1b2c3d4e5f6",
  "fecha": "2026-11-11T20:13:52.568Z"
}
```

Para detener los contenedores, presiona `Ctrl + C`, o ejecuta:
```bash
docker compose down
```

## Verificar la comunicación entre contenedores

| Prueba | Comando | Resultado esperado |
|---|---|---|
| Contenedores corriendo | `docker ps` | Aparecen `app` y `nginx` |
| Red compartida | `docker network ls` | Aparece la red `..._red-proyecto` |
| nginx → app directo | `docker exec nginx wget -qO- http://app:3000/health` | `{"estado":"ok"}` |
| Desde el navegador | http://localhost:8080/health | `{"estado":"ok"}` |

## Endpoints

| Ruta | Descripción |
|---|---|
| `GET /` | Mensaje de saludo, nombre del contenedor y fecha |
| `GET /health` | Estado de la aplicación |

---

## Cómo subir el proyecto a GitHub

### 1. Crear el repositorio en GitHub
1. Entra a https://github.com e inicia sesión.
2. Haz clic en **New** (o en el botón **+** → **New repository**).
3. En **Repository name** escribe: `proyecto-docker-entrega1`.
4. Déjalo como **Public**, para que el docente pueda verlo.
5. **No** marques "Add a README file", porque el proyecto ya tiene uno.
6. Haz clic en **Create repository**.

### 2. Configurar Git (solo la primera vez)
```bash
git config --global user.name "Tu Nombre"
git config --global user.email "tu_correo@ejemplo.com"
```

### 3. Subir los archivos
Abre una terminal (PowerShell o Git Bash) dentro de la carpeta del proyecto:
```bash
cd C:\Users\TU_USUARIO\Documents\proyecto-docker-entrega1

git init
git add .
git commit -m "Entrega 1: contenedores Node.js y Nginx comunicados con Docker"
git branch -M main
git remote add origin https://github.com/TU_USUARIO/proyecto-docker-entrega1.git
git push -u origin main
```
> Cambia `TU_USUARIO` por tu usuario de GitHub. La primera vez que hagas `git push`, Windows abrirá una ventana para iniciar sesión en GitHub.

### 4. Subir cambios después
```bash
git add .
git commit -m "Descripción del cambio"
git push
```

### 5. Agregar a los compañeros del grupo
En el repositorio, ve a **Settings** → **Collaborators** → **Add people** y escribe el usuario de GitHub de cada integrante.

---

## Integrantes

| Nombre | Rol |
|---|---|
| Nombre Andres Mauricio Torres | Programador |
