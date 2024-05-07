class Materiaa {
    mate_id;
    carre_id; 
    doce_id;
    mate_name; 
    mate_codi;
    mate_anho;
}
// Clase para representar una materia
class Materia {
    constructor() {
        this.mate_id = -1;
        this.carre_id = "";
        this.doce_id = ""; // Este campo no está en el constructor original, verifica si debería estar aquí
        this.mate_name = "";
        this.mate_codi = "";
        this.mate_anho = "";
    }
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
        // No necesitas persistir aquí
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

var materias = new Materias();

// función para limpiar el formulario de materias
function nuevoFormMateria() {
    document.getElementById("mate_id").value = -1; // También puedes establecer el valor del ID en -1 aquí
    document.getElementById("carre_id").value = "";
    document.getElementById("doce_id").value = ""; // asegúrate de que esto es lo que quieres hacer
    document.getElementById("mate_name").value = "";
    document.getElementById("mate_codi").value = "";
    document.getElementById("mate_anho").value = "";
}

// función para cargar los datosMateria de una materia en el formulario para editar
function editarFormMateria(e) {
    let eid = e.target.getattribute("data-id");
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
    let eid = e.target.getattribute("data-id");
    materias.borrar(parseInt(eid));
    dibujarTablaMateria();
}


// función para guardar o actualizar una materia
function guardarFormMateria() {
    var materia = new Materia();

    materia.mate_id = parseInt(document.getElementById("mate_id").value);
    materia.carre_id = document.getElementById("carre_id").value;
    materia.doce_id = document.getElementById("doce_id").value; // Este de donde sale Misaaaa
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
    let tabla = "<table class='table'><thead><tr><th>Nombre</th><th>Código</th><th>año</th><th>Docente</th><th>Carrera</th><th colspan='2'><button id='btnuevoMaTE' class='btn btn-primary'>Nuevo</button></th></tr></thead><tbody>";

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

