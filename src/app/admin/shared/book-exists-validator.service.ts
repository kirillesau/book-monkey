import {Injectable} from '@angular/core';
import {AbstractControl, AsyncValidator, ValidationErrors} from "@angular/forms";
import {catchError, map, Observable, of} from "rxjs";
import {BookStoreService} from "../../shared/book-store.service";

@Injectable({
  providedIn: 'root'
})
export class BookExistsValidatorService implements AsyncValidator {


  constructor(private bs: BookStoreService) {
  }


  validate(control: AbstractControl): Observable<ValidationErrors | null> {
    return this.bs.check(control.value).pipe(
        map(exists => !exists ? null : {
          isbnExists: {valid: false}
        }),
        catchError(() => of(null))
    );
  }

}