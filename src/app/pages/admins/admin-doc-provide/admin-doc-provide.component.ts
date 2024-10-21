import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { DeleteComponent } from '../../../components/actions/delete/delete.component';
import { LoadingService } from '../../../services/loadings/loading.service';
import { NotificationService } from '../../../services/notifications/notification.service';
import { MainTreatmentsService } from '../../../services/treatments/main-treatments.service';
import { AddDocProvideComponent } from '../../../dialogs/admin-dialogs/add-doc-provide/add-doc-provide.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TransformDatePipe } from '../../../customer-pipe/transform-date.pipe';
import { MaterialModule } from '../../../material-module';

@Component({
  selector: 'app-admin-doc-provide',
  standalone: true,
  imports: [
    NgxSpinnerModule,
    MaterialModule,
    NgxPaginationModule,
    FormsModule,
    TransformDatePipe,
    RouterModule,
  ],
  templateUrl: './admin-doc-provide.component.html',
  styleUrl: './admin-doc-provide.component.css'
})
export class AdminDocProvideComponent implements OnInit {

  public list_docprovide: any = [];
  public p: number = 1;


  constructor(
      private _dialog: MatDialog,
      private _traitement: MainTreatmentsService,
      private _loading: LoadingService,
      private _router: Router,
      private _notificationService: NotificationService,
  ) {}

  ngOnInit(): void {
      this.getDocprovide();
  }

  openDocProvideDialog() {
      const dialogRef = this._dialog.open(AddDocProvideComponent, { width: '800px' });
      dialogRef.afterClosed().subscribe({
          next: (val) => {
              if (val) {
                  this.getDocprovide();
              }
          },
      });
  }


  updateDocProvide(data: any) {


      const dialogRef = this._dialog.open(AddDocProvideComponent,
          {
              width: '800px',
              data
          }
      );
      dialogRef.afterClosed().subscribe({
          next: (val) => {
              if (val) {
                  this.getDocprovide();
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


  openDeleDialog(slug: string) {
      const dialog = this._dialog.open(DeleteComponent, {
          width: 'auto',
      });
      dialog.afterClosed().subscribe({
          next: (val) => {
              if (val == "confirm") {

                  this.deleteDocProvide(slug)

              }
          },
      });
  }


  deleteDocProvide(slug: string) {
      this._loading.show_loading();

      this._traitement.destroyDocProvide(slug).subscribe({

          next: (response: any) => {
              if (response.code == 200) {
                  setTimeout(() => {
                      this._notificationService.openSnackBarSuccess(response);
                      this._loading.hide_loading();
                      this.getDocprovide();
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
