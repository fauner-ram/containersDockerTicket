# Instrucciones para compartir y levantar el proyecto con Docker

## 1. Importar las imágenes Docker

Recibe los archivos `frontend.tar` y `backend.tar` de tu compañero.

Ejecuta en PowerShell (en la raíz del proyecto):

```
docker load -i frontend.tar
docker load -i backend.tar
```

## 2. Levantar los servicios

Asegúrate de tener Docker Desktop instalado y abierto.

En la raíz del proyecto, ejecuta:

```
docker-compose up
```

Esto levantará tanto el frontend (Angular) como el backend (Node.js) usando las imágenes importadas.

- El frontend estará disponible en: http://localhost:4200
- El backend estará disponible en: http://localhost:8080/ticketback

> **Nota:** No es necesario eliminar imágenes, módulos o volúmenes cada vez que ejecutes `docker-compose up`. Solo hazlo si tienes errores de dependencias, cambiaste dependencias en `package.json`, o necesitas liberar espacio.
>
> **Importante:** Si solo cambias datos en el archivo `.env` del backend (por ejemplo, contraseña, servidor SQL, puerto, etc.), NO necesitas reconstruir ni limpiar imágenes. Solo guarda el archivo y reinicia el servicio backend con:
>
> ```
> docker-compose restart backend
> ```
>
> O puedes bajar y subir los servicios con:
>
> ```
> docker-compose down
> docker-compose up
> ```

## 3. (Opcional) Detener y limpiar los servicios

Para detener los servicios y limpiar volúmenes temporales:

```
docker-compose down --volumes
```

---

Si necesitas reconstruir las imágenes (por cambios en el código), usa:

```
docker-compose build
```

Luego vuelve a levantar los servicios con:

```
docker-compose up
```

---

Cualquier duda, consulta este README o pregunta al responsable del proyecto.
