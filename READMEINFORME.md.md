### Tema general del proyecto

Nuestro proyecto corresponde a una aplicación web llamada U-ventas que es capaz de listar, detallar y describir lugares de venta establecidos dentro o alrededor de la universidad, permitiendo a los estudiantes y funcionarios consultar por su rubro, sus distintos artículos de venta -incluyendo su precio-, si son fijos o móviles, ubicación, y puntuación asignada por los usuarios de la plataforma.

Parte de la experiencia consiste en que los clientes del aplicativo pueden dejar reseñas a cada uno de estos locales, permitiendo, posteriormente, filtrar por su puntaje final, zona, rango de precios, entre otros. Vale decir que estos puntos de venta son añadidos a la plataforma por los mismos usuarios, por lo que existe la opción de añadir negocios no conocidos o que, por ejemplo, estén comenzando recientemente a vender alrededor de la universidad.

### Estructura del estado global 

Para el global state tomamos las entidades de usuarios y selling points con sus respectivos slices.

en el caso de usuarios simplementes tenemos como acciones añadir nuevos usuarios y en el caso de selling points podemos añadir uno nuevo y cambiar el tipo de punto (estático o dinámico).

### Mapa de rutas

La aplicación consta de 7 Endpoints principales:

# rutas publicas

"/"
Correspondiente a la homepage de la página donde se muestran los enlaces para ir a cualquiera de los otros 2 endpoints para buscar avisos (hay un tercero para usuario autenticado que quiera subir un aviso) 

"/sellingPointSearch"
Aquí se tiene la opción de poder buscar un aviso en específico a través del filtro de palabras clave o en su defecto mostrar la totalidad de avisos.

"/sellingPointList"
Similar al endpoint anterior se muestran los avisos pero ahora con el filtro corresponde al tipo de punto de venta del aviso (estáticos o dinámicos).

"/map"
Se despliega un mapa de la facultad con punteros en los puntos de venta estáticos y filtros para buscar por zona.
 
# rutas privadas

"/formSellingPoint"
Se despliega un formulario que solicita la información necesaria para que el usuario (ya autenticado) pueda subir un aviso a la página.

"/profile:id"
Se muestra la información del usuario ya logeado

"/editsellingPoint/:id"
Se puede editar un sellingPoint seleccionado creado por uno mismo.

### flujo de autenticación

El usuario tiene la posibilidad de registrarse, logearse o hacer logout (dependiendo del estado actual del usuario) en cualquiera de los endpoints anteriormente mencionados.

Respecto al sistema de autenticación se tiene el siguiente flujo:

Un usuario manda su username y password a través del formulario de login, luego una vez el servidor reciba esta información, este busca a través del nombre usuario la contraseña hasheada de este supuesto usuario en la base de datos. 

Posterior a esto, el servidor compara el hash de la contraseña recién entregada con el hash de password encontrado en la base de datos.

Una vez el servidor verifica que el nombre de usuario existe y que la contraseña coincide, se le entrega al usuario una cookie y un header al usuario que se guarda en localstorage.

Al momento de que el usuario realice el logout se elimina el header del localstorage y la cookie.

### Descripción de los tests E2E.

Para los test E2E solamente se utilizó playwright.

Respecto a los tests se cubren los siguientes flujos:

# registro con éxito
# loggeo con éxito
# subir un aviso exitosamente a través del formulario

### Librería de estilos utilizada y decisiones de diseño.

Para el estilo se utilizó Chakra.

Respecto a algunas desiciones de diseño:

dejamos el registro y login en todos los endpoints públicos para no estar redireccionando y el usuario no se mueva de su lugar actual.

el endpoint del formulario se esconde para alguien que no esté loggeado por un sentido de lógica además de evitar conflictos al momento de crear un selling point y no poder relacionarlo a un usuario.

separamos en 3 endpoints distintos las formas de buscar avisos dado que no queriamos sobre cargar filtros o la forma de poder visualizar los avisos.

### URL del proyecto  

fullstack.dcc.uchile.cl:7007
