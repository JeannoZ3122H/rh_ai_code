import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material-module';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TransformDatePipe } from '../../../customer-pipe/transform-date.pipe';
import { NotificationService } from '../../../services/notifications/notification.service';
import { MainTreatmentsService } from '../../../services/treatments/main-treatments.service';
import { LoadingService } from '../../../services/loadings/loading.service';
import { CongeService } from '../../../services/treatments/conges/conge.service';
import { PermissionService } from '../../../services/treatments/permissions/permission.service';
import { UserDataManagerService } from '../../../services/data-managers/user-data/user-data-manager.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import moment from 'moment';
import { AngularEditorModule, AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
    selector: 'app-full-demandes-forms',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        FormsModule,
        TransformDatePipe,
        NgxSpinnerModule,
        NgxMatTimepickerModule,
        NgxSpinnerModule, 
        MaterialModule, 
        FormsModule, 
        ReactiveFormsModule, 
        AngularEditorModule

    ],
    templateUrl: './full-demandes-forms.component.html',
    styleUrl: './full-demandes-forms.component.css',
})
export class FullDemandesFormsComponent implements OnInit {

    config: AngularEditorConfig = {
        editable: true,
        spellcheck: true,
        height: '10rem',
        minHeight: '20rem',
        placeholder: "Le motif du congés",
        translate: 'no',
        defaultParagraphSeparator: 'p',
        defaultFontName: 'Arial',
        toolbarHiddenButtons: [
          ['bold']
          ],

          fonts: [
            {class: 'arial', name: 'Arial'},
            {class: 'times-new-roman', name: 'Times New Roman'},
            {class: 'calibri', name: 'Calibri'},
            {class: 'comic-sans-ms', name: 'Comic Sans MS'}
          ],

        customClasses: [
          {
            name: "quote",
            class: "quote",
          },
          {
            name: 'redText',
            class: 'redText'
          },
          {
            name: "titleText",
            class: "titleText",
            tag: "h1",
          },
        ]
      };

    public is_switching_assigment: boolean = true;
    public is_switching_leave: boolean = false;
    public switcher_is_active: boolean = true;

    public employe_matricule: string = '';

    public motif: string = '';
    public type_conge: string = '';
    public objet_demande: string = '';

    public is_choose: string = '';

    public list_responsable: any = [];

    public list_type_conge: any = [];

    public date_depart = moment();
    public date_retour = moment();


    public duration_is_hour: boolean = false
    public hour_start: any ;
    public hour_end: any ;

    public date_permission: Date = new Date();

    public duration_is_date: boolean = false;
    public date_start = moment();
    public date_end = moment();


    public type_duration: string = "";

    public responsable: string = '';

    public assigment_file!: File;

    constructor(
        private _notificationService: NotificationService,
        private _traitement: MainTreatmentsService,
        private _router: Router,
        private _loading: LoadingService,
        private _userData: UserDataManagerService,
        private _conge: CongeService,
        private _permission: PermissionService,
    ){}



    ngOnInit(): void {


        this.employe_matricule = this._userData.getUserData().employe_matricule;

        // console.log(this.employe_matricule);

        this.getTypeCongeList();
        this.getAllResponsable();
    }

    uploadFile(e: any) {
        this.assigment_file = e.target.files[0];
    }

    radioChange(event: any) {
        this.is_choose = event.value;
    }

    PermissionDurationChange(event: any)
    {
        let res = event.value;

        if(res === 'hour'){
            this.duration_is_hour = true;
            this.duration_is_date = false;
            this.type_duration = res;
        }else if(res === 'date'){
            this.duration_is_date = true;
            this.duration_is_hour = false;
            this.type_duration = res;
        }else{
            this.duration_is_date = false;
            this.duration_is_hour = false;
        }
    }


    switchAction(data: string) {
        if (data == "assigments") {
            this.is_switching_assigment = true;
            this.is_switching_leave = false;
            this.switcher_is_active = true;
        }

        if (data == "leave") {
            this.is_switching_leave = true;
            this.is_switching_assigment = false;
            this.switcher_is_active = false;
        }
    }



    onChangeTypeConge(event: any) {
        this.type_conge = event.value

        this.objet_demande = "DEMANDE DE CONGES " + " " + this.type_conge
    }

    onChangeDestinataire(event: any) {
        this.responsable = event.value
    }

