import {NgModule} from '@angular/core';
import {RouterModule, Routes, PreloadAllModules} from '@angular/router';
import {HomeComponent} from "./home/home.component";
import {BrowserModule} from "@angular/platform-browser";

const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  },
  {
    path: 'books',
    loadChildren: () => import('src/app/books/books.module').then(m => m.BooksModule)
  },
  {
    path: 'admin',
    loadChildren: () => import('src/app/admin/admin.module').then(m => m.AdminModule)
  }
];

@NgModule({
  imports: [BrowserModule, RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
