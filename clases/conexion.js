

export default class Conexion {
    
    static SQLite = require('react-native-sqlite-storage');
	static db = Conexion.SQLite.openDatabase({name : "testDB", createFromLocation : "~testDB.db"});
	
    constructor(){ }

    get(){
        return Conexion.db;
    }

}


