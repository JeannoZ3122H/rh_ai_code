import { Injectable } from '@angular/core';
import { EnvironmentsService } from '../environments.service';
import { HttpClient } from '@angular/common/http';
import { StorageManagerService } from '../data-managers/storage/storage-manager.service';

@Injectable({
    providedIn: 'root',
})
export class MainTreatmentsService {


    public headers: any;
    constructor(
        private _api_url: EnvironmentsService,
        private _http: HttpClient,
        private _localStorage: StorageManagerService
    ) {

    }

    getToken = () => {
        const tokens = this._localStorage.getTokenToStorage();
        this. headers = { headers: { 'Authorization': 'Bearer ' + tokens }};

        return this.headers;
    }

    /**
     *
     * @param data
     * @returns
     */

    // FONCTION

    saveFonction = (data: any) => {
        const url = this._api_url.apiUrl + 'store_fonctions';
        return this._http.post(url, data, this.getToken());
    }
    getFonction = () => {
        const url = this._api_url.apiUrl + 'get_fonctions';
        return this._http.get(url,this.getToken());
    }

    updateFonction = (data: any ,id: any) => {
        const url = this._api_url.apiUrl + 'update_fonctions/' + id;
        return this._http.post(url, data, this.getToken());
    }

    destroyFonction = (slug: string) => {
        const url = this._api_url.apiUrl + 'destroy_fonctions/' + slug;
        return this._http.get(url, this.getToken());
    }

    //END FONCTION


    // SERVICES

    saveService = (data: any) => {
        const url = this._api_url.apiUrl + 'store_services';
        return this._http.post(url, data, this.getToken());
    }
    getService = () => {
        const url = this._api_url.apiUrl + 'get_services';
        return this._http.get(url,this.getToken());
    }

    updateService = (data: any ,slug: string) => {
        const url = this._api_url.apiUrl + 'update_services/' + slug;
        return this._http.post(url, data, this.getToken());
    }

    destroyService = (slug: string) => {
        const url = this._api_url.apiUrl + 'destroy_services/' + slug;
        return this._http.get(url, this.getToken());
    }

    //END SERVICES


    // BUREAU

    saveBureau = (data: any) => {
        const url = this._api_url.apiUrl + 'store_bureau';
        return this._http.post(url, data, this.getToken());
    }
    getBureau = () => {
        const url = this._api_url.apiUrl + 'get_bureau';
        return this._http.get(url,this.getToken());
    }

    updateBureau = (data: any ,slug: string) => {
        const url = this._api_url.apiUrl + 'update_bureau/' + slug;
        return this._http.post(url, data, this.getToken());
    }

    destroyBureau = (slug: string) => {
        const url = this._api_url.apiUrl + 'destroy_bureau/' + slug;
        return this._http.get(url, this.getToken());
    }

    //END BUREAU

    // DOCUMENT PROVIDERS

    saveDocProvide = (data: any) => {
        const url = this._api_url.apiUrl + 'store_docprovide';
        return this._http.post(url, data, this.getToken());
    }
    getDocProvide = () => {
        const url = this._api_url.apiUrl + 'get_docprovide';
        return this._http.get(url,this.getToken());
    }

    updateDocProvide = (data: any ,slug: string) => {
        const url = this._api_url.apiUrl + 'update_docprovide/' + slug;
        return this._http.post(url, data, this.getToken());
    }

    destroyDocProvide = (slug: string) => {
        const url = this._api_url.apiUrl + 'destroy_docprovide/' + slug;
        return this._http.get(url, this.getToken());
    }

    //END DOCUMENT PROVIDERS



    // TYPE CONGES

    saveTypeConge = (data: any) => {
        const url = this._api_url.apiUrl + 'store_type_conge';
        return this._http.post(url, data, this.getToken());
    }
    getTypeConge = () => {
        const url = this._api_url.apiUrl + 'get_type_conge';
        return this._http.get(url,this.getToken());
    }

