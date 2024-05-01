//Aca vamos a hacer el crud de de las materias
//constructor el cual precarga datos en caso de no haber
class Materias {
    constructor() {
        this.datos = []; 
        let data = localStorage.getItem("materias");
        if (!data) {
            this.predata();
        } else {
            this.getdata();
        }
        this.persistir();
    }
//obtiene el id mas alto iterando por el array y lo asigna como max id
    getMaxId() {
        let idMax = -1;
        this.datos.forEach((materia) => {
            if (materia.mate_id > idMax) {
                idMax = materia.mate_id;
            }
        });
        return idMax;
    }
//agrega los datos para testear (aun no hecho)
    predata() {
        //cargar datos de prueba
    }
//recupera los datos del local storage y los asigna al array datos
    getdata() {
        this.datos = JSON.parse(localStorage.getItem("materias"));
    }
//guarda nuestro array en el local storage por el metodo set item
    persistir() {
        localStorage.setItem("materias", JSON.stringify(this.datos));
    }
//devuelve el indice del array que corresponde el id pasado como parametro, en caso se no encontrarse devuelve -1
    getIndexById(id) {
        for (let i = 0; i < this.datos.length; i++) {
            if (this.datos[i].mate_id === id) {
                return i;
            }
        }
        return -1;
    }
//agregar una nueva materia, le asigna el maxid como id y persiste ()
    agregar(materia) {
        materia.mate_id = this.getMaxId() + 1;
        this.datos.push(materia);
        this.persistir();
    }
//busca el indice de una materia en el array, si lo encuentra lo remplaza por los nuevos datos de materia y persiste
    actualizar(materia) {
        const index = this.getIndexById(materia.mate_id);
        if (index !== -1) {
            this.datos[index] = materia;
            this.persistir();
        }
    }
//busca el indice de una materia en el array, lo elimina si lo encuentra y persiste
    borrar(id) {
        const index = this.getIndexById(id);
        if (index !== -1) {
            this.datos.splice(index, 1);
            this.persistir();
        }
    }
//devuelve el array completo
    obtenerTodos() {
        return this.datos;
    }
}