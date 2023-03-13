import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  // deleteProduct(id:any) {
  //     return this.http.delete(`${'http://localhost:3000/books'}/${id}`).subscribe(res => {
  //       console.log(res,'ppp');
  //       this.fetchData();
  //     })
  // };
}
