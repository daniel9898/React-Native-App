
import Conexion from '../clases/conexion.js';

export default class Cuenta {

    

    constructor(){
      this.conexion = new Conexion(); 
      this.dataBase = this.conexion.get();
      //INVETIGAR COMO SE VAN A GENERAR LAS TABLAS DE LA DB
    }

    /*generarTabla(){

      this.dataBase.transaction((tx) => {
          let query = "CREATE TABLE IF NOT EXISTS cuentasNew (id INTEGER PRIMARY KEY AUTOINCREMENT, nombre TEXT, apellido TEXT, email TEXT)";
          tx.executeSql(query,[],(tx, result)=>{
              //FALTA VERFICAR QUE LA OPERACION SEA EXITOSA PARA SETEAR LA FUNCION reject
               console.log(tx, result);
          })
      });
    }*/

    guardar(state) {
        //NO ESTA GENERANDO EL ID ,TAL VEZ PORQUE LA TABLA SE CREO EN EL SQLITE BROWSER
        return new Promise ((resolve, reject) =>{
            this.dataBase.transaction(tx => {
            let query = "INSERT INTO cuentasNew (nombre,apellido,email) values(?,?,?)";
            tx.executeSql(query,[state.nombre,state.apellido,state.email],(tx, result)=>{
              //FALTA VERFICAR QUE LA OPERACION SEA EXITOSA PARA SETEAR LA FUNCION reject
              result.rowsAffected == 1 ? resolve(result.rowsAffected) : reject(false);
            })
          })
        })

    }
    
   traerTodas(){ //16789303 

        let cuentas = [];
        return new Promise ((resolve, reject) =>{

              this.dataBase.transaction(tx => {

              let query = "Select * from cuentasNew";
                
              tx.executeSql(query,[],(tx, result)=>{
                  
                  var len = result.rows.length;
                  for (let i = 0; i < len; i++) {
                       let row = result.rows.item(i);
                       cuentas.push(row);
                      }

                  resolve(cuentas);

                });
              })
        })

    }

   eliminar(id){
    
      return new Promise ((resolve, reject) =>{
          this.dataBase.transaction((tx)=>{
            let query = "DELETE FROM cuentasNew WHERE id = (?)";
            tx.executeSql(query,[id],(tx, result)=>{
               resolve(result);
            })
          })
        });
   }
}