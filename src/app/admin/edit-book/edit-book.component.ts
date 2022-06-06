import {Component, OnInit} from '@angular/core';
import {Book} from "../../shared/book";
import {BookStoreService} from "../../shared/book-store.service";
import {ActivatedRoute, Router} from "@angular/router";
import {map, switchMap} from "rxjs";

@Component({
  selector: 'bm-edit-book',
  templateUrl: './edit-book.component.html',
  styleUrls: ['./edit-book.component.css']
})
export class EditBookComponent implements OnInit {

  book?: Book;

  constructor(
      private bs: BookStoreService,
      private route: ActivatedRoute,
      private router: Router
  ) {
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
        map(params => params.get('isbn') || ''),
        switchMap(isbn => this.bs.getSingle(isbn))
    ).subscribe(book => this.book = book);
  }

  updateBook(book: Book) {
    this.bs.update(book).subscribe(() => {
      this.router.navigate(['../../..', 'books', book.isbn], {relativeTo: this.route});
    });
  }
}
