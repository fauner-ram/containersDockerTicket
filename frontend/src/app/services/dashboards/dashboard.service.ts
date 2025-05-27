import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  public url = environment.url;

  constructor(private http: HttpClient) { }

  getCompaniesData(query: any) {
    return this.http.get(`${this.url}/companies${query}`);
  }
  getNewCompaniesData(params: { page: number, limit: number }): Observable<any> {
    return this.http.get<any>(`${this.url}/newCompanies`, { params });
  }
  getOlderCompaniesData(query: any) {
    return this.http.get(`${this.url}/olderCompanies${query}`);
  }

}
