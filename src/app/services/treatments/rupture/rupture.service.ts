import { Injectable } from '@angular/core';
import { StorageManagerService } from '../../data-managers/storage/storage-manager.service';
import { HttpClient } from '@angular/common/http';
import { EnvironmentsService } from '../../environments.service';

@Injectable({
  providedIn: 'root'
})
export class RuptureService {

 
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
  addRupture = (data: any) => {
      const url = this._api_url.apiUrl + 'store_rupture';
      return this._http.post(url, data, this.getToken());
  }

  // edit
  editRupture = (slug: string) => {
      const url = this._api_url.apiUrl + 'edit_rupture/' + slug;

      return this._http.get(url, this.getToken());
  }

  // SHOW RUPTURE
  showRupture = (slug: string) => {
      const url = this._api_url.apiUrl + 'edit_rupture/' + slug;
      return this._http.get(url, this.getToken());
  }

  // updateRupture
  updateRupture= (slug: any, data: any) => {
      const url = this._api_url.apiUrl + 'update_rupture/' + slug;
      return this._http.post(url, data, this.getToken());
  }

  // deleteRupture
  deleteRupture = (slug: string) => {
      const url = this._api_url.apiUrl + 'destroy_rupture/' + slug;

      return this._http.get(url, this.getToken());
  }

  // get customer rupture
  getCustomerRupture = (employe_matricule: any) => {
      const url = this._api_url.apiUrl + 'consulted_rupturecontrats/' + employe_matricule;
      return this._http.get(url, this.getToken());
  }

  // get  rupture
  getRupture = (employe_matricule: any) => {
      const url = this._api_url.apiUrl + 'get_rupture/' + employe_matricule;
      return this._http.get(url, this.getToken());
  }

  // get all rupture
  getAllRupture = () => {
      const url = this._api_url.apiUrl + 'get_all_rupture';
      return this._http.get(url, this.getToken());
  }

    // approvedOrRejectedMission
    approvedOrRejectedRupture = (data: any) => {
        const url = this._api_url.apiUrl + 'approved_or_rejected_rupture';
        return this._http.post(url, data, this.getToken());
    } 

    // updateIsConsultingStatus
    updateIsConsultingStatus = (slug: string) => {
        const url = this._api_url.apiUrl + 'consulted_rupturecontrats/' + slug;
        return this._http.get(url, this.getToken());
    }

}
