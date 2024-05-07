// Clase para representar una materia
class Materia {
    mate_id;
    carre_id; 
    doce_id;
    mate_name; 
    mate_codi;
    mate_anho;
}
// Clase para manejar las materias
class Materias {
    datosMateria = [];
    
    constructor() {
        let data = localStorage.getItem("materias");
        if (!data) {
            this.predata();
        } else {
            this.getdata();
        }
    }

    getMaxId() {
        let idMax = -1;
        this.datosMateria.forEach((materia) => {
            if (materia.mate_id > idMax) {
                idMax = materia.mate_id;
            }
        });
        return idMax;
    }

    predata() {
        // Cargar datosMateria de prueba
        this.datosMateria.push({ mate_id: 1, carre_id: '1', doce_id: '1', mate_name: 'Matemáticas', mate_codi: 'MaT-101', mate_anho: 2022 });
        this.datosMateria.push({ mate_id: 2, carre_id: '2', doce_id: '2', mate_name: 'Historia', mate_codi: 'HIS-201', mate_anho: 2022 });
        this.persistir();
    }

    persistir() {
        localStorage.setItem("materias", JSON.stringify(this.datosMateria));
    }

    getdata() {
        this.datosMateria = JSON.parse(localStorage.getItem("materias"));
    }

    getIndexById(id) {
        for (let i = 0; i < this.datosMateria.length; i++) {
            if (this.datosMateria[i].mate_id === id) {
                return i;
            }
        }
        return -1;
    }

    agregar(materia) {
        materia.mate_id = this.getMaxId() + 1;
        this.datosMateria.push(materia);
        this.persistir(); // Persistir después de agregar
    }

    actualizar(materia) {
        const index = this.getIndexById(materia.mate_id);
        if (index !== -1) {
            this.datosMateria[index] = materia;
            this.persistir(); // Persistir después de actualizar
        }
    }

    borrar(id) {
        const index = this.getIndexById(id);
        if (index !== -1) {
            this.datosMateria.splice(index, 1);
            this.persistir(); // Persistir después de borrar
        }
    }

    obtenerTodos() {
        return this.datosMateria;
    }
}

class Docente {
    doce_id;
    doce_apellido;
    doce_nombre;
    doce_mail;
    doce_cumple;
    doce_cell;
}

class Docentes {
    datos = [];
    
    constructor() {
        let data = localStorage.getItem("docentes");
        if (!data) {
            this.predata();
        } else {
            this.getdata();
        }
    }

    getMaxId() {
        let idMax = -1;
        this.datos.forEach((docente) => {
            if (docente.doce_id > idMax) {
                idMax = docente.doce_id;
            }
        });
        return idMax;
    }

    predata() {
        // Cargar datos de prueba
        this.datos.push({ doce_id: 1, doce_apellido: 'Pérez', doce_nombre: 'María', doce_mail: 'perez@gmail.com', doce_cumple: '1980-05-15', doce_cell: '124' });
        this.datos.push({ doce_id: 2, doce_apellido: 'González', doce_nombre: 'Juan', doce_mail: 'gonzalez@gmail.com', doce_cumple: '1975-10-20', doce_cell: '463456' });
        this.persistir();
    }

    getdata() {
        this.datos = JSON.parse(localStorage.getItem("docentes"));
    }

    persistir() {
        localStorage.setItem("docentes", JSON.stringify(this.datos));
    }

    getIndexById(id) {
        for (let i = 0; i < this.datos.length; i++) {
            if (this.datos[i].doce_id === id) {
                return i;
            }
        }
        return -1;
    }

    agregar(docente) {
        docente.doce_id = this.getMaxId() + 1;
        this.datos.push(docente);
        this.persistir();
    }

    actualizar(docente) {
        const index = this.getIndexById(docente.doce_id);
        if (index !== -1) {
            this.datos[index] = docente;
            this.persistir();
        }
    }

    borrar(id) {
        const index = this.getIndexById(id);
        if (index !== -1) {
            this.datos.splice(index, 1);
            this.persistir();
        }
    }

    obtenerTodos() {
        return this.datos;
    }
}

var materias = new Materias();
var docentes = new Docentes();

