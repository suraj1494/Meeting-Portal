const db=require('../util/database')

module.exports=class data{
    constructor(){}
    /*constructor(id,title,name,email,date,st,et){
        this.id=id;
        this.title=title;
        this.name=name;
        this.email=email;
        this.date=date;
        this.st=st;
        this.et=et;
    }*/

    static fetchAll() {
        // console.log("in the query database")
        return db.execute('SELECT * FROM meet_app_details')
    }

    static post(item){
        // console.log("item value")
        
        return db.execute('INSERT INTO meet_app_details (title, name, email, meetingDate, meetingST, meetingET) VALUES (?,?,?,?,?,?)',[item.title,item.name,item.email,item.meetingDate,item.meetingST,item.meetingET])
    }

    static itemSearch(id){
         return db.execute('SELECT * FROM meet_app_details WHERE id=?',[id])
    }
    static postItem(item,id){
        // console.log(item)
        // console.log(item.space)
        // return db.execute(`INSERT INTO meet_app_details (space) VALUES ${[item.space]}`)
        // return db.execute('UPDATE INTO meet_app_details (space) VALUES (?) WHERE id=?',[item.space],[75])
        return db.execute(`UPDATE meet_app_details SET space=${[item.space]} WHERE id=${[id]}`)
    }
    static dateSearch(userDate){
        // console.log(userDate)
        return db.execute(`SELECT * FROM meet_app_details WHERE meetingDate=?`,[userDate]);
    }

    static getLastRecord(){
        return db.execute(`SELECT * from meet_app_details ORDER by id DESC LIMIT 1`)
    }
    /*
    static delete(id){
        return db.execute('DELETE FROM items WHERE id = ?',[id])
    }*/

}