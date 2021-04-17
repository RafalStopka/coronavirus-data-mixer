import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private httpClient: HttpClient) { }

  config = {
    "apiURL":  "https://covid-193.p.rapidapi.com/",
    "rapidAPIKey": "c37be5d850mshff9d4ae5e692bb0p127b26jsnc687d188d287",
    "rapidAPIHost": "covid-193.p.rapidapi.com"
  }

  getDataFromAPI(endpoint: string): Observable<any>{
    return this.httpClient.get<[]>(this.config.apiURL + endpoint, {
      headers:{
        "x-rapidapi-key": this.config.rapidAPIKey,
        "x-rapidapi-hos": this.config.rapidAPIHost,
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
