import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../material-module';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TransformDatePipe } from '../../customer-pipe/transform-date.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NgxPaginationModule } from 'ngx-pagination';
import { NotificationService } from '../../services/notifications/notification.service';
import { MainTreatmentsService } from '../../services/treatments/main-treatments.service';
import { LoadingService } from '../../services/loadings/loading.service';
import { UserDataManagerService } from '../../services/data-managers/user-data/user-data-manager.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../actions/delete/delete.component';
import { EmployeesFoldersDialogComponent } from '../../dialogs/employees-dialogs/employees-folders-dialog/employees-folders-dialog.component';
import { EmployeesFoldersFileComponent } from '../../dialogs/employees-dialogs/employees-folders-file-dialog/employees-folders-file.component';

@Component({
    selector: 'app-customer-folders',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        FormsModule,
        TransformDatePipe,
        NgxSpinnerModule,
        NgxPaginationModule,
        
    ],
    templateUrl: './customer-folders.component.html',
    styleUrl: './customer-folders.component.css',
})
export class CustomerFoldersComponent implements OnInit {
    [x: string]: any;

    public libelle_dossiers: string = '';
    public folder_file: any = [];
    public p: number = 1;
    public dossiers_code: any;
    public item_slug: string = "";

    public employe_matricule: string = '';

    public folder_employe_matricule: string = '';

    public list_docprovide: any = [];

    constructor(
        private _notificationService: NotificationService,
        private _traitement: MainTreatmentsService,
        private _router: Router,
        private _loading: LoadingService,
        private _userData: UserDataManagerService,
        private _dialog: MatDialog,
    ){}


    ngOnInit(): void {
        this.employe_matricule = this._userData.getUserData().employe_matricule;
        this.getCustomerDossiersList();
        this.getDocprovide();
    }



    openDossiersDialog() {
        const dialogRef = this._dialog.open(EmployeesFoldersDialogComponent, {
            width: 'auto',

        });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getCustomerDossiersList();
                }
            },
        });
    }


    updateDossiersDialog() {

        const data = {
            libelle_dossiers: this.libelle_dossiers,
            employe_matricule: this.employe_matricule,
            slug: this.item_slug
        }
        const dialogRef = this._dialog.open(EmployeesFoldersDialogComponent,
            {
                width: 'auto',
                data
            }
        );
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getCustomerDossiersList();
                }
            },
        });

    }

    getDocprovide() {

        this._loading.show_loading();
        this._traitement.getDocProvide().subscribe({
  
            next: (response: any) => {
              console.log(response);
                setTimeout(() => {
                    this.list_docprovide = response
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


    getCustomerDossiersList() {

        this._loading.show_loading();
        this._traitement.getCustomerDossiers(this.employe_matricule).subscribe({

            next: (response: any) => {

                if(response != null){

                    setTimeout(() => {
                        this.folder_employe_matricule = response.employe_matricule;
                        this.libelle_dossiers = response.libelle_dossiers;
                        this.dossiers_code = response.dossiers_code;
                        this.item_slug = response.slug;

                        this._loading.hide_loading();

                        this.getDossiersFileList(this.dossiers_code);
                    }, 1000);
                }else{
                    this._loading.hide_loading();
                }
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


    openDeleDialog(slug: string) {
        const dialog = this._dialog.open(DeleteComponent, {
            width: 'auto',
        });
        dialog.afterClosed().subscribe({
            next: (val) => {
                if (val == "confirm") {

                    this.deleteDossiers(slug)

                }
            },
        });
    }


    deleteDossiers(slug: string) {
        this._loading.show_loading();

        this._traitement.deleteDossiers(slug).subscribe({

            next: (response: any) => {
                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSuccess(response);
                        this._loading.hide_loading();
                        this.getCustomerDossiersList();
                    }, 1000);
                } else if (response.code == 302 || response.code == 300) {
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
        });

    }



    // FOLDER FILE

    openDossiersFeleDialog() {


        const data = {
            dossiers_code: this.dossiers_code
        }
        //console.log(this.);

        const dialogRef = this._dialog.open(EmployeesFoldersFileComponent, {
            width: 'auto',
            data

        });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getCustomerDossiersList();
                }
            },
        });
    }


    getDossiersFileList(folders_code: string) {
        //console.log(this.item_slug);
        this._loading.show_loading();
        this._traitement.getCustomerFoldersFile(folders_code).subscribe({

            next: (response: any) => {
                //console.log(response)

                setTimeout(() => {
                    this.folder_file = response
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


    updateDossiersFile(item_data: any) {

        const data = {
            dossiers_code: this.dossiers_code,
            items_data: item_data
        }
        const dialogRef = this._dialog.open(EmployeesFoldersFileComponent,
            {
                width: 'auto',
                data
            }
        );
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getCustomerDossiersList();
                }
            },
        });

    }

    openDeleFoldersFileDialog(slug: string) {
        const dialog = this._dialog.open(DeleteComponent, {
            width: 'auto',
        });
        dialog.afterClosed().subscribe({
            next: (val) => {
                if (val == "confirm") {

                    this.deleteDoldersFile(slug)

                }
            },
        });
    }

    deleteDoldersFile(slug: string) {
        this._loading.show_loading();

        this._traitement.deleteDossiersFile(slug).subscribe({

            next: (response: any) => {
                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSuccess(response);
                        this._loading.hide_loading();
                        this.getCustomerDossiersList();
                    }, 1000);
                } else if (response.code == 302 || response.code == 300) {
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
        });

    }
}
