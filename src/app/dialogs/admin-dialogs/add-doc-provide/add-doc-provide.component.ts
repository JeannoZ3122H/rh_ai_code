import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { NotificationService } from '../../../services/notifications/notification.service';
import { MainTreatmentsService } from '../../../services/treatments/main-treatments.service';
import { AddBureauComponent } from '../add-bureau/add-bureau.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MaterialModule } from '../../../material-module';

@Component({
  selector: 'app-add-doc-provide',
  standalone: true,
  imports: [CommonModule, MaterialModule, FormsModule],
  templateUrl: './add-doc-provide.component.html',
  styleUrl: './add-doc-provide.component.css'
})
export class AddDocProvideComponent implements OnInit {
  public document: string = '';
  public is_update: boolean = false;
  public item_slug: any;
  public is_loading: boolean = false;

  constructor(
      private _notificationService: NotificationService,
      private _traitement: MainTreatmentsService,
      private _router: Router,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private _dialogRef: MatDialogRef<AddBureauComponent>
  ) {}

  ngOnInit() {
      if (this.data != null) {
          this.is_update = true;
          this.document = this.data.document;
          this.item_slug = this.data.slug;
      }
  }

  saveDocProvide() {
      if (this.document == ''){
          this._notificationService.openSnackBarSimpleError(
              'Le le document est obligatoire'
          );
          return;
      }

      const data = {
        document: this.document.toUpperCase(),
      };

      this.is_loading = true;

      this._traitement.saveDocProvide(data).subscribe({
          next: (response: any) => {
              //console.log(response);
              if (response.code == 200) {
                  setTimeout(() => {
                      this._notificationService.openSnackBarSuccess(response);
                      this.is_loading = false;
                      this._dialogRef.close(true);
                  }, 1000);
              } else if (response.code == 302 || response.code == 300) {
                  this.is_loading = false;
                  this._notificationService.openSnackBarSuccess(response);
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

  updateDocProvide() {
      if (this.document == '') {
          this._notificationService.openSnackBarSimpleError(
              'Le document est obligatoire'
          );
          return;
      }

      const data = {
        document: this.document.toUpperCase(),
      };

      this.is_loading = true;

      this._traitement.updateDocProvide(data, this.item_slug).subscribe({
          next: (response: any) => {
              //console.log(response);
              if (response.code == 200) {
                  setTimeout(() => {
                      this._notificationService.openSnackBarSuccess(response);
                      this.is_loading = false;
                      this._dialogRef.close(true);
                  }, 1000);
              } else if (response.code == 302 || response.code == 300) {
                  this.is_loading = false;
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
}
