import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { TransformDatePipe } from '../../../../customer-pipe/transform-date.pipe';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '../../../../material-module';
import { MatDialog } from '@angular/material/dialog';
import { NotificationService } from '../../../../services/notifications/notification.service';
import { LoadingService } from '../../../../services/loadings/loading.service';
import { UserDataManagerService } from '../../../../services/data-managers/user-data/user-data-manager.service';
import { PermissionService } from '../../../../services/treatments/permissions/permission.service';
import { DeleteComponent } from '../../../../components/actions/delete/delete.component';
import { TransformTextPipe } from '../../../../customer-pipe/text-transform/transform-text.pipe';
import { AdminConsultePermissionComponent } from '../../../../dialogs/admin-dialogs/gestion-demande/admin-consulte-permission/admin-consulte-permission.component';
import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';

@Component({
    selector: 'app-admin-list-permissions',
    standalone: true,
    imports: [
        NgxSpinnerModule,
        MaterialModule,
        NgxPaginationModule,
        FormsModule,
        TransformDatePipe,
        TransformTextPipe,
        RouterModule
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'fr-FR' },
    ],
    templateUrl: './admin-list-permissions.component.html',
    styleUrl: './admin-list-permissions.component.css',
})
export class AdminListPermissionsComponent implements OnInit {

    public list_permissions: any = [];

    public permission_counter: number = 0;
    public user_id: string = "";
    public p: number = 1;

    constructor(
        private _dialog: MatDialog,
        private _permission: PermissionService,
        private _notificationService: NotificationService,
        private _loadings: LoadingService,
        private _router: Router,
        private _userData: UserDataManagerService
    ){
        registerLocaleData(fr.default);
    }

    ngOnInit(): void {
        this.user_id = this._userData.getUserData().user_id;

        this.getPermission();
    }

    getPermission() {

        this._loadings.show_loading();

        this._permission.getAllPermission().subscribe({

            next: (response: any) => {

                this.list_permissions = response;
                this.permission_counter = this.list_permissions.length;

                this._loadings.hide_loading();

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
        const dialogRef = this._dialog.open(AdminConsultePermissionComponent,
            {
                data: data,
                panelClass: 'fullscreen-dialog'
            }
        );
        dialogRef.afterClosed().subscribe({
            next: (val) => {
                if (val) {
                    this.getPermission();
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
