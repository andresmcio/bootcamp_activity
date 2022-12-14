Una vez iniciados los contenedores de la base de datos, para cargar documentos a la misma, se debe apuntar por get a /load (ejemplo: //localhost:12345/load). Esto traerá de la api de Rick and Morty los personajes, pero creará un objeto solo con ciertos campos.

{
    id: identificador del personaje según la api,
    name: nombre,
    status: Estado  (vivo, muerto o desconocido  ),
    image: url de la imágen ,
    url: url del personaje 
}

Luego al hacer un get a la raíz (//localhost:12345/) se traerá por consola todos los personajes almacenados en la base de datos rick_and_morty de la colección 'characters'.

Para buscar personajes por su nombre se apunta por get a //localhost:12345/query/?name={nombre del personaje}y traerá por consola los que cumplan con el query.

Solo se contempla la modificación del estado del personaje, para ello se apunta por put a //localhost:12345/query/?id={id del personaje a borrarr, entre 1 y 826}&status={Cuslquier texto}

Para borrar un personaje se apunta por delete a //localhost:12345/query/?id={id entre 1 y 826}