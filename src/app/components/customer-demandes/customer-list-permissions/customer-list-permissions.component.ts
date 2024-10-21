import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MaterialModule } from '../../../material-module';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { TransformDatePipe } from '../../../customer-pipe/transform-date.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { NotificationService } from '../../../services/notifications/notification.service';
import { MainTreatmentsService } from '../../../services/treatments/main-treatments.service';
import { LoadingService } from '../../../services/loadings/loading.service';
import { UserDataManagerService } from '../../../services/data-managers/user-data/user-data-manager.service';
import { PermissionService } from '../../../services/treatments/permissions/permission.service';
import { DeleteComponent } from '../../actions/delete/delete.component';
import { MatDialog } from '@angular/material/dialog';
import { CustomerDetailPermissionsComponent } from '../../../dialogs/customer-detail-demande-dialogs/customer-detail-permissions/customer-detail-permissions.component';
import { NgxPaginationModule } from 'ngx-pagination';
import { FullEditPermissionsFormsComponent } from '../full-edit-permissions-forms/full-edit-permissions-forms.component';

@Component({
    selector: 'app-customer-list-permissions',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        FormsModule,
        TransformDatePipe,
        NgxSpinnerModule,
        NgxPaginationModule
    ],
    templateUrl: './customer-list-permissions.component.html',
    styleUrl: './customer-list-permissions.component.css',
})
export class CustomerListPermissionsComponent implements OnInit {

    public list_permissions: any = [];
    public list_customer_permissions: any = [];
    public permission_counter: number = 0;
    public customer_permission_counter: number = 0;
    public employe_matricule: string = "";

    public p: number = 1;


    constructor(
        private _notificationService: NotificationService,
        private _traitement: MainTreatmentsService,
        private _router: Router,
        private _loading: LoadingService,
        private _userData: UserDataManagerService,
        private _permission: PermissionService,
        private _dialog: MatDialog,
    ){}


    ngOnInit(): void {
        this.employe_matricule = this._userData.getUserData().employe_matricule;

        this.getCustomerPermissions();
    }


    getCustomerPermissions() {

        this._loading.show_loading()
        this._permission.getCustomerPermission(this.employe_matricule).subscribe({

            next: (response: any) => {
                // console.log(response)
                setTimeout(() => {
                    this.list_customer_permissions = response;
                    this.customer_permission_counter = this.list_customer_permissions.length;
                    this._loading.hide_loading()
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

    consultePermission(data: any) {
        const dialogRef = this._dialog.open(CustomerDetailPermissionsComponent,
            {
                panelClass: 'fullscreen-dialog',
                data: data
            }
        );
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    //this.getAllGalerie();
                }
            },
        });
    }


    updateCustomerPermission(data: any) {
        const dialogRef = this._dialog.open(FullEditPermissionsFormsComponent,
            {
                panelClass: 'fullscreen-dialog',
                data: data
            }
        );
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getCustomerPermissions();
                }
            },
        });
    }

    deletePermission(slug: string) {

        const dialogRef = this._dialog.open(DeleteComponent, { width: 'auto' });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val == "confirm") {
                    this._permission.deleteDemandePermission(slug).subscribe({

                        next: (response: any) => {
                            if (response.code == 200) {
                                this._notificationService.openSnackBarSuccess(response);
                                this.getCustomerPermissions();

                            } else if (response.code == 404) {
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
            },
        });
    }
}
