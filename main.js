const listaContacto = [];

while (true) {
    const comando = prompt('Ingrese la acción a realizar: Agregar, Eliminar, Buscar o  Salir.');

    switch (comando) {
        case "agregar":

            const nombre = prompt('Ingrese el nombre del contacto:');
            const telefono = prompt('Ingrese el numero de telefono:');

            listaContacto.push({ nombre, telefono });
            alert('Contacto agendado con exito');
            break;

        case "eliminar":

            const eliminarContacto = prompt('Ingrese el nombre del contacto que quiere eliminar:');
            const eliminar = listaContacto.findIndex(contacto => contacto.nombre === eliminarContacto);

            if (eliminar !== -1) {
                listaContacto.splice(eliminar, 1);
                alert('Contacto eliminado con éxito.');
            } else {
                alert('Contacto inexistente.');
            }
            break;

        case "buscar":

            const buscarNombre = prompt('Ingrese el nombre del contacto a buscar:');
            const contactoEncontrado = listaContacto.find(contacto => contacto.nombre === buscarNombre);

            if (contactoEncontrado) {
                alert(`Nombre: ${contactoEncontrado.nombre}, su número de telefono es:${contactoEncontrado.telefono}`);
            } else {
                alert('El contacto no fue encontrado.');
            }
            break;

        case "salir":

            alert('Saliste de la lista de contactos.');
            process.exit(0);
            break;

        default:
            alert('Error. Seleccione comando válido.');
    }
}



