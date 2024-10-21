import { Component, OnInit } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '../../../../material-module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { TransformDatePipe } from '../../../../customer-pipe/transform-date.pipe';
import { TransformTextPipe } from '../../../../customer-pipe/text-transform/transform-text.pipe';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MainTreatmentsService } from '../../../../services/treatments/main-treatments.service';
import { NotificationService } from '../../../../services/notifications/notification.service';
import { LoadingService } from '../../../../services/loadings/loading.service';
import { MatDialog } from '@angular/material/dialog';
import { NotifyDialogComponent } from '../../../../dialogs/employees-dialogs/notify-dialog/notify-dialog.component';
import { DeleteComponent } from '../../../../components/actions/delete/delete.component';
import { EmployeesFoldersFileComponent } from '../../../../dialogs/employees-dialogs/employees-folders-file-dialog/employees-folders-file.component';

@Component({
    selector: 'app-employees-folder-details',
    standalone: true,
    imports: [
        NgxSpinnerModule,
        MaterialModule,
        NgxPaginationModule,
        FormsModule,
        TransformDatePipe,
        TransformTextPipe,
        RouterModule,
    ],
    templateUrl: './employees-folder-details.component.html',
    styleUrl: './employees-folder-details.component.css',
})
export class EmployeesFolderDetailsComponent implements OnInit {

    public list_files: any = [];
    public list_file_lenght: any;
    public list_docprovide: any;
    public p: number = 1;

    public add_file: boolean = false;

    public libelle_fichier: string = '';
    public decision_validation: string = '';
    public dossiers_code: any;
    public file_url!: File;

    public item_slug: any;



    constructor(
        private _dialog: MatDialog,
        private _traitement: MainTreatmentsService,
        private _notificationService: NotificationService,
        private _loading: LoadingService,
        private _router: Router,
        private _activeRouter: ActivatedRoute,
    ) { }

    ngOnInit(): void {

        this.dossiers_code = this._activeRouter.snapshot.paramMap.get('dossiers_code');
        this.item_slug = this._activeRouter.snapshot.paramMap.get('slug');

        this._loading.show_loading();
        setTimeout(() => {
            this.getDossiersFileList();
            this._loading.hide_loading();
            this.getDocprovide();
        }, 1000);

    }


    uploadFile(e: any) {
        this.file_url = e.target.files[0];
    }
    openDossiersDialog() {

        const data = {
            dossiers_code: this.dossiers_code
        }
        const dialogRef = this._dialog.open(EmployeesFoldersFileComponent, {
            width: 'auto',
            data: data,
        });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getDossiersFileList();
                }
            },
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
                    this.getDossiersFileList();
                }
            },
        });

    }




    getDossiersFileList() {
        //console.log(this.item_slug);


        this._traitement.ShowFoldersFile(this.dossiers_code).subscribe({

            next: (response: any) => {

                console.log(response)
                setTimeout(() => {
                    this.list_files = response.ducoment_data;

                    this.list_file_lenght = this.list_files.length;

                    this.decision_validation = response.is_decision;
                    //console.log(this.decision_validation)
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
                        this.getDossiersFileList();
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


    confirmedOrRejetedFile(word: string, item_data: any) {

        if(word == "confirmed"){

            const data = {
                adresse_email: item_data.adresse_email,
                slug: item_data.slug,
                keywords: word
            }

            this._loading.show_loading();

            this._traitement.sendNotification(data).subscribe({
                next: (response: any) => {
                    if (response.code == 200) {
                        setTimeout(() => {
                            this._notificationService.openSnackBarSuccess(response);
                            this._loading.hide_loading();
                            this.getDossiersFileList()
                        }, 1000);
                    } else if (response.code == 302 || response.code == 300) {
                        this._loading.hide_loading();
                        this._notificationService.openSnackBarError(response);
                    }
                },
            })

        }else if(word == "rejected"){

            const data = {
                adresse_email: item_data.adresse_email,
                employe_matricule: item_data.matricule,
                item_slug: item_data.slug,
                word: item_data.libelle_file,
                keywords: word
            }
            const dialog = this._dialog.open(NotifyDialogComponent, {
                width: 'auto',
                data
            });
            dialog.afterClosed().subscribe({
                next: (val) => {
                    this.getDossiersFileList()
                },
            });
        }else {
            return;
        }
    }
}
