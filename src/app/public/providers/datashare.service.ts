import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';
interface User {
  id: number;
  username: string;
  usermail: string;
  userpassword: string;
}

@Injectable({
  providedIn: 'root'
})
export class DatashareService {

  user:any;
  isuserLogged = new BehaviorSubject(false);

  constructor(private http: HttpClient) { }

  createNewUser(dataObj:any){
    return this.http.post('http://localhost:3000/users', dataObj);
  }

  getUser(email:string){
    return this.http.get('http://localhost:3000/users?email=' + email);

    // this is other way
    // return new Promise((resolve, reject)=>{
    //   this.http.get('http://localhost:3000/users?email=' + email).subscribe(
    //     (res)=>{
    //       resolve(res);
    //     },
    //     (err)=>{
    //       reject(err);
    //     }
    //   );
    // })
  }

 isLogged(){
    return localStorage.getItem('user');
  }

}
