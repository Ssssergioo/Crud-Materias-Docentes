// Crear una instancia del gestor de docentes
// class Docente {
//     doce_id;
//     doce_apellido;
//     doce_nombre;
//     doce_mail;
//     doce_cumple;
//     doce_cell;
// }

// class Docentes {
//     datos = [];
    
//     constructor() {
//         let data = localStorage.getItem("docentes");
//         if (!data) {
//             this.predata();
//         } else {
//             this.getdata();
//         }
//         this.persistir();
//     }

//     getMaxId() {
//         let idMax = -1;
//         this.datos.forEach((docente) => {
//             if (docente.doce_id > idMax) {
//                 idMax = docente.doce_id;
//             }
//         });
//         return idMax;
//     }

//     predata() {
//         // Cargar datos de prueba

//         this.datos.push({ doce_id: 1, doce_apellido: 'Pérez', doce_nombre: 'María', doce_mail: 'perez@gmail.com', doce_cumple: '1980-05-15', doce_cell: '124' });
//         this.datos.push({ doce_id: 2, doce_apellido: 'González', doce_nombre: 'Juan', doce_mail: 'gonzalez@gmail.com', doce_cumple: '1975-10-20', doce_cell: '463456' });
//     }
//     //para obtener lo de la memoria local
//     getdata() {
//         this.datos = JSON.parse(localStorage.getItem("docentes"));
//     }
//     //persitir en la memoria local
//     persistir() {
//         localStorage.setItem("docentes", JSON.stringify(this.datos));
//     }
//     //obtener el indec por el id
//     getIndexById(id) {
//         for (let i = 0; i < this.datos.length; i++) {
//             if (this.datos[i].doce_id === id) {
//                 return i;
//             }
//         }
//         return -1;
//     }
//     //agregar al docente
//     agregar(docente) {
//         docente.doce_id = this.getMaxId() + 1;
//         this.datos.push(docente);
//         this.persistir();
//     }
//     // actualizar la lista
//     actualizar(docente) {
//         const index = this.getIndexById(docente.doce_id);
//         if (index !== -1) {
//             this.datos[index] = docente;
//             this.persistir();
//         }
//     }
//     //borrar por id
//     borrar(id) {
//         const index = this.getIndexById(id);
//         if (index !== -1) {
//             this.datos.splice(index, 1);
//             this.persistir();
//         }
//     }

//     obtenerTodos() {
//         return this.datos;
//     }
// }

var docentes = new Docentes();

// Función para limpiar el formulario
function nuevoForm() {
    document.getElementById("doce_id").value = -1;
    document.getElementById("doce_apellido").value = "";
    document.getElementById("doce_nombre").value = "";
    document.getElementById("doce_mail").value = "";
    document.getElementById("doce_cumple").value = "";
    document.getElementById("doce_cell").value = "";
}

// Función para cargar los datos de un docente en el formulario para editar
function editarForm(e) {
    let eid = e.target.getAttribute("data-id");
    let idx = docentes.getIndexById(parseInt(eid));
    let docente = docentes.datos[idx];
    document.getElementById("doce_id").value = docente.doce_id;
    document.getElementById("doce_apellido").value = docente.doce_apellido;
    document.getElementById("doce_nombre").value = docente.doce_nombre;
    document.getElementById("doce_mail").value = docente.doce_mail;
    document.getElementById("doce_cumple").value = docente.doce_cumple;
    document.getElementById("doce_cell").value = docente.doce_cell;
}

// Función para borrar un docente
function borrarForm(e) {
    let eid = e.target.getAttribute("data-id");
    docentes.borrar(parseInt(eid));
    dibujarTabla();
}

// Función para guardar o actualizar un docente

function guardarForm() {
    var docente = new Docente();

    docente.doce_id = parseInt(document.getElementById("doce_id").value);
    docente.doce_apellido = document.getElementById("doce_apellido").value;
    docente.doce_nombre = document.getElementById("doce_nombre").value;
    docente.doce_mail = document.getElementById("doce_mail").value;
    docente.doce_cumple = document.getElementById("doce_cumple").value;
    docente.doce_cell = document.getElementById("doce_cell").value;

    if (docente.doce_id === -1) {
        docentes.agregar(docente);
    } else {
        docentes.actualizar(docente);
    }

    dibujarTabla();
}

// Función para cancelar la operación
function cancelarForm() {
    nuevoForm();
}

// Función para dibujar la tabla de docentes
function dibujarTabla() {
    let tabla = "<table class='table'><thead><tr><th scope='col'>Apellido</th><th scope='col'>Nombre</th><th scope='col'>Correo</th><th scope='col'>Fecha de Nacimiento</th><th scope='col'>Teléfono</th><th colspan='2'><button id='btnuevo' class='btn btn-primary'>Nuevo</button></th></tr></thead><tbody>";

    docentes.obtenerTodos().forEach((docente) => {
        tabla += "<tr><td>" + docente.doce_apellido + "</td><td>" + docente.doce_nombre + "</td><td>" + docente.doce_mail + "</td><td>" + docente.doce_cumple + "</td><td>" + docente.doce_cell + "</td><td><button class='bteditar btn btn-warning' data-id='" + docente.doce_id + "'>Editar</button></td><td><button class='btborrar btn btn-danger' data-id='" + docente.doce_id + "'>Borrar</button></td></tr>";
    });

    tabla += "</tbody></table>";

    document.getElementById("tablaDocente").innerHTML = tabla;

    asignarEventos();
}

// Función para asignar eventos a los botones
function asignarEventos() {
    document.getElementById("btnuevo").addEventListener("click", nuevoForm);
    
    var btseditar = document.getElementsByClassName("bteditar");
    for (let i = 0; i < btseditar.length; i++) {
        btseditar[i].addEventListener("click", editarForm);
    }

    var btsborrar = document.getElementsByClassName("btborrar");
    for (let i = 0; i < btsborrar.length; i++) {
        btsborrar[i].addEventListener("click", borrarForm);
    }
}

// Función para cargar la tabla al cargar la página
function cargar() {
    dibujarTabla();
}

// Asignar eventos al cargar la página
document.addEventListener("DOMContentLoaded", cargar);

// Asignar evento al botón de guardar
document.getElementById("btnGuardarDocente").addEventListener("click", guardarForm);
document.getElementById("btnGuardarDocente").addEventListener("click", nuevoForm);

// Asignar evento al botón de cancelar
document.getElementById("btnCancelarDocente").addEventListener("click", cancelarForm);


