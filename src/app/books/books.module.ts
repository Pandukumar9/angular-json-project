import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BooksRoutingModule } from './books-routing.module';
import { BooksComponent } from './books.component';
import { AddBooksComponent } from './add-books/add-books.component';
import { EditBooksComponent } from './edit-books/edit-books.component';
import { BooksListComponent } from './books-list/books-list.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SearchfilterPipe } from './searchfilter.pipe';
import {NgxPaginationModule} from 'ngx-pagination';
import { SortPipe } from './sort.pipe';

@NgModule({
  declarations: [
    BooksComponent,
    AddBooksComponent,
    EditBooksComponent,
    BooksListComponent,
    BookDetailComponent,
    SearchfilterPipe,
    SortPipe
  ],
  imports: [
    CommonModule,
    BooksRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,

  ]
})
export class BooksModule { }
