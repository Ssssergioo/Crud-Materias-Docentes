class Docentes {
    datos = [];
    
    constructor() {
        let data = localStorage.getItem("docentes");
        if (!data) {
            this.predata();
        } else {
            this.getdata();
        }
        this.persistir();
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
    }
    //para obtener lo de la memoria local
    getdata() {
        this.datos = JSON.parse(localStorage.getItem("docentes"));
    }
    //persitir en la memoria local
    persistir() {
        localStorage.setItem("docentes", JSON.stringify(this.datos));
    }
    //obtener el indec por el id
    getIndexById(id) {
        for (let i = 0; i < this.datos.length; i++) {
            if (this.datos[i].doce_id === id) {
                return i;
            }
        }
        return -1;
    }
    //agregar al docente
    agregar(docente) {
        docente.doce_id = this.getMaxId() + 2;
        this.datos.push(docente);
        this.persistir();
    }
    // actualizar la lista
    actualizar(docente) {
        const index = this.getIndexById(docente.doce_id);
        if (index !== -1) {
            this.datos[index] = docente;
            this.persistir();
        }
    }
    //borrar por id
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
