import { Injectable, Output } from '@angular/core';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth'
// import { GoogleAuthProvider } from 'firebase/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userEmail:any='';
  userName:any='';
  firstName:string='';
  lastName:string='';
  domainEmail:string='';
  constructor(private fireauth:AngularFireAuth,private router:Router) { }
  isLoggedIn(){
    console.log("get item from session storage")
    return sessionStorage.getItem('token')!=null;
  }
  //login method
  login(email:string,password:string){
    this.fireauth.signInWithEmailAndPassword(email,password).then( res=>{
      localStorage.setItem('token','true');
      console.log("res")
      console.log(res)
      this.router.navigate(['/home'])

      // if(res.user)
    },err=>{
      alert('some error occured')
      this.router.navigate(['/login'])
    })
  }

  //logging out
  logout(){
    this.fireauth.signOut().then( ()=>{
      sessionStorage.removeItem('token')
      localStorage.removeItem('UserEmail')
      this.router.navigate(['/login']);
    },err=>{
      alert('err.message')
    })
  }

  forgotPassword(email : string) {
    this.fireauth.sendPasswordResetEmail(email).then(() => {
      this.router.navigate(['/varify-email']);
    }, err => {
      alert('Something went wrong');
    })
}

// email varification
sendEmailForVarification(user : any) {
  // console.log(user);
  user.sendEmailVerification().then((res : any) => {
    this.router.navigate(['/varify-email']);
  }, (err : any) => {
    alert('Something went wrong. Not able to send mail to your email.')
  })
}

  //sign in with google
  googleSignIn(){
    return this.fireauth.signInWithPopup(new GoogleAuthProvider).then(res=>{
      console.log(res)
      // localStorage.setItem('token',JSON.stringify(res.user?.uid))
      this.userEmail=res.user?.email;
      this.domainEmail=this.userEmail.split("@")[1]
      console.log(this.domainEmail)
      if(this.domainEmail=="netprophetsglobal.com"){
        sessionStorage.setItem('token',JSON.stringify(res.user?.uid));
        this.firstName=this.userEmail.split("@")[0].split('.')[0];
        this.lastName=this.userEmail.split("@")[0].split('.')[1];
        this.firstName=this.firstName.charAt(0).toUpperCase() + this.firstName.slice(1);
        this.lastName=this.lastName.charAt(0).toUpperCase() + this.lastName.slice(1);
        // console.log(this.firstName,this.lastName)
        this.userName=this.firstName + " " + this.lastName;
        localStorage.setItem('UserEmail',this.userName)
        this.router.navigate(['/home']);
        //this.userEmail=res.user?.email;
        //console.log(this.userEmail)
      }else{
        alert("SignIn with your Company's Email")
      }
      
    },err=>{
      alert(err.message)
    })
  }
}
