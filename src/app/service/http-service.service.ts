import { Injectable } from '@angular/core';
import { User } from './user';
import {
  HttpClient,
  HttpHeaders,
  HttpErrorResponse,
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpServiceService {
  private API = 'http://localhost:3000/api/v1/user';
  constructor(private httpClient: HttpClient) {}


  getUserAll(): Observable<any> {
    return this.httpClient
      .get(this.API)
      .pipe(retry(1), catchError(this.handleError));
  }

  getUser(id: any): Observable<any> {
   
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id:id,
      },
    };
    return this.httpClient
      .get<any>(this.API+"/"+id,options)
      .pipe(retry(1), catchError(this.handleError));
  }

  updateUser(user: User): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(user);
    return this.httpClient.put(this.API, body, {
      headers: headers,
    });
  }

  deleteUser(ids: any): Observable<any> {
    const options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
      body: {
        id: ids,
      },
    };
    return this.httpClient.delete(this.API , options);
  }

  createUser(user: any): Observable<any> {
    const headers = { 'content-type': 'application/json' };
    const body = JSON.stringify(user);
    return this.httpClient.post(this.API, body, {
      headers: headers,
    });
  }
  handleError(error: HttpErrorResponse) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    console.log(errorMessage);
    return throwError(errorMessage);
  }
}