    updateTypeConge = (data: any ,slug: string) => {
        const url = this._api_url.apiUrl + 'update_type_conge/' + slug;
        return this._http.post(url, data, this.getToken());
    }

    destroyTypeConge = (slug: string) => {
        const url = this._api_url.apiUrl + 'destroy_type_conge/' + slug;
        return this._http.get(url, this.getToken());
    }

    //END TYPE CONGES



    // RESPONSABLE AGENTS

    saveResponsableAgents = (data: any) => {

        //console.log(data);
        const url = this._api_url.apiUrl + 'store_responsable_agents';
        return this._http.post(url, data, this.getToken());
    }
    getResponsableAgents = () => {
        const url = this._api_url.apiUrl + 'get_responsable_agents';
        return this._http.get(url,this.getToken());
    }

    getAllResponsable = () => {
        const url = this._api_url.apiUrl + 'get_all_responsable';
        return this._http.get(url,this.getToken());
    }

    updateResponsableAgents = (data: any ,slug: string) => {
        const url = this._api_url.apiUrl + 'update_responsable_agents/' + slug;
        return this._http.post(url, data, this.getToken());
    }

    destroyResponsableAgents = (slug: string) => {
        const url = this._api_url.apiUrl + 'destroy_responsable_agents/' + slug;
        return this._http.get(url, this.getToken());
    }

    //END RESPONSABLE AGENTS



    // CONTRATS

    saveContrats = (data: any) => {
        const url = this._api_url.apiUrl + 'store_contrats';
        return this._http.post(url, data, this.getToken());
    }
    getContrats = () => {
        const url = this._api_url.apiUrl + 'get_contrats';
        return this._http.get(url,this.getToken());
    }

    updateContrats = (data: any ,slug: string) => {
        const url = this._api_url.apiUrl + 'update_contrats/' + slug;
        return this._http.post(url, data, this.getToken());
    }

    destroyContrats = (slug: string) => {
        const url = this._api_url.apiUrl + 'destroy_contrats/' + slug;
        return this._http.get(url, this.getToken());
    }

    //END CONTRATS


    // GET CUSTOMER CODE

    getCodeAuthorization = (type_accounts: string) => {
        const url = this._api_url.apiUrl + 'get_code_authorization/' + type_accounts;
        return this._http.get(url,this.getToken());
    }

    refreshCodeAuthorization = (slug: string) => {
        const url = this._api_url.apiUrl + 'refresh_code_authorization/' + slug;
        return this._http.get(url,this.getToken());
    }

    checkCodeAuthorization = (data: any) => {
        const url = this._api_url.apiUrl + 'check_code_authorization';
        return this._http.post(url, data, this.getToken());
    }


    // POINTAGES

    savePointage = (data: any) => {
        const url = this._api_url.apiUrl + 'store_pointage';
        return this._http.post(url, data, this.getToken());
    }
    getPointage = () => {
        const url = this._api_url.apiUrl + 'get_pointage';
        return this._http.get(url,this.getToken());
    }
    getCustomersAttendance = (employe_matricule: string) => {

        //console.log(this.getToken())
        const url = this._api_url.apiUrl + 'get_customer_attendance/' + employe_matricule ;
        return this._http.get(url,this.getToken());
    }

    getCustomersAttendanceStatistique = (employe_matricule: string) => {

        //console.log(this.getToken())
        const url = this._api_url.apiUrl + 'get_customer_attendance_statistique/' + employe_matricule ;
        return this._http.get(url,this.getToken());
    }

    getCurrentPointage = () => {
        const url = this._api_url.apiUrl + 'get_current_pointage';
        return this._http.get(url,this.getToken());
    }

    updatePointage = (data: any ,slug: string) => {
        const url = this._api_url.apiUrl + 'update_pointage/' + slug;
        return this._http.post(url, data, this.getToken());
    }

    destroyPointage = (slug: string) => {
        const url = this._api_url.apiUrl + 'destroy_pointage/' + slug;
        return this._http.get(url, this.getToken());
    }

