// Clase para representar una materia
class Materia {
    constructor() {
        this.mate_id = -1;
        this.carre_id = "";
        this.doce_id = "";
        this.mate_name = "";
        this.mate_codi = "";
        this.mate_anho = "";
    }
}

// Clase para manejar las materias
class Materias {
    datos = [];
    
    constructor() {
        let data = localStorage.getItem("materias");
        if (!data) {
            this.predata();
        } else {
            this.getdata();
        }
        this.persistir();
    }

    getMaxId() {
        let idMax = -1;
        this.datos.forEach((materia) => {
            if (materia.mate_id > idMax) {
                idMax = materia.mate_id;
            }
        });
        return idMax;
    }

    predata() {
        // Cargar datos de prueba
        this.datos.push({ mate_id: 1, carre_id: '1', doce_id: '1', mate_name: 'Matemáticas', mate_codi: 'MAT-101', mate_anho: 2022 });
        this.datos.push({ mate_id: 2, carre_id: '2', doce_id: '2', mate_name: 'Historia', mate_codi: 'HIS-201', mate_anho: 2022 });
    }

    getdata() {
        this.datos = JSON.parse(localStorage.getItem("materias"));
    }

    persistir() {
        localStorage.setItem("materias", JSON.stringify(this.datos));
    }

    getIndexById(id) {
        for (let i = 0; i < this.datos.length; i++) {
            if (this.datos[i].mate_id === id) {
                return i;
            }
        }
        return -1;
    }

    agregar(materia) {
        materia.mate_id = this.getMaxId() + 1;
        this.datos.push(materia);
        this.persistir();
    }

    actualizar(materia) {
        const index = this.getIndexById(materia.mate_id);
        if (index !== -1) {
            this.datos[index] = materia;
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

console.log("app materia");

var materias = new Materias();

// funcion para limpiar el formulario de materias
function nuevoFormMateria() {
    document.getElementById("mate_name").value = "";
    document.getElementById("mate_codi").value = "";
    document.getElementById("mate_anho").value = "";
}

// funcion para cargar los datos de una materia en el formulario para editar
function editarFormMateria(e) {
    let eid = e.target.getAttribute("data-id");
    let idx = materias.getIndexById(parseInt(eid));
    let materia = materias.datos[idx];
    document.getElementById("mate_id").value = materia.mate_id;
    document.getElementById("carre_id").value = materia.carre_id;
    document.getElementById("doce_id").value = materia.doce_id;
    document.getElementById("mate_name").value = materia.mate_name;
    document.getElementById("mate_codi").value = materia.mate_codi;
    document.getElementById("mate_anho").value = materia.mate_anho;
}

// funcion para borrar una materia
function borrarFormMateria(e) {
    let eid = e.target.getAttribute("data-id");
    materias.borrar(parseInt(eid));
    dibujarTablaMateria();
}

// funcion para guardar o actualizar una materia
//al guardar explota aca ;c
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
}

// funcion para cancelar la operación de materias
function cancelarFormMateria() {
    nuevoFormMateria();
}

// funcion para dibujar la tabla de materias
function dibujarTablaMateria() {
    let tabla = "<table class='table'><thead><tr><th>Nombre</th><th>Código</th><th>Año</th><th>Docente</th><th>Carrera</th><th colspan='2'><button id='btnuevoMATE' class='btn btn-primary'>Nuevo</button></th></tr></thead><tbody>";

    materias.obtenerTodos().forEach((materia) => {
        tabla += "<tr><td>" + materia.mate_name + "</td><td>" + materia.mate_codi + "</td><td>" + materia.mate_anho + "</td><td>" + materia.doce_id + "</td><td>" + materia.carre_id + "</td><td><button class='bteditarMATE btn btn-warning' data-id='" + materia.mate_id + "'>Editar</button></td><td><button class='btborrarMATE btn btn-danger' data-id='" + materia.mate_id + "'>Borrar</button></td></tr>";
    });

    tabla += "</tbody></table>";

    document.getElementById("tablaMateria").innerHTML = tabla;

    asignarEventosMateria();
}

// funcion para asignar eventos a los botones de materias
function asignarEventosMateria() {
    document.getElementById("btnuevoMATE").addEventListener("click", nuevoFormMateria);
    
    var btseditar = document.getElementsByClassName("bteditarMATE");
    for (let i = 0; i < btseditar.length; i++) {
        btseditar[i].addEventListener("click", editarFormMateria);
    }

    var btsborrar = document.getElementsByClassName("btborrarMATE");
    for (let i = 0; i < btsborrar.length; i++) {
        btsborrar[i].addEventListener("click", borrarFormMateria);
    }
}

// funcion para cargar la tabla de materias al cargar la página
function cargarMateria() {
    dibujarTablaMateria();
}

document.addEventListener("DOMContentLoaded", cargarMateria);

document.getElementById("btnGuardarMateria").addEventListener("click", guardarFormMateria);

document.getElementById("btnCancelarMateria").addEventListener("click", cancelarFormMateria);