    getTypeCongeList() {

        this._traitement.getTypeConge().subscribe({

            next: (response: any) => {
                this.list_type_conge = response
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


    getAllResponsable() {

        this._traitement.getAllResponsable().subscribe({

            next: (response: any) => {
                this.list_responsable = response;
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


    savePermission() {
        this._loading.show_loading();

        // console.log(this.date_start, this.date_end);


        let duree_jour = this.calculateDifferenceBetweenDates(this.date_start, this.date_end);
        let duree_heure = this.calculateDifferenceBetweenTwoHours(this.hour_start, this.hour_end);
        
        //console.log(duree_jour);
        //this._loading.hide_loading();
        //return;
        const formData: FormData = new FormData();
        formData.append("employe_matricule", this.employe_matricule);
        formData.append("type_duration", this.type_duration);
        formData.append("destinataire", this.responsable);
        formData.append("date_permission", this.formatDate(this.date_permission).toString());

        if(duree_heure == undefined)
            {formData.append("duree_permission", duree_jour);}
        else
        {
            formData.append("duree_permission", duree_heure);}
            //return

        if (duree_heure == undefined) {
            formData.append("permission_end", this.formatDate(this.date_end).toString());
            formData.append("permission_start", this.formatDate(this.date_start).toString());

        } else if (duree_jour == undefined) {
            formData.append("permission_end", this.hour_end);
            formData.append("permission_start", this.hour_start);
        }

        formData.append("motif", this.motif);
        formData.append("permission_file", this.assigment_file == undefined ? "" : this.assigment_file);

        this._permission.demandePermissions(formData).subscribe({

            next: (response: any) => {
                // console.log(response)
                if (response.code == 200) {
                    this._notificationService.openSnackBarSuccess(response);
                    setTimeout(() => {
                        this._loading.hide_loading();
                        // this._router.navigateByUrl('/ch.permissions');
                    }, 2000);
                } else if (response.code == 300 || response.code == 500 || response.code == 302) {
                    this._loading.hide_loading();
                    this._notificationService.openSnackBarError(response);
                }
            },
            error: (error: any) => {
                if (error.status == 401) {
                    this._notificationService.openSnackBarTokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');

                }
            }


        })
    }


    formatDate(date: any)
    {
        let year = date.toLocaleString("default", { year: "numeric" });
        let month = date.toLocaleString("default", { month: "2-digit" });
        let day = date.toLocaleString("default", { day: "2-digit" });

        return year + "-" + month + "-" + day;
    }

    saveConge() {
        this._loading.show_loading();

        console.log(this.date_depart);
        let duree_jour = this.calculateDifferenceBetweenDates(this.date_depart, this.date_retour);


        //return
        const data = {
            date_depart: this.formatDate(this.date_depart).toString() ,
            date_retour: this.formatDate(this.date_retour).toString() ,
            type_conge: this.type_conge,
            destinataire: this.responsable,
            objet_demande: this.objet_demande,
            duree_conge: duree_jour,
            motif: this.motif,
            employe_matricule: this.employe_matricule
        }

        this._conge.saveDemandeConge(data).subscribe({
            next: (response: any) => {
                if (response.code == 200) {
                    this._notificationService.openSnackBarSuccess(response);
                    setTimeout(() => {
                        this._loading.hide_loading();
                        // this._router.navigateByUrl('/ch.conges');
                        
                    }, 1000);
                } else if (response.code == 300 || response.code == 500 || response.code == 302) {
                    this._loading.hide_loading();
                    this._notificationService.openSnackBarError(response);
                }
            },
            error: (error: any) => {
                if (error.status == 401) {
                    this._notificationService.openSnackBarTokenExpired();
                    localStorage.clear();
                    this._router.navigateByUrl('/');

                }
            },
        });
    }


    // CALCULATE HOUR DURATION

    calculateDifferenceBetweenTwoHours(heure1: any, heure2: any) {

        if(heure1 != undefined && heure2 != undefined){
            let [heure1Heures, heure1Minutes] = heure1.split(':').map(Number);
            let [heure2Heures, heure2Minutes] = heure2.split(':').map(Number);

            // Calculer la différence en minutes
            let differenceEnMinutes = (heure2Heures * 60 + heure2Minutes) - (heure1Heures * 60 + heure1Minutes);

            // Calculer les heures et les minutes finales
            let heures = Math.floor(differenceEnMinutes / 60);
            let minutes = differenceEnMinutes % 60;

            return heures+'h'+ (minutes == 0?'00':minutes) ;
        }else {
            return undefined;
        }
        // Convertir les heures en minutes
    }

    // CALCULATE DATE DURATION
    calculateDifferenceBetweenDates(date1: any, date2: any): any {

        if(date1 != undefined && date2 != undefined) {
            let differenceEnJours = date2.diff(date1, 'days');

            return differenceEnJours + 'Jour(s)';
        } else {
            return undefined;
        }
    }
}
