import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';
import { HomeComponent } from './public/components/home/home.component';
import { LoginComponent } from './public/components/login/login.component';
import { ProductsComponent } from './public/components/products/products.component';
import { RegisterComponent } from './public/components/register/register.component';

const routes: Routes = [
  {path :'', redirectTo:'register', pathMatch:'full'},
  {path:'register', component: RegisterComponent},
  {path:'login', component: LoginComponent},
  {path:'home', component: HomeComponent},
  {path:'pro', component: ProductsComponent, canActivate: [AuthGuard]},
  { path: 'books', loadChildren: () => import('./books/books.module').then(m => m.BooksModule) , canActivate: [AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
