import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddBooksComponent } from './add-books/add-books.component';
import { BookDetailComponent } from './book-detail/book-detail.component';
import { BooksListComponent } from './books-list/books-list.component';
import { BooksComponent } from './books.component';
import { EditBooksComponent } from './edit-books/edit-books.component';

const routes: Routes = [{ path: '', component: BooksComponent },
   {path: 'addbook', component:AddBooksComponent},
   {path: 'editbook/:id', component:EditBooksComponent},
   {path: 'listbooks', component:BooksListComponent},
   {path: 'bookdetail/:id', component:BookDetailComponent}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BooksRoutingModule { }
