
import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AuthService } from '../shared/auth.service';
import { MeetService } from '../service/meet.service';
import { Router } from '@angular/router';
import {FormControl, Validators} from '@angular/forms';
import * as moment from 'moment';


@Component({
  selector: 'app-schedule-meeting',
  templateUrl: './schedule-meeting.component.html',
  styleUrls: ['./schedule-meeting.component.css']
})
export class ScheduleMeetingComponent implements OnInit {
  
  minDate=new Date;
  datehtml=new Date;
  meetingForm1!:FormGroup;
  meetingForm2!:FormGroup;
  userId:any;
  question:any;
  public userST:any
  public userET:any
  public userDate:any;
  dbST:any;
  dbET:any;
  dbDate:any;
  st:any;
  len:any;
  space1:any;
  space2:any;
  meetform2:boolean=false;
  currTime:any;
  submitFor1:boolean=false;
  meetingSchedule=true;
  availableMeeting=false;
  userDateMeet:any;
  stTimedate:boolean=true;
  etTimedate:boolean=false;
  email = new FormControl('', [Validators.required, Validators.email]);
  name = new FormControl('', [Validators.required, Validators.email]);
  public moment = moment
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a Correct Email';
    }
    // if(this.name.hasError('required')){
    //   return 'You must enter Only characters'
    // }
    return this.email.hasError('email') ? 'Not a valid email' : '';
  }
  //Myfilter for datePicker to prevent sarurday and sunday
  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 0 && day !== 6;
  };

  x = localStorage.getItem("UserEmail");
  constructor(private meetService:MeetService,private formBuilder:FormBuilder, private auth:AuthService,private router:Router) { }
  
  ngOnInit(): void {
    this.meetingForm1=this.formBuilder.group({
      title:[''],
      name:new FormControl('',[
        Validators.required,
        Validators.pattern("[a-zA-Z][a-zA-Z ]+")
      ]),
      email:new FormControl('',[
        Validators.required,
        Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]),
      meetingDate: [''],
      meetingST:[''],
      meetingET:[''],
   })
   this.meetingForm2=this.formBuilder.group({
    space:[''],
   })
  }

  shiftToSchedule(){
    this.meetingSchedule=true;
    this.availableMeeting=false;
  }

  shiftToAvailable(){
    this.meetingSchedule=false;
    this.availableMeeting=true;
  }
  

  submitMeetForm(){
    // console.log(this.meetingForm1.value.meetingDate)
    // this.meetingForm1.value.meetingDate.setDate(this.meetingForm1.value.meetingDate.getDate() + 1);
    // this.st=moment.utc(this.meetingForm1.value.meetingDate).format('YYYY-MM-DD')
    // this.meetingForm1.value.meetingDate=this.st;
    this.userST=this.meetingForm1.value.meetingST;
    this.userET=this.meetingForm1.value.meetingET; 
    this.userDate=this.meetingForm1.value.meetingDate;
    // this.userDate.setDate(this.userDate.getDate() + 1);
    this.userDate=moment(this.userDate).format('YYYY-MM-DD');
    // console.log(this.userDate)

    this.meetingForm1.value.meetingDate=this.userDate;

    this.meetService.lastRecord().subscribe(res=>{
      if(res.length==0)
      {
        this.userId=1
      }else{
        this.userId=res[0].id ;
        this.userId=this.userId + 1;        
      }
      
    })

    this.meetService.dateSearch(this.userDate).subscribe(res=>{
      if(this.userST<this.userET){
        this.getDateLogic(res);
      }else{
        alert('Meeting Start Time must be smaller than Meeting End Time')
      }
        
    })  
       
  }

  //submiting data of another form
  submitMeetForm2(){
    console.log(this.meetingForm2.value)
    
    this.meetService.postmeetDetails(this.meetingForm1.value).subscribe(()=>{

      this.meetService.itemSearch(this.userId).subscribe(()=>{
        this.meetService.postItemSpace(this.meetingForm2.value).subscribe(res=>{
          alert("MEETING SCHEDULED")
          this.availableMeeting=true;
          this.meetingSchedule=false;
          this.meetingForm1.reset();
          this.meetingForm2.reset();
          this.meetform2=false;
        })
      })
    })
    
  }


  getDateLogic(a:any){
    console.log("value from function ")
    this.userDateMeet=a;
    console.log(this.userDateMeet)
    if(this.userDateMeet.length==0){
      console.log("if condititon is true")
      this.len=0;
      // this.meetService.postmeetDetails(this.meetingForm1.value).subscribe(()=>{})
      this.space1=1;
      this.space2=2;
      this.meetform2=true;
      // console.log(this.userDateMeet)
    }else{
      // console.log("user data meet")
      // console.log(this.userDateMeet)
      this.len=this.userDateMeet.length;
      console.log("this length and user id")
      console.log(this.len)
      // this.userId=this.userDateMeet.length - 1;
      console.log(this.userId)
      this.meetTimeLogic();
    }
  }

  meetTimeLogic()
  { 
    //userDateMeet  date matched data
    if(this.len==1){
      this.dbST=this.userDateMeet[0].meetingST;
      this.dbET=this.userDateMeet[0].meetingET;
      // console.log((this.dbST))
      // console.log((this.dbET))
      // console.log((this.userST))
      const [hours1, minutes1, seconds1] = this.dbST.split(':');
      const [hours2, minutes2, seconds2] = this.dbET.split(':');
      const [hours3, minutes3, seconds3] = this.userST.split(':');
      const [hours4, minutes4, seconds4] = this.userET.split(':');

      const dbST = new Date(2022, 0, 1, +hours1, +minutes1, +seconds1);
      const dbET = new Date(2022, 0, 1, +hours2, +minutes2, +seconds2);
      const usST = new Date(2022, 0, 1, +hours3, +minutes3, +'00');
      const usET = new Date(2022, 0, 1, +hours4, +minutes4, +'00');

      // console.log(usST.getTime())
      // console.log(usET.getTime())
      // console.log(dbST.getTime())
      // console.log(dbET.getTime())
      // if(usST.getTime()==dbST.getTime()){
      //   console.log("less than");
      // }else{
      //   console.log("doesnot macth")
      // }
      if(usST<dbST){
        if(usET<=dbST){
        console.log("meeting scheduled before other meeting")
        this.space1=2;
        this.space2=1;
        this.meetform2=true;
        }else {
          console.log("meeting space other")
          this.space1=this.userDateMeet[0].space;
          this.space2=this.userDateMeet[0].space;
          this.meetform2=true;
        }
      }
      if(dbST<=usST && usST<dbET){
        console.log("meeting can be scheduled in other space")
        this.space1=this.userDateMeet[0].space;
        this.space2=this.userDateMeet[0].space;
        this.meetform2=true;
      }
      if(usST>=dbET){
        console.log("meeting can be scheduled after time")
        this.space1=2;
        this.space2=1;
        this.meetform2=true;
      }
      
    }else{
      for(let i=0;i<this.len;i++){
        this.dbST=this.userDateMeet[i].meetingST;
        this.dbET=this.userDateMeet[i].meetingET;
        const [hours1, minutes1, seconds1] = this.dbST.split(':');
        const [hours2, minutes2, seconds2] = this.dbET.split(':');
        const [hours3, minutes3, seconds3] = this.userST.split(':');
        const [hours4, minutes4, seconds4] = this.userET.split(':');

        const dbST = new Date(2022, 0, 1, +hours1, +minutes1, +seconds1);
        const dbET = new Date(2022, 0, 1, +hours2, +minutes2, +seconds2);
        const usST = new Date(2022, 0, 1, +hours3, +minutes3, +'00');
        const usET = new Date(2022, 0, 1, +hours4, +minutes4, +'00');
        // console.log(dbST)
        // console.log(dbET)
        //CASE I in previous timings
        if(usST<dbST)
        {
          if(usET<=dbST)
            {
              if(i==0){
                this.space1=2;
                this.space2=1;
                this.meetform2=true;
              }else{
                console.log("this.space1 & this.space2")
                console.log(this.space1,this.space2)
                
                if(this.space1!=2){
                  this.space1=0;
                }
                if(this.space2!=1){
                  this.space2=0;
                }
              }

              // i=this.len;
              // this.meetService.postmeetDetails(this.meetingForm1.value).subscribe(()=>{})
              this.meetform2=true;                        
            }
            else{
              console.log("userET > DBST")
              if(i==0){
                this.space1=this.userDateMeet[i].space;
              this.space2=this.userDateMeet[i].space;
              }else{
                this.spacefun(i);
              }
              if(this.space1==2  || this.space2==1){
                this.meetform2=true;
              }else{
                this.meetform2=false;
              }
            }
        }
        //CASE II
        if(dbST<=usST  && usST<dbET){
          console.log("in Between")
          if(i==0){
            this.space1=this.userDateMeet[i].space;
          this.space2=this.userDateMeet[i].space;
          }else{
            this.spacefun(i);
          }
          if(this.space1==2  || this.space2==1){
            this.meetform2=true;
          }else{
            this.meetform2=false;
          }
        }
        //CASE III
        if(usST>=dbET){
          console.log("length>1 and meeting after all meetings")
          if(i==0){
            this.space1=2
            this.space2=1;
            this.meetform2=true;
          }else{
            console.log("this.space1 & this.space2")
                console.log(this.space1,this.space2)
                
                if(this.space1!=2){
                  this.space1=0;
                }
                if(this.space2!=1){
                  this.space2=0;
                }
                if(this.space1==0 && this.space2==0){
                  this.meetform2=false;
                }
          }

        }       
      }
    }
    if(this.meetform2==false){
      alert('meeting can not be scheduled')
      this.availableMeeting=true;
        this.meetingSchedule=false;
        this.meetingForm1.reset();
        this.meetingForm2.reset();
        this.meetform2=false;
    }
  }

  func1(a:any){
    console.log(a);
    let date1=new Date();
    let a1=moment.utc(a).format('YYYY-MM-DD')
    date1.setDate(date1.getDate()-1)
    let date1html=moment.utc(date1).format('YYYY-MM-DD')

    if(a1==date1html){
      var time = new Date();
      this.currTime=time.toLocaleString('en-US', { hour: 'numeric',minute:'numeric', hour12: false })
    }else{
      this.currTime=undefined;
    }
  }

  spacefun(i:any){
    console.log('spacefun')
    console.log(this.space1)
    console.log(this.space2)
    if(this.space1!=this.userDateMeet[i].space){
      this.space1=0;
      // this.meetform2=false
    }
    if(this.space2!=this.userDateMeet[i].space){
      this.space2=0;
      // this.meetform2=false
    }

  }
}
