import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { Observable, EMPTY, ReplaySubject, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Response } from '../_models/response.interface';

/** Base class for the a data service object, to be extended and used by all services that do standard CRUD request to the backend */
@Injectable({ providedIn: 'root' })
export abstract class BaseDataService<T, U> {
  /*To be overriden by child classes*/
  serviceURL: string = '';

  /*Subject that can be used by components or other classes to subscribe to "data" changed by this service trough all the requests defined bellow */
  dataChange$: ReplaySubject<T[]> = new ReplaySubject<T[]>(1);
  /*Construct the complete URL for the service using hte base api URL and the URL defined in the child class */
  public get apiURL(): string {
    return `${environment.apiUrl}${this.serviceURL}`;
  }

  constructor(private baseHttpClient: HttpClient, private baseRouter: Router) {}

  /*executes a GET request to the backend to the endpoint define in the child class */
  getData(): void {
    this.baseHttpClient
      .get<T[]>(this.apiURL)
      .pipe(
        map((response: any) => {
          return response;
        })
      )
      .subscribe(
        (data: T[]) => {
          this.dataChange$.next(data);
          return data;
        },
        (err: HttpErrorResponse) => {
          alert(`Error: ${err.name} ${err.message}`);
        }
      );
  }

  /*executes a POST request to the backend to the endpoint define in the child class */
  addItem(item: U): Observable<any> {
    return this.baseHttpClient.post<U>(this.apiURL, item).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((err, caught) => {
        return EMPTY;
      })
    );
  }

  /*executes a PUT request to the backend to the endpoint define in the child class */
  updateItem(item: T): Observable<any> {
    return this.baseHttpClient.put<T>(this.apiURL, item).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((err, caught) => {
        return EMPTY;
      })
    );
  }

  /*executes a DELETE request to the backend to the endpoint define in the child class */
  deleteItem(itemId: number): Observable<any> {
    return this.baseHttpClient.delete<T[]>(`${this.apiURL}/${itemId}`).pipe(
      map((data: any) => {
        return data;
      }),
      catchError((err, caught) => {
        return EMPTY;
      })
    );
  }
}
