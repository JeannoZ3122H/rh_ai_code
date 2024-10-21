import { Injectable } from '@angular/core';
import { StorageManagerService } from '../../data-managers/storage/storage-manager.service';
import { EnvironmentsService } from '../../environments.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class MissionService {
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


  // send data mission
  AddMissions = (data: any) => {
      const url = this._api_url.apiUrl + 'store_missions';
      return this._http.post(url, data, this.getToken());
  }

  // edit
  editMission = (slug: string) => {
      const url = this._api_url.apiUrl + 'edit_missions/' + slug;

      return this._http.get(url, this.getToken());
  }

  // SHOW MISSION
  showMission = (slug: string) => {
      const url = this._api_url.apiUrl + 'edit_missions/' + slug;

      return this._http.get(url, this.getToken());
  }

  // updateMission
  updateMission = (slug: any, data: any) => {
      const url = this._api_url.apiUrl + 'update_missions/' + slug;
      return this._http.post(url, data, this.getToken());
  }

  // deleteMission
  deleteMission = (slug: string) => {
      const url = this._api_url.apiUrl + 'destroy_missions/' + slug;

      return this._http.get(url, this.getToken());
  }



  // get customer Mission
  getCustomerMission = (employe_matricule: any) => {
      const url = this._api_url.apiUrl + 'customers_missions/' + employe_matricule;
      return this._http.get(url, this.getToken());
  }

  // get  Mission
  getMission = (employe_matricule: any) => {
      const url = this._api_url.apiUrl + 'get_missions/' + employe_matricule;
      return this._http.get(url, this.getToken());
  }


  // get all Mission
  getAllMission = () => {
      const url = this._api_url.apiUrl + 'get_all_mission';
      return this._http.get(url, this.getToken());
  }
  
  // approvedOrRejectedMission
  approvedOrRejectedMission = (data: any) => {
      const url = this._api_url.apiUrl + 'approved_or_rejected_missions';
      return this._http.post(url, data, this.getToken());
  } 

  // updateIsConsultingStatus
  updateIsConsultingStatus = (slug: string) => {
      const url = this._api_url.apiUrl + 'consulted_missions/' + slug;
      return this._http.get(url, this.getToken());
  }
}
