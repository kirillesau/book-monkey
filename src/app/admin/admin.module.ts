import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {AdminRoutingModule} from './admin-routing.module';
import {ReactiveFormsModule} from "@angular/forms";
import {DateValueAccessorModule} from "angular-date-value-accessor";
import {BookFormComponent} from "./book-form/book-form.component";
import {CreateBookComponent} from "./create-book/create-book.component";
import {EditBookComponent} from "./edit-book/edit-book.component";
import {FormMessagesComponent} from "./form-messages/form-messages.component";


@NgModule({
  declarations: [
    BookFormComponent,
    CreateBookComponent,
    EditBookComponent,
    FormMessagesComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    DateValueAccessorModule
  ]
})
export class AdminModule {
}