    //END POINTAGES

    // POINTAGES CONFIG

    savePointageConfig = (data: any) => {
        const url = this._api_url.apiUrl + 'store_pointage_config';
        return this._http.post(url, data, this.getToken());
    }
    getPointageConfig = () => {
        const url = this._api_url.apiUrl + 'get_pointage_config';
        return this._http.get(url,this.getToken());
    }

    updatePointageConfig = (data: any ,slug: string) => {
        const url = this._api_url.apiUrl + 'update_pointage_config/' + slug;
        return this._http.post(url, data, this.getToken());
    }

    destroyPointageConfig = (slug: string) => {
        const url = this._api_url.apiUrl + 'destroy_pointage_config/' + slug;
        return this._http.get(url, this.getToken());
    }

    //END POINTAGES CONFIG







    // MANAGE ACCOUNT

    /**
        ============================ CREATE ADMIN ACCOUNTS ===========================
    */
    saveUsers = (data: any) => {
        const url = this._api_url.apiUrl + 'store_admin';
        return this._http.post(url, data, this.getToken());
    }

    updateUsers = (data: any, slug: string) => {
        const url = this._api_url.apiUrl + 'update_admin/' + slug;
        return this._http.post(url, data, this.getToken());
    }
    deleteUsers = (slug: string) => {
        const url = this._api_url.apiUrl + 'delete_admin/' + slug;
        return this._http.get(url,this.getToken());
    }
    getUsers = () => {
        const url = this._api_url.apiUrl + 'get_admin';
        return this._http.get(url,this.getToken());
    }

    statutAction = (slug: string) => {
        const url = this._api_url.apiUrl + 'enable_or_disable_admin_account/' + slug ;
        return this._http.get(url, this.getToken());
    }
    /**
        ============================ END CREATE ADMIN ACCOUNTS ===========================
    */


    /**
        ===================================== CREATE  EMPLOYE ACCOUNTS ========================
    */
    createEmployeAccount = (data: any) => {
        const url = this._api_url.apiUrl + 'store_employee_accounts';
        return this._http.post(url, data, this.getToken());
    }

    updateEmployeAccount = (data: any, slug: string) => {
        const url = this._api_url.apiUrl + 'update_employee_accounts/' + slug;
        return this._http.post(url, data, this.getToken());
    }
    deleteEmployeAccount = (slug: string) => {
        const url = this._api_url.apiUrl + 'delete_employee_accounts/' + slug;
        return this._http.get(url,this.getToken());
    }
    getEmployeAccount = () => {
        const url = this._api_url.apiUrl + 'get_employee_accounts';
        return this._http.get(url,this.getToken());
    }


    enableOrDisableEmployeAccount = (slug: string) => {
        const url = this._api_url.apiUrl + 'enable_or_disable_employee_accounts_account/' + slug ;
        return this._http.get(url, this.getToken());
    }

    changeEmployeeTypeAccount = (type_account: string,slug: string) => {
        const url = this._api_url.apiUrl + 'change_employee_type_account/' + type_account +'/'+ slug ;
        return this._http.get(url, this.getToken());
    }


    /**
        ===================================== CREATE  EMPLOYE ACCOUNTS ========================
    */

    // ADD ROLE 💚
    saveRole = (data: any) => {
        const url = this._api_url.apiUrl + 'store_role';
        return this._http.post(url, data,this.getToken());
    }
    updateRole = (data: any, slug: string) => {
        const url = this._api_url.apiUrl + 'update_role/'+slug;
        return this._http.post(url, data,this.getToken());
    }
    destroyRole = (slug: string) => {
        const url = this._api_url.apiUrl + 'destroy_role/'+slug;
        return this._http.get(url,this.getToken());
    }

    getRoles = () => {
        const url = this._api_url.apiUrl + 'get_role';
        return this._http.get(url,this.getToken());
    }
    // END ROLE


