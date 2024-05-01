//Aca va el array donde vamos a guardar a los docentes con sus datos
//Tambien el constructor y sus metodos

class Docentes{
    datos=[];

    constructor(){
        let data=localStorage.getItem("Docentes");
        if(!data){
            this.predata();
        }else{
            this.getdata();
        }
        this.persistir();
    }

getMaxId(){};

predata(){};

getdata(){};

getIndexById(){};

agregar(){};

actualizar(){};

borrar(){};

persistir(){
    localStorage.setItem("Docentes", JSON.stringify(this.datos));}

}



















