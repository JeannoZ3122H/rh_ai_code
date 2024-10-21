import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material-module';
import { NgxPaginationModule } from 'ngx-pagination';
import { NotificationService } from '../../../services/notifications/notification.service';
import { LoadingService } from '../../../services/loadings/loading.service';
import { Router } from '@angular/router';
import { UserDataManagerService } from '../../../services/data-managers/user-data/user-data-manager.service';
import { MainTreatmentsService } from '../../../services/treatments/main-treatments.service';
import { CongeService } from '../../../services/treatments/conges/conge.service';
import { PermissionService } from '../../../services/treatments/permissions/permission.service';

@Component({
    selector: 'app-employees-welcome',
    standalone: true,
    imports: [CommonModule, MaterialModule, NgxPaginationModule],
    templateUrl: './employees-welcome.component.html',
    styleUrl: './employees-welcome.component.css',
})
export class EmployeesWelcomeComponent implements OnInit {

    public employe_matricule: string = '';
    public total_worked_hours: any;
    public list_pointage: any = [];
    public total_weeks_hours: any;
    public total_today_hours: any;
    public customer_conge_counter: number = 0;
    public customer_permission_counter: number = 0;



    public list_conges: any = [];
    public list_customer_conges: any = [];
    public conge_counter: number = 0;

    public list_permissions: any = [];
    public list_customer_permissions: any = [];
    public permission_counter: number = 0;

    public p: number = 1;

    // progress_bar_data;
    public progess_total_weeks_hours: any;
    public progress_total_today_hours: any;
    public progress_total_worked_hours: any;

    public new_date: Date = new Date();

    constructor(
        private _notificationService: NotificationService,
        private _traitements: MainTreatmentsService,
        private _loading: LoadingService,
        private _router: Router,
        private _userData: UserDataManagerService,
        private _permission: PermissionService,
        private _conge: CongeService,
    ){}


    ngOnInit(): void {
        this.employe_matricule = this._userData.getUserData().employe_matricule;


        this.getStatistiqueData();

        this.getCustomerAttendanceList();


    }

    formatTimeToHours(time: string): any {
        const [hour, minute] = time.split('h').map(Number);
        return hour;
    }

    getStatistiqueData()
    {

        this._loading.show_loading();
        this._traitements.getCustomersAttendanceStatistique(this.employe_matricule).subscribe({
            next: (response: any) => {

                //console.log(response)

                //return ;
                setTimeout(() => {
                    this.total_worked_hours = this.additionnerListeHeures(response.total_of_mounth)
                    this.total_weeks_hours = this.additionnerListeHeures(response.total_of_week)
                    this.total_today_hours = this.additionnerListeHeures(response.total_of_today)

                    //PROGRESS BAR DATA INIT
                    this.progess_total_weeks_hours = this.formatTimeToHours(this.total_weeks_hours);
                    this.progress_total_today_hours = this.formatTimeToHours(this.total_today_hours);
                    this.progress_total_worked_hours = this.formatTimeToHours(this.total_worked_hours);

                    //console.log(this.progess_total_weeks_hours)
                    this._loading.hide_loading();
                }, 1000);
            },
            error: (error: any) => {

                if (error.status == 401) {

                    this._notificationService.openSnackBarTokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');

                }
            }
        });
    }


    getCustomerAttendanceList() {

        this._loading.show_loading();
        this._traitements.getCustomersAttendance(this.employe_matricule).subscribe({

            next: (response: any) => {
                setTimeout(() => {
                    this.list_pointage = response
                    this._loading.hide_loading();
                }, 1000);
            },
            error: (error: any) => {

                if (error.status == 401) {

                    this._notificationService.openSnackBarTokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');

                }
            }
        });
    }



    additionnerListeHeures(heuresListe: string[]): string {

        if(heuresListe.length != 0){

            // Convertir toutes les heures en minutes
            const minutesTotales = heuresListe.reduce((totalMinutes, heure) => {
                const [heuresStr, minutesStr] = heure.split(':');
                const heuresEnMinutes = parseInt(heuresStr) * 60;
                const minutes = parseInt(minutesStr);
                return totalMinutes + heuresEnMinutes + minutes;
            }, 0);

            // Convertir le total des minutes en heures et minutes
            const heures = Math.floor(minutesTotales / 60);
            const minutes = minutesTotales % 60;

            // Formater le résultat
            const resultat = `${heures.toString().padStart(2, '0')}h:${minutes.toString().padStart(2, '0')}`;

            return resultat;


        }else{
            return "00h00"
        }
    }

    getCustomerCongesList() {

        this._loading.show_loading();
        this._conge.getCustomerConge(this.employe_matricule).subscribe({

            next: (response: any) => {
                setTimeout(() => {
                    console.log(response)
                    // customer conge
                    this.list_customer_conges = response;
                    this.customer_conge_counter = this.list_customer_conges.length;

                    this._loading.hide_loading();
                }, 1000);
            },
            error: (error: any) => {
                if (error.status == 401) {
                    this._notificationService.openSnackBarTokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');

                }
            }
        });
    }

    getCustomerPermissions() {

        this._loading.show_loading()
        this._permission.getCustomerPermission(this.employe_matricule).subscribe({

            next: (response: any) => {
                setTimeout(() => {
                    // console.log(response);
                    this.list_customer_permissions = response;
                    this.customer_permission_counter = this.list_customer_permissions.length;
                    this._loading.hide_loading()

                    // console.log(this.customer_permission_counter);
                }, 1000);
            //    console.log(response);
            },
            error: (error: any) => {

                if (error.status == 401) {

                    this._notificationService.openSnackBarTokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');

                }
            }


        });
    }
}
