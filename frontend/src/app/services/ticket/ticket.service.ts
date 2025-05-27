import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TicketService {

  public url = environment.url;

  constructor(private http: HttpClient) { }

  getticketData() {
    return this.http.get(`${this.url}/ticketData`);
  }

  createTicket(data: any) {
    return this.http.post(`${this.url}/createTicket`, data)
  }

  updateTicket(data: any) {
    return this.http.post(`${this.url}/updateTicket`, data)
  }

  deleteFile(data: any) {
    // return this.http.delete(`${this.url}/file-company/${id}`, { params: { fileType } });
    return this.http.delete(`${this.url}/updateTicket`,data);
  }
}
