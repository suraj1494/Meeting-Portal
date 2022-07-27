import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class MeetService {
  // private url="http://localhost:3000/meeting-details"
  httpOptions: { headers: HttpHeaders } = {
    headers: new HttpHeaders({ "Content-Type": "application/json" }),
  };
  dbId:any;
  constructor(private _http:HttpClient) { }

  getDataJson(){
    return this._http.get<any>("http://localhost:3000/meeting-details");
  }
  postmeetDetails(a:any){
    console.log("value of a")
    console.log(a)
    return this._http.post<any>("http://localhost:3000/meeting-details",a);
  }

  itemSearch(i:number){
    console.log("value of i " + i) 
    this.dbId=i;
    return this._http.get<any>(`http://localhost:3000/meeting-details/getById/${i}`);
  }

  lastRecord(){
    return this._http.get<any>(`http://localhost:3000/meeting-details/getLastRecord`);
  }

  postItemSpace(a:any){
    console.log('postItemSpace')
    console.log(a)
    return this._http.post<any>(`http://localhost:3000/meeting-details/getById/${this.dbId}`,a)
  }

  dateSearch(userDate:any){
    console.log("searching date")
    console.log(userDate);
    return (this._http.get<any>(`http://localhost:3000/meeting-details/getByDate/${userDate}`))
  }
}