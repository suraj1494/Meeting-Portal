import { Time } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';
import { MeetService } from '../service/meet.service';

export interface PeriodicElement {
  id:number;
  title:string;
  name: string;
  meetingDate:Date;
  meetingST:Time;
  meetingET:Time;
}


@Component({
  selector: 'app-available-meet',
  templateUrl: './available-meet.component.html',
  styleUrls: ['./available-meet.component.css']
})


export class AvailableMeetComponent implements OnInit {
  minDate=new Date();
  min1Date=new Date();
  dataDate:any;
  showMeet:boolean=false;
  allMeetData:any;
  todayMeet:any=[];
  tommorrowMeet:any=[];
  todayDate:any;
  tommorrowDate:any;
  public moment = moment
  displayedColumns: string[] = ['id', 'title', 'name','meetingDate' ,'meetingST','meetingET','space'];
  dataSource : any;
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };
  
  constructor(private meetService:MeetService) { }
  ngOnInit(): void {
    this.getAllData()
  }
  

  getAllData(){
    this.meetService.getDataJson().subscribe(res=>{
      this.allMeetData=res;
      this.minDate.setDate(this.minDate.getDate() - 1);
      this.todayDate=moment.utc(this.minDate).format('YYYY-MM-DD')
      this.minDate.setDate(this.minDate.getDate() + 1);
      this.tommorrowDate=moment.utc(this.minDate).format('YYYY-MM-DD')
      for(let data of this.allMeetData){
        this.dataDate=moment.utc(data.meetingDate).format('YYYY-MM-DD')
        if(this.todayDate==this.dataDate){
          this.todayMeet.push(data)
          // console.log("today meet")
          // console.log(this.todayMeet)
        }
      }
    const ELEMENT_DATA:PeriodicElement[]=this.todayMeet;
    // console.log("element data")
    // console.log(typeof(ELEMENT_DATA[0].meetingDate))
    this.dataSource=new MatTableDataSource(ELEMENT_DATA);
    // console.log('data')
    // console.log(this.dataSource)
    /*for(var a of this.dataSource){
      console.log('a')
      console.log(a)
    }*/
    })
  }

  applyFilter(event:any) {
    const filterValue = (event.target as HTMLInputElement).value;
    // let d=moment(filterValue).format('YYYY-MM-DD')
    let d=moment(filterValue).format('YYYY-MM-DD')
    this.meetService.dateSearch(d).subscribe(res=>{
      this.tommorrowMeet=res;
      const ELEMENT_DATA:PeriodicElement[]=this.tommorrowMeet;
      this.dataSource=new MatTableDataSource(ELEMENT_DATA);
    })
  }
  
}