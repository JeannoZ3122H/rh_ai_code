import { CommonModule, registerLocaleData } from '@angular/common';
import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../../../material-module';
import { FormsModule } from '@angular/forms';
import { TransformDatePipe } from '../../../customer-pipe/transform-date.pipe';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import * as fr from '@angular/common/locales/fr';


@Component({
    selector: 'app-customer-detail-permissions',
    standalone: true,
    imports: [
        CommonModule,
        MaterialModule,
        RouterModule,
        FormsModule,
        TransformDatePipe,
        NgxSpinnerModule,
    ],
    providers: [
        { provide: LOCALE_ID, useValue: 'fr-FR' },
    ],
    templateUrl: './customer-detail-permissions.component.html',
    styleUrl: './customer-detail-permissions.component.css',
})
export class CustomerDetailPermissionsComponent implements OnInit {


    public permission_data: any;

    constructor(
        @Inject(MAT_DIALOG_DATA) public data: any,
        private _dialogRef: MatDialogRef<CustomerDetailPermissionsComponent>,
    ){
        registerLocaleData(fr.default);
    }

    ngOnInit(): void {

        if (this.data != null) {
            this.permission_data = this.data;
        }

        console.log(this.permission_data);
    }
}