    // ADD TYPE ACCOUNTS 💚
    saveTypeAccounts = (data: any) => {
        const url = this._api_url.apiUrl + 'store_type_accounts';
        return this._http.post(url, data,this.getToken());
    }
    updateTypeAccounts = (data: any, slug: string) => {
        const url = this._api_url.apiUrl + 'update_type_accounts/'+slug;
        return this._http.post(url, data,this.getToken());
    }
    destroyTypeAccounts = (slug: string) => {
        const url = this._api_url.apiUrl + 'destroy_type_accounts/'+slug;
        return this._http.get(url,this.getToken());
    }

    getTypeAccounts = () => {
        const url = this._api_url.apiUrl + 'get_type_accounts';
        return this._http.get(url,this.getToken());
    }
    // END ROLE






    getStatistiqueData = () => {
        const url = this._api_url.apiUrl + 'get_current_statistique';
        return this._http.get(url);
    }


    logOut = (id: number) => {
        const url = this._api_url.apiUrl+'logout_users/'+id;

        //console.log(this.getToken())
        return this._http.get(url,this.getToken());
    }




    // ADD PRODUCTS
    saveProducts = (data: any) => {
        const url = this._api_url.apiUrl + 'store_products';
        return this._http.post(url, data,this.getToken());
    }
    updateProducts = (data: any, slug: string) => {
        const url = this._api_url.apiUrl + 'update_products/'+slug;
        return this._http.post(url, data, this.getToken());
    }
    deleteProducts = (slug: string) => {
        const url = this._api_url.apiUrl + 'destroy_products/'+slug;
        return this._http.get(url,this.getToken());
    }
    getProducts = () => {
        const url = this._api_url.apiUrl + 'get_products';
        return this._http.get(url,this.getToken());
    }


    // CATEGORIE PROFESSIONNELLE 💚

    saveCategorieProfessionnelle = (data: any) => {
        const url = this._api_url.apiUrl + 'store_categorie_pro';
        return this._http.post(url, data,this.getToken());
    }

    updateCategorieProfessionnelle = (data: any, slug: string) => {
        const url = this._api_url.apiUrl + 'update_categorie_pro/'+slug;
        return this._http.post(url, data,this.getToken());
    }
    deleteCategorieProfessionnelle = (slug: string) => {
        const url = this._api_url.apiUrl + 'destroy_categorie_pro/'+slug;
        return this._http.get(url,this.getToken());
    }
    getCategorieProfessionnelle = () => {
        const url = this._api_url.apiUrl + 'get_categorie_pro';
        return this._http.get(url,this.getToken());
    }



    // ================********************** START EMPLOYE INFORMATION *******************========================

    // ADD EMPLOYE INFO 💚
    saveEmployes = (data: any) => {
        const url = this._api_url.apiUrl + 'store_employees';
        return this._http.post(url, data,this.getToken());
    }

    updateEmployes = (data: any, slug: string) => {
        const url = this._api_url.apiUrl + 'update_employe/'+slug;
        return this._http.post(url, data,this.getToken());
    }

    enableOrDisableIsResponsible = (employee_matricule: string) => {
        const url = this._api_url.apiUrl + 'enable_or_disable_is_responsible/'+employee_matricule;
        return this._http.get(url, this.getToken());
    }

    enableOrDisableIsAgents = (employee_matricule: string) => {
        const url = this._api_url.apiUrl + 'enable_or_disable_is_agents/'+employee_matricule;
        return this._http.get(url, this.getToken());
    }

    filterByService = (service: string) => {
        const url = this._api_url.apiUrl + 'filter_on_employe_with_service/'+service;
        return this._http.get(url, this.getToken());
    }

    filterByQuery = (query: string) => {
        const url = this._api_url.apiUrl + 'filter_on_employe_with_query/'+query;
        return this._http.get(url, this.getToken());
    }


    filterByStatus = (status: string) => {
        const url = this._api_url.apiUrl + 'filter_on_employe_with_status/'+status;
        return this._http.get(url, this.getToken());
    }

