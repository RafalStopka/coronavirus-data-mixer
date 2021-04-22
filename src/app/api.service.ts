import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { config } from './../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  getDataFromAPI(endpoint: string): Observable<any>{
    return this.httpClient.get<[]>(config.apiURL + endpoint, {
      headers:{
        "x-rapidapi-key": config.rapidAPIKey,
        "x-rapidapi-host": config.rapidAPIHost,
      }
    }).pipe(
      catchError(this.handleError(`get ${endpoint}`))
    )
  }

  handleError<T>(operationType: string, result?: T){
    return (error: any): Observable<T> =>{
      console.error(error);
      return of(result as T);
    }
  }
}
