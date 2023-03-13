import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatashareService } from '../../providers/datashare.service';
import { MatSnackBar } from '@angular/material/snack-bar';
declare var $:any;

@Component({
  selector: 'login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor(private fb:FormBuilder, public userService:DatashareService, private snackbar:MatSnackBar, private router:Router) { }

  ngOnInit(): void {
  }

  loginForm = this.fb.group({
    usermail:['', [Validators.required, Validators.email]],
    userpassword: ['', [Validators.required, Validators.minLength(6)]]
  });

  login(){
    this.userService.getUser(this.loginForm.value.usermail).subscribe((res:any) => {
      const user = res.find((a:any)=>{
        return a.usermail === this.loginForm.value.usermail && a.userpassword === this.loginForm.value.userpassword;
      });
      if(user){
        console.log("matched");
        this.snackbar.open('You are successfully login','ok');
        this.userService.isuserLogged.next(true);
        localStorage.setItem('user', JSON.stringify(user));
        this.loginForm.reset();
        $('.form-box').css('display','none');
        this.router.navigate(['/home']);
      }else{
        this.snackbar.open('Account does not exist','ok');
        this.router.navigate(['login']);
      }
    }, err=>{
      console.log(err);
      alert('Something was wrong');
      }
    )
  }

  sbtn1(){
    $('.form-box').css('display','none');
    $('.form-box1').css('display','block');
  }

}
