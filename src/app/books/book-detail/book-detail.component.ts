import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-book-detail',
  templateUrl: './book-detail.component.html',
  styleUrls: ['./book-detail.component.scss']
})
export class BookDetailComponent implements OnInit {
  products:any;
  isUpdated: boolean = false;
  id: any;
  data:any;
  exist = false;
  constructor(
    private route: ActivatedRoute,
    private http: HttpClient) { }
    imgurl:any;
  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.http.get('http://localhost:3000/books').subscribe(res => {
        this.isUpdated = true;
        this.products = res;
        for (var i = 0; i < this.products.length; i++) {
          if (parseInt(this.products[i].id) === this.id) {
            this.exist = true;
            this.data = this.products[i];
          } else {
            this.exist = false;
          }
        }
      });
  }

}
