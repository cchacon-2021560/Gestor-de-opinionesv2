Guía para probar mi proyecto: Gestor de Opiniones

Hola. En este documento se encuentran las instrucciones para probar mi proyecto. Configuré todo para que cada acción importante necesite un token de seguridad, así me aseguro de que nadie pueda modificar o borrar algo que no le pertenece.

1. Autenticación (Cómo entrar al sistema)
El proceso tiene tres pasos sencillos para asegurar que el usuario sea real:

Registro: Primero, creo mi usuario en el request de REGISTRO. Debo completar mi nombre, apellido, correo y una contraseña.

Verificación: Reviso mi correo y copio el código que me llegó. Luego, voy al request de VERIFICACIÓN y pego ese código al final de la URL para activar mi cuenta.

Login: Ahora ya puedo iniciar sesión con mi usuario y contraseña. Si todo está bien, el sistema me dará un token especial. Este token dura 10 minutos y es mi "llave" para hacer todo lo demás.

2. Publicaciones
Para que el sistema sepa quién está publicando, debo usar el token:

Crear: Copio mi token y lo pego en la pestaña Headers de Postman, donde dice x-token. Lleno los datos de mi publicación y, al enviarla, el sistema me responderá con el ID de la publicación (lo voy a necesitar para editar o borrar).

Editar: Pongo el ID de la publicación en la URL y aseguro que mi token esté en los Headers. Si intento editar un post que yo no hice, el sistema me dará un error. Debo volver a escribir la información actualizada en el cuerpo de la petición.

Eliminar: Igual que al editar, necesito el ID en la URL y mi token en los Headers. Solo yo puedo borrar mis propios posts.

3. Comentarios
Los comentarios funcionan de forma muy parecida a las publicaciones:

Crear: Pongo mi token en el encabezado x-token, escribo mi comentario y lo envío. Recibiré el ID del comentario como respuesta.

Editar y Eliminar: Necesito poner el ID del comentario en la URL. Solo el autor del comentario puede hacer estos cambios; si otra persona intenta borrarlos usando su propio token, el sistema lo impedirá por seguridad.

4. Usuarios y Actividad
Historial de actividad: Si quiero ver qué ha hecho un usuario, pongo su ID en la URL y uso mi token en los Headers. El sistema me mostrará una lista de todos los comentarios y publicaciones que esa persona ha realizado.

Editar y Borrar mi cuenta: Por protección, solo yo puedo modificar mi perfil. El ID que ponga en la URL debe coincidir exactamente con el dueño del token que estoy usando.

Ver a todos: Tengo una ruta para listar a todos los usuarios que están activos en la plataforma. Solo necesito estar logueado (tener un token válido) para ver esta lista.

5. ¿Por qué pido token para todo?
Decidí pedir el token en cada proceso por dos razones:

Identidad: Para que el servidor siempre sepa exactamente quién está haciendo cada cosa.

Seguridad: Para evitar que cualquier usuario pueda borrar o cambiar opiniones o datos que no son suyos. Así cada quien es responsable de su propio contenido.