import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { SortPipe } from '../sort.pipe';

@Component({
  selector: 'app-books-list',
  templateUrl: './books-list.component.html',
  styleUrls: ['./books-list.component.scss']
})
export class BooksListComponent implements OnInit {

  constructor(private http: HttpClient,private orderPipe: SortPipe) {
    this.orderPipe.transform(this.products, 'p_cost')
  }
  id: any;
  products:any;
  p:any;
  searchText='';
  ngOnInit() {
    this.fetchData();
  }
  order = "id";
  reverse = true;
  deleteProduct(id:any) {
      return this.http.delete(`${'http://localhost:3000/books'}/${id}`).subscribe(res => {
        console.log(res,'ppp');
        this.fetchData();
      })
  };

  fetchData(){
    this.http.get('http://localhost:3000/books').subscribe(res => {
        this.products = res;
      });
  };



}
