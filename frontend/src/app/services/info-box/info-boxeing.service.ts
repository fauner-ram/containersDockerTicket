import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class InfoBoxeingService {

  public url = environment.url;

  constructor(private http: HttpClient) { }

  getWeightData() {
    return this.http.get(`${this.url}/weightData`);
  }

  getBoxDimensions() {
    return this.http.get(`${this.url}/box-dimensions`);
  }

  getPackMaterialType() {
    return this.http.get(`${this.url}/packMaterialType`);
  }

  getFreightChargeMethod() {
    return this.http.get(`${this.url}/freightChargeMethod`);
  }
  getDataUploads(id: any) {
    return this.http.get(`${this.url}/fileDataCompanies/${id}`);
  }
  getCompanyName(id: any) {
    return this.http.get(`${this.url}/companies/${id}`);
  }

  getDownloadExcelTemplateBoxKitFile(): Observable<Blob> {
    return this.http.get(`${this.url}/downloadTemplateBoxKitFile`, { responseType: 'blob' });
  }

  getDownloadExcelTemplateShipmentDataFile(): Observable<Blob> {
    return this.http.get(`${this.url}/downloadTemplateShipmentDataFile`, { responseType: 'blob' });
  }

  uploadExcelBoxKitData(data: any) {
    return this.http.post(`${this.url}/uploadBoxKitFile`, data, {
      responseType: 'blob'
    })
  }

  uploadExcelShipmentData(data: any) {
    return this.http.post(`${this.url}/uploadShipmentDataFile`, data, {
      responseType: 'blob'
    })
  }

  createCompany(data: any) {
    return this.http.post(`${this.url}/createCompany`, data)
  }
  createAttributeData(data: any) {
    return this.http.post(`${this.url}/createAttributeData`, data)
  }

  editCompany(data: any) {
    return this.http.post(`${this.url}/createCompany`, data)
  }

  // editBlobDocument(data: any) {
  //   return this.http.patch(`${this.url}/cost-center/project/document`, data,{
  //     responseType: 'blob'
  //  })
  // }

  // editProjectItemsQuotation(data: any) {
  //   return this.http.patch(`${this.url}/cost-center/project/item`, data)
  // }
  deleteFile(id: any, fileType: any) {
    // return this.http.delete(`${this.url}/file-company/${id}`, { params: { fileType } });
    return this.http.delete(`${this.url}/file-company/${id}?fileType=${fileType}`);
  }
}
