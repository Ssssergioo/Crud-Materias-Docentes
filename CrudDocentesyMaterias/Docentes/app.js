//Funciones
function nuevoForm(){
    document.getElementById("doce_id").value= -1;
    document.getElementById("doce_apellido").value= "";
    document.getElementById("doce_nombre").value= "";
    document.getElementById("doce_mail").value= "";
    document.getElementById("doce_cumple").value= "";
    document.getElementById("doce_cell").value= "";

};
function editarForm(e){};
function borrarForm(e){};
function guardarForm(){
    let docente = new Docente();
    docente.doce_id = document.getElementById("doce_id").value;
    docente.doce_apellido = document.getElementById("doce_apellido").value= "";
    docente.doce_nombre = document.getElementById("doce_nombre").value= "";
    docente.doce_mail = document.getElementById("doce_mail").value= "";
    docente.doce_cumple = document.getElementById("doce_cumple").value= "";
    docente.doce_cell = document.getElementById("doce_cell").value= "";

    if(docente.doce_id == -1){
        docentes.agregar(docente);
    }else{
        docentes.actualizar(docente);
    }
    dibujarTabla();
};
function cancelarForm(){};
function dibujarTabla(){
    let lineas = "";
	let thead =
		"<table class='table'><thead><tr><th>Apellido</th><th>Nombre</th><th>Mail</th><th>Cumple</th><th>Celular</th><th colspan='2'><a id='btnuevo'  class='btn btn-primary'>Nuevo</a></th></tr> </thead>";
	let tbody = "<tbody>";
	let tfoot = "</tbody></table>";
    docentes.datos.forEach((f) => {
		lineas =
			lineas +
			"<tr><td>" +
			docentes.getNameById(f.doce_id) +
			"</td><td>" +
			f.doce_apellido +
			"</td><td>" +
			f.doce_nombre+
            "</td><td>" +
			f.doce_mail+
            "</td><td>" +
			f.doce_cumple+
            "</td><td>" +
			f.doce_cell+
			" </td> <td><a class='bteditar' data-id='" +
			f.doce_id +
			"'>Editar</a>" +
			"<td><a class='btborrar' data-id='" +
			f.doce_id +
			"'>Borrar</a></td></tr>";
	});
    document.getElementById("tablaDocente").innerHTML = thead + tbody + lineas + tfoot;
};
function asignarEventos(){};
function cargar(){};

document.addEventListener("DOMContentLoaded", dibujarTabla);