    deleteEmployes = (slug: string) => {
        const url = this._api_url.apiUrl + 'destroy_employe/' + slug;
        return this._http.get(url,this.getToken());
    }

    getEmployes = () => {
        const url = this._api_url.apiUrl + 'get_employe';
        return this._http.get(url,this.getToken());
    }


    getEmployeeWhereIsresponsibleAndIsAgentEqualZero = () => {
        const url = this._api_url.apiUrl + 'get_employee_where_is_responsible_and_is_agent_equal_zero';
        return this._http.get(url,this.getToken());
    }


    getEmployeProfilInfo = (employe_matricule: string) => {
        const url = this._api_url.apiUrl + 'get_employe_info/' + employe_matricule;
        return this._http.get(url,this.getToken());
    }


    getEmployeInfoWithStatusZero = () => {
        const url = this._api_url.apiUrl + 'get_employe_info_with_status_0';
        return this._http.get(url,this.getToken());
    }

    showEmployes = (slug: string) => {
        const url = this._api_url.apiUrl + 'show_employe/' + slug;
        return this._http.get(url,this.getToken());
    }


    // ================********************** END EMPLOYE INFORMATION *******************========================

    // =================********************** EMPLOYE CONTRAT *******************========================

    // ADD EMPLOYE CONTRATS 💚
    saveEmployeContrats = (data: any) => {
        const url = this._api_url.apiUrl + 'store_employe_contrats';
        return this._http.post(url, data,this.getToken());
    }
    // UPDATE EMPLOYE CONTRATS
    updateEmployeContrats = (data: any, employee_matricule: string) => {
        const url = this._api_url.apiUrl + 'update_employe_contrats/'+employee_matricule;
        return this._http.post(url, data,this.getToken());
    }

    // END EMPLOYE



    // ADD DOSSIERS 💚
    saveDossiers = (data: any) => {
        const url = this._api_url.apiUrl + 'store_dossiers';
        return this._http.post(url, data,this.getToken());
    }
    updateDossiers = (data: any, slug: string) => {
        const url = this._api_url.apiUrl + 'update_dossiers/'+slug;
        return this._http.post(url, data,this.getToken());
    }
    deleteDossiers = (slug: string) => {
        const url = this._api_url.apiUrl + 'destroy_dossiers/'+slug;
        return this._http.get(url,this.getToken());
    }

    getDossiers = () => {
        const url = this._api_url.apiUrl + 'get_dossiers';
        return this._http.get(url,this.getToken());
    }

    getCustomerDossiers = (employe_matricule: string) => {
        const url = this._api_url.apiUrl + 'customers_dossiers/' + employe_matricule;
        return this._http.get(url,this.getToken());
    }

    getCustomerFoldersFile = (foder_code: string) => {
        const url = this._api_url.apiUrl + 'get_customers_documents/'+foder_code;
        return this._http.get(url,this.getToken());
    }


    ShowFoldersFile = (foder_code: string) => {
        const url = this._api_url.apiUrl + 'get_show_dossiers/'+foder_code;
        return this._http.get(url,this.getToken());
    }


    // ADD DOSSIERS FILE 💚
    saveDossiersFile = (data: any) => {
        const url = this._api_url.apiUrl + 'store_dossiers_file';
        return this._http.post(url, data,this.getToken());
    }
    updateDossiersFile = (data: any, slug: string) => {
        const url = this._api_url.apiUrl + 'update_dossiers_file/'+slug;
        return this._http.post(url, data,this.getToken());
    }
    deleteDossiersFile = (slug: string) => {
        const url = this._api_url.apiUrl + 'destroy_dossiers_file/'+slug;
        return this._http.get(url,this.getToken());
    }

    sendNotification(data: any)
    {
        const url = this._api_url.apiUrl + 'send_notify';
        return this._http.post(url, data,this.getToken());
    }




    checkCustomerProduct = (sale_ref: string) => {
        //console.log(data);
        const url = this._api_url.apiUrl + 'check_customer_product/' + sale_ref;
        return this._http.get(url,this.getToken());
    }

