import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatashareService } from '../../providers/datashare.service';
declare var $:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(private fb:FormBuilder, public userService:DatashareService, private router:Router) { }

  ngOnInit(): void {
  }

  createAccountForm = this.fb.group({
    usermail:['',[Validators.required, Validators.email]],
    username :['', [Validators.required, Validators.maxLength(10)]],
    isacceptterms :['', Validators.required],
    userpassword: ['', [Validators.required, Validators.minLength(6)]]
  });

  create(){
        this.userService.createNewUser(this.createAccountForm.value).subscribe( res =>{
          alert('data added successfully');
          // this.userService.user = res;
          // localStorage.setItem('user', JSON.stringify(res));
          // this.userService.isuserLogged.next(true);
          this.createAccountForm.reset();
          this.router.navigate(['login']);
        }, err =>{
          console.log(err);
          alert('Somthing went wrong');
        })

  }

  sbtn(){
    $('.form-box').css('display','block');
    $('.form-box1').css('display','none');
  }

}
