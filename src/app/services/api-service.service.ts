import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, retry } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {
  
  httpOptions = {
    headers: new HttpHeaders({
    accept: 'application/json'
    })
  }
  constructor(private http : HttpClient) { }

  getFeriadosAnno() : Observable<any>{
    return this.http.get('https://api.boostr.cl/holidays.json').pipe(
      retry(3)
    );
  }
}