    destroySale = (slug: any) => {
        //console.log(data);
        const url = this._api_url.apiUrl + 'destroy_sale/' + slug;
        return this._http.get(url,this.getToken());
    }


    // ========================== COURRIER MANAGMENTS ========================

    /** COURRIER RECEIVE */

    saveCourrier = (data: any) => {
        const url = this._api_url.apiUrl + 'store_courrier';
        return this._http.post(url, data, this.getToken());
    }
    getCourrier = () => {
        const url = this._api_url.apiUrl + 'get_courrier';
        return this._http.get(url,this.getToken());
    }

    getManagerCourrierList = (employee_matricule: string) => {
        const url = this._api_url.apiUrl + 'get_courrier_impted_by_employee/' + employee_matricule;
        return this._http.get(url,this.getToken());
    }

    updateCourrier = (data: any ,slug: any) => {
        const url = this._api_url.apiUrl + 'update_courrier/' + slug;
        return this._http.post(url, data, this.getToken());
    }


    destroyCourrier = (slug: string) => {
        const url = this._api_url.apiUrl + 'destroy_courrier/' + slug;
        return this._http.get(url, this.getToken());
    }

    filterOnCourrier = (query: string) => {
        const url = this._api_url.apiUrl + 'filter_on_courrier/'+query;
        return this._http.get(url, this.getToken());
    }

    /**END COURRIER RECEIVE */

    /** COURRIER SEND*/


    saveSendCourrier = (data: any) => {
        const url = this._api_url.apiUrl + 'store_send_courrier';
        return this._http.post(url, data, this.getToken());
    }
    getSendCourrier = () => {
        const url = this._api_url.apiUrl + 'get_send_courrier';
        return this._http.get(url,this.getToken());
    }


    updateSendCourrier = (data: any ,slug: string) => {
        const url = this._api_url.apiUrl + 'update_send_courrier/' + slug;
        return this._http.post(url, data, this.getToken());
    }


    destroySendCourrier = (slug: string) => {
        const url = this._api_url.apiUrl + 'destroy_send_courrier/' + slug;
        return this._http.get(url, this.getToken());
    }


    filterOnSendCourrier = (query: string) => {
        const url = this._api_url.apiUrl + 'filter_on_send_courrier/'+query;
        return this._http.get(url, this.getToken());
    }

    /** END COURRIER SEND*/



    //END COURRIER MANAGMENTS


    // LIST RESPONSABLE DE SERVICE

    getResponsableServiceList = () => {
        const url = this._api_url.apiUrl + 'get_responsable_service';
        return this._http.get(url,this.getToken());
    }

    // IMPUTED COURRIER TO RESPONSABLE

    saveCourrierImputedData = (data: any) => {
        const url = this._api_url.apiUrl + 'store_imputed_courrier_to_responsable_service_data';
        return this._http.post(url, data, this.getToken());
    }

    getCourrierImputed = () => {
        const url = this._api_url.apiUrl + 'get_courrier_imputed';
        return this._http.get(url,this.getToken());
    }


    updateCourrierImputedData = (data: any ,slug: any) => {
        const url = this._api_url.apiUrl + 'update_imputed_courrier_to_responsable_service_data/' + slug;
        return this._http.post(url, data, this.getToken());
    }


    // STATISTIQUE

    getAdminStatistique = () => {
        const url = this._api_url.apiUrl + 'get_admin_statistique';
        return this._http.get(url,this.getToken());
    }

    getRhStatistique = () => {
        const url = this._api_url.apiUrl + 'get_rh_statistique';
        return this._http.get(url,this.getToken());
    }

    getRhAttendanceStatistique = () => {
        const url = this._api_url.apiUrl + 'get_attendance_statistique';
        return this._http.get(url,this.getToken());
    }


    getAdminCourrierManagerStatistique = () => {
        const url = this._api_url.apiUrl + 'get_admin_courriers_statistique';
        return this._http.get(url,this.getToken());
    }
}