// función para limpiar el formulario de materias
function nuevoFormMateria() {
    document.getElementById("mate_id").value = -1; 
    document.getElementById("carre_id").value = "";
    document.getElementById("doce_id").value = ""; 
    document.getElementById("mate_name").value = "";
    document.getElementById("mate_codi").value = "";
    document.getElementById("mate_anho").value = "";
}
// función para cargar los datosMateria de una materia en el formulario para editar
function editarFormMateria(e) {
    let eid = e.target.getAttribute("data-id");
    let idx = materias.getIndexById(parseInt(eid));
    let materia = materias.datosMateria[idx];
    document.getElementById("mate_id").value = materia.mate_id;
    document.getElementById("carre_id").value = materia.carre_id;
    document.getElementById("doce_id").value = materia.doce_id;
    document.getElementById("mate_name").value = materia.mate_name;
    document.getElementById("mate_codi").value = materia.mate_codi;
    document.getElementById("mate_anho").value = materia.mate_anho;
}
// función para borrar una materia
function borrarFormMateria(e) {
    let eid = e.target.getAttribute("data-id");
    materias.borrar(parseInt(eid));
    dibujarTablaMateria();
}
// función para guardar o actualizar una materia
function guardarFormMateria() {
    var materia = new Materia();

    materia.mate_id = parseInt(document.getElementById("mate_id").value);
    materia.carre_id = document.getElementById("carre_id").value;
    materia.doce_id = document.getElementById("doce_id").value; 
    materia.mate_name = document.getElementById("mate_name").value;
    materia.mate_codi = document.getElementById("mate_codi").value;
    materia.mate_anho = document.getElementById("mate_anho").value;

    if (materia.mate_id === -1) {
        materias.agregar(materia);
    } else {
        materias.actualizar(materia);
    }

    dibujarTablaMateria();
    nuevoFormMateria();
}
// función para cancelar la operación de materias
function cancelarFormMateria() {
    nuevoFormMateria();
}
// función para dibujar la tabla de materias
function dibujarTablaMateria() {
    let tabla = "<table class='table'><thead><tr><th>Nombre</th><th>Código</th><th>Año</th><th>Docente</th><th>Carrera</th><th colspan='2'><button id='btnuevoMaTE' class='btn btn-primary'>Nuevo</button></th></tr></thead><tbody>";

    materias.obtenerTodos().forEach((materia) => {
        tabla += "<tr><td>" + materia.mate_name + "</td><td>" + materia.mate_codi + "</td><td>" + materia.mate_anho + "</td><td>" + materia.doce_id + "</td><td>" + materia.carre_id + "</td><td><button class='bteditarMaTE btn btn-warning' data-id='" + materia.mate_id + "'>Editar</button></td><td><button class='btborrarMaTE btn btn-danger' data-id='" + materia.mate_id + "'>Borrar</button></td></tr>";
    });

    tabla += "</tbody></table>";

    document.getElementById("tablaMateria").innerHTML = tabla;

    asignarEventosMateria();
}
// función para asignar eventos a los botones de materias
function asignarEventosMateria() {
    document.getElementById("btnuevoMaTE").addEventListener("click", nuevoFormMateria);
    
    var btseditar = document.getElementsByClassName("bteditarMaTE");
    for (let i = 0; i < btseditar.length; i++) {
        btseditar[i].addEventListener("click", editarFormMateria);
    }

    var btsborrar = document.getElementsByClassName("btborrarMaTE");
    for (let i = 0; i < btsborrar.length; i++) {
        btsborrar[i].addEventListener("click", borrarFormMateria);
    }
}
// función para cargar la tabla de materias al cargar la página
function cargarMateria() {
    dibujarTablaMateria();
}

document.addEventListener("DOMContentLoaded", cargarMateria);

document.getElementById("btnGuardarMateria").addEventListener("click", guardarFormMateria);

document.getElementById("btnCancelarMateria").addEventListener("click", cancelarFormMateria);
//hasta aca llega materias.

//parte de docentes

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

// Asignar evento al botón de cancelar
document.getElementById("btnCancelarDocente").addEventListener("click", cancelarForm);
