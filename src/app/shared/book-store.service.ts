import {Inject, Injectable} from '@angular/core';
import {Book} from "./book";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, map, Observable, retry, throwError} from "rxjs";
import {BookRaw} from "./book-raw";
import {BookFactory} from "./book-factory";
import {API_URL} from "./tokens";

@Injectable({
  providedIn: 'root'
})
export class BookStoreService {

  constructor(
      private http: HttpClient,
      @Inject(API_URL) private api: string
  ) {
  }

  getAll(): Observable<Book[]> {
    return this.http.get<BookRaw[]>(`${this.api}/books`).pipe(
        retry(3),
        map(booksRaw => booksRaw.map(b => BookFactory.fromRaw(b))),
        catchError(this.errorHandler)
    );
  }

  getAllSearch(searchTerm: string): Observable<Book[]> {
    return this.http.get<BookRaw[]>(`${this.api}/books/search/${searchTerm}`).pipe(
        retry(3),
        map(booksRaw => booksRaw.map(b => BookFactory.fromRaw(b))),
        catchError(this.errorHandler)
    );
  }

  getSingle(isbn: string): Observable<Book> {
    return this.http.get<BookRaw>(`${this.api}/book/${isbn}`).pipe(
        retry(3),
        map(b => BookFactory.fromRaw(b)),
        catchError(this.errorHandler)
    );
  }

  remove(isbn: string): Observable<any> {
    return this.http.delete(`${this.api}/book/${isbn}`, {responseType: 'text'});
  }

  create(book: Book): Observable<any> {
    return this.http.post(`${this.api}/book`, book, {responseType: 'text'}).pipe(
        catchError(this.errorHandler)
    );
  }

  update(book: Book): Observable<any> {
    return this.http.put(
        `${this.api}/book/${book.isbn}`, book, {responseType: 'text'}
    ).pipe(catchError(this.errorHandler))
  }

  check(isbn: string): Observable<boolean> {
    return this.http.get<boolean>(`${this.api}/book/${isbn}/check`).pipe(
        catchError(this.errorHandler)
    );
  }

  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.error("Fehler aufgetreten!");
    return throwError(error)
  }

}
