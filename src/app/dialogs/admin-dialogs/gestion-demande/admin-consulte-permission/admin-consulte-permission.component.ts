import { CommonModule, registerLocaleData } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MaterialModule } from '../../../../material-module';
import { TransformDatePipe } from '../../../../customer-pipe/transform-date.pipe';
import { FormsModule } from '@angular/forms';
import { NotificationService } from '../../../../services/notifications/notification.service';
import { PermissionService } from '../../../../services/treatments/permissions/permission.service';
import * as fr from '@angular/common/locales/fr';


@Component({
    selector: 'app-admin-consulte-permission',
    templateUrl: './admin-consulte-permission.component.html',
    styleUrls: ['./admin-consulte-permission.component.css'],
    standalone: true,
    imports:[
        CommonModule,
        MaterialModule,
        RouterModule,
        TransformDatePipe,
        FormsModule
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'fr-FR' },
    ],
})
export class AdminConsultePermissionComponent implements OnInit {


    public item_slug: any = '';

    public permission_data: any;
    public permission_ref: string = '';
    public type_duration: string = '';
    public date_permission: string = '';
    public motif: string = '';
    public fonction: string = '';
    public service: string = '';
    public created_at: string = '';
    public status_on: number = 0;
    public status_off: number = 0;
    public permission_start: string = '';
    public permission_end: string = '';
    public duree_permission: string = '';
    public customer_name: string = '';
    public justificatif: string = '';

    public show_comment_box: boolean = false;
    public decision: string = '';
    public decision_comments: string = '';
    public comments: string = '';

    public loading: boolean = false;

    constructor(
        private _notificationService: NotificationService,
        private _permission: PermissionService,
        private _router: Router,
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<AdminConsultePermissionComponent>,
    ) {
        registerLocaleData(fr.default);
    }

    ngOnInit(): void {

        if(this.data != null) {
            this.item_slug = this.data.slug
        }

        this.updateIsConsultingStatus();

        this.getCurrentPermissionInfo();
    }


    getCurrentPermissionInfo() {
        this._permission.showPermission(this.item_slug).subscribe({
            next: (response: any) => {
                console.log(response);
                // INFORMATION PERSONNELLE
                this.permission_data = response;
                this.type_duration = response.type_duration;
                this.permission_ref = response.permission_ref;
                this.date_permission = response.date_permission;
                this.fonction = response.fonction;
                this.justificatif = response.permission_file
                this.service = response.service;
                this.permission_start = response.permission_start;
                this.permission_end = response.permission_end;
                this.duree_permission = response.duree_permission;
                this.comments = response.comments;
                this.customer_name = response.first_name + " " + response.last_name;
                this.motif = response.motif;
                this.created_at = response.created_at;

                this.status_on = response.status_on;
                this.status_off = response.status_off;



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


    PermissionDecisionChange(event: any) {

        let event_data = event.value;

        if (event_data == "approved") {
            this.show_comment_box = true;
            this.decision = event_data;
        } else if (event_data == "rejected") {
            this.show_comment_box = true;
            this.decision = event_data;
        } else {
            this.show_comment_box = false;
            this.decision = '';
        }
    }


    saveDecision() {

        const data = {
            decison: this.decision,
            decision_comments: this.decision_comments,
            slug: this.item_slug
        }

        this.loading = true;

        this._permission.approvedOrRejectedPermission(data).subscribe({

            next: (response: any) => {
                console.log(response);
                if (response.code == 200) {
                    this._notificationService.openSnackBarSuccess(response);
                    setTimeout(() => {
                        this.loading = false;

                        this.show_comment_box = false;

                        this.getCurrentPermissionInfo();
                        //this._router.navigateByUrl('/web.apps.rh.permissions');
                    }, 1000);
                } else if (response.code == 300 || response.code == 500 || response.code == 302) {
                    this.loading;
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

    updateIsConsultingStatus() {

        this._permission.updateIsConsultingStatus(this.item_slug).subscribe({

            next: (response: any) => {

                if (response.code == 200) {
                    this._notificationService.openSnackBarSuccess(response);
                } else if (response.code == 300 || response.code == 500 || response.code == 302) {
                    this.loading;
                    this._notificationService.openSnackBarError(response);
                }
                else if (response.code == 201) {
                    this.loading;
                    this._notificationService.openSnackBarInfo(response);
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



    printPermission() {

        var printContents: any = document.querySelector('#permission_card')?.innerHTML;
        var originalContents = document.body.innerHTML;
        document.body.innerHTML = printContents;
        //window.open(originalContents, '_blank');
        window.print();
        document.body.innerHTML = originalContents;
        location.reload();

    }
}
