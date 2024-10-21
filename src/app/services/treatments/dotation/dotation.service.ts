import { Injectable } from '@angular/core';
import { StorageManagerService } from '../../data-managers/storage/storage-manager.service';
import { HttpClient } from '@angular/common/http';
import { EnvironmentsService } from '../../environments.service';

@Injectable({
  providedIn: 'root'
})
export class DotationService {

 
  public headers: any;

  constructor(
      private _localStorage: StorageManagerService,
      private _api_url: EnvironmentsService,
      private _http: HttpClient,
  ) { }

  getToken = () => {
      const tokens = this._localStorage.getTokenToStorage();
      this. headers = { headers: { 'Authorization': 'Bearer ' + tokens }};

      return this.headers;
  }


  // send data conges
  addDotation = (data: any) => {
      const url = this._api_url.apiUrl + 'store_dotation';
      return this._http.post(url, data, this.getToken());
  }

  // edit
  editDotation = (slug: string) => {
      const url = this._api_url.apiUrl + 'edit_dotation/' + slug;

      return this._http.get(url, this.getToken());
  }

  // SHOW dotation
  showDotation = (slug: string) => {
      const url = this._api_url.apiUrl + 'edit_dotation/' + slug;
      return this._http.get(url, this.getToken());
  }

  // updateDotation
  updateDotation= (slug: any, data: any) => {
      const url = this._api_url.apiUrl + 'update_dotation/' + slug;
      return this._http.post(url, data, this.getToken());
  }

  // deleteDotation
  deleteDotation = (slug: string) => {
      const url = this._api_url.apiUrl + 'destroy_dotation/' + slug;

      return this._http.get(url, this.getToken());
  }

  // get customer dotation
  getCustomerDotation = (employe_matricule: any) => {
      const url = this._api_url.apiUrl + 'customers_dotation/' + employe_matricule;
      return this._http.get(url, this.getToken());
  }

  // get  dotation
  getDotation = (employe_matricule: any) => {
      const url = this._api_url.apiUrl + 'get_dotation/' + employe_matricule;
      return this._http.get(url, this.getToken());
  }

  // get all dotation
  getAllDotation = () => {
      const url = this._api_url.apiUrl + 'get_all_dotation';
      return this._http.get(url, this.getToken());
  }
}
