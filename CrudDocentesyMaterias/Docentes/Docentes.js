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

predata(){
    this.datos.push({
        doce_id: 1,
        doce_apellido: "Perez",
        doce_nombre: "Sergio",
        doce_mail: "ajjaja@gmail.com",
        doce_cumple: "03/10/2022" ,
        doce_cell: "0975757757",
    });
    this.datos.push({
        doce_id: 1,
        doce_apellido: "Ferrandez",
        doce_nombre: "Arami",
        doce_mail: "siiii@gmail.com",
        doce_cumple: "05/11/2024" ,
        doce_cell: "0975757757",
    });
};

getdata(){};

getIndexById(){};

agregar(){};

actualizar(){};

borrar(){};

persistir(){
    localStorage.setItem("Docentes", JSON.stringify(this.datos));}

}