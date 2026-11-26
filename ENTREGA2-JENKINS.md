# Entrega 2 - Jenkins

## 1. Levantar Jenkins
```bash
docker compose -f docker-compose.jenkins.yml up -d --build
```
Abrir http://localhost:8081

Clave inicial de administrador:
```bash
docker exec jenkins cat /var/jenkins_home/secrets/initialAdminPassword
```
En el asistente elegir **Install suggested plugins** (los plugins adicionales ya vienen en la imagen) y crear el usuario administrador.

## 2. Crear el pipeline
1. **Nueva Tarea** -> nombre `proyecto1-ci` -> tipo **Pipeline**.
2. En **Pipeline** elegir **Pipeline script from SCM**.
3. SCM: **Git**, URL `https://github.com/mauroninja/Proyecto-1.git`, rama `*/main`.
4. Script Path: `Jenkinsfile`.
5. Guardar y pulsar **Construir ahora**.

## 3. Disparo automatico (opcional)
- Con webhook: en GitHub -> Settings -> Webhooks, apuntar a `http://<url-publica>/github-webhook/` (requiere URL publica, por ejemplo con un tunel).
- Sin URL publica: en la tarea activar **Consultar repositorio (Poll SCM)** con `H/5 * * * *`.

## 4. Evidencias para el documento
Guardar capturas en `docs/evidencias/`:
- Pantalla de Jenkins con el pipeline en verde.
- Salida de **Console Output** mostrando "Comunicacion nginx -> app OK".
- Lista de plugins instalados.

## 5. Problemas frecuentes
| Sintoma | Solucion |
|---|---|
| `docker: command not found` en el pipeline | Reconstruir la imagen: `docker compose -f docker-compose.jenkins.yml up -d --build` |
| `permission denied` en `/var/run/docker.sock` | Verificar que el servicio tenga `user: root` |
| `port is already allocated` | Jenkins usa 8081; nginx usa 8080. Cerrar otros procesos en esos puertos |
| El pipeline falla en "Verificar comunicacion" | Revisar `compose-logs.txt` en los artefactos de la ejecucion |
