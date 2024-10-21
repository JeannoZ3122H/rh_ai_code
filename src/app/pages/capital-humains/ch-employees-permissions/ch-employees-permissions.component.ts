import { Component, OnInit } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '../../../material-module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { TransformDatePipe } from '../../../customer-pipe/transform-date.pipe';
import { TransformTextPipe } from '../../../customer-pipe/text-transform/transform-text.pipe';
import { Router, RouterModule } from '@angular/router';
import { PermissionService } from '../../../services/treatments/permissions/permission.service';
import { NotificationService } from '../../../services/notifications/notification.service';
import { LoadingService } from '../../../services/loadings/loading.service';
import { UserDataManagerService } from '../../../services/data-managers/user-data/user-data-manager.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteComponent } from '../../../components/actions/delete/delete.component';
import { ChDetailPermissionsComponent } from '../../../dialogs/capital-humains-dialogs/ch-detail-permissions/ch-detail-permissions.component';

@Component({
    selector: 'app-ch-employees-permissions',
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
    templateUrl: './ch-employees-permissions.component.html',
    styleUrl: './ch-employees-permissions.component.css',
})
export class ChEmployeesPermissionsComponent implements OnInit {

    public list_permissions: any = [];
    public list_customer_permissions: any = [];
    public permission_counter: number = 0;
    public customer_permission_counter: number = 0;
    public employe_matricule: string = "";
    public p: number = 1;


    constructor(
        private _dialog: MatDialog,
        private _permission: PermissionService,
        private _notificationService: NotificationService,
        private _loadings: LoadingService,
        private _router: Router,
        private _userData: UserDataManagerService
    ){}



    ngOnInit(){
        this.employe_matricule = this._userData.getUserData().employe_matricule;

        this.getPermission();
    }


    getPermission() {

        this._loadings.show_loading();

        this._permission.getPermission(this.employe_matricule).subscribe({

            next: (response: any) => {

                setTimeout(() => {

                    //console.log(response)

                    //all permission
                    this.list_permissions = response.permission;
                    this.permission_counter = this.list_permissions.length;

                    // customer permission
                    this.list_customer_permissions = response.customer_permission;
                    this.customer_permission_counter = this.list_customer_permissions.length;

                    this._loadings.hide_loading();
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
        const dialogRef = this._dialog.open(ChDetailPermissionsComponent,
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

    deletePermission(slug: string) {

        const dialogRef = this._dialog.open(DeleteComponent, { width: 'auto' });
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val == "confirm") {
                    this._permission.deleteDemandePermission(slug).subscribe({

                        next: (response: any) => {
                            if (response.code == 200) {
                                this._notificationService.openSnackBarSuccess(response);
                                this.getPermission();

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
