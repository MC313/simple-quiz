import { Injectable } from '@angular/core';
import {
  HttpHeaders,
  HttpClient,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

import { Quote } from '../Quote';

@Injectable({
  providedIn: 'root'
})
export class TopicsService {
  private baseUrl: string = 'http://localhost:3000/api/v1';

  constructor(private http: HttpClient) {}

  getTopics(): Observable<any> {
    const httpOptions: object = {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    };
    return this.http
      .get<string[]>(`${this.baseUrl}/topics`, httpOptions)
      .pipe(catchError((err: HttpErrorResponse) => this.handleHttpError(err)));
  }

  private handleHttpError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      console.error('An error occurred:', error.error.message);
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      console.error(
        `Backend returned code ${error.status}, ` +
          'body was:' +
          JSON.stringify(error.error)
      );
    }
    // return an observable with a user-facing error message
    return throwError('Something bad happened; please try again later.');
  }
}
