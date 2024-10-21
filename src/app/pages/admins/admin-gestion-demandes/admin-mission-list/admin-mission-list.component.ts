import { registerLocaleData } from '@angular/common';
import fr from '@angular/common/locales/fr';
import { Component, LOCALE_ID, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { DeleteComponent } from '../../../../components/actions/delete/delete.component';
import { UserDataManagerService } from '../../../../services/data-managers/user-data/user-data-manager.service';
import { LoadingService } from '../../../../services/loadings/loading.service';
import { NotificationService } from '../../../../services/notifications/notification.service';
import { MissionService } from '../../../../services/treatments/mission/mission.service';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgxSpinnerModule } from 'ngx-spinner';
import { TransformTextPipe } from '../../../../customer-pipe/text-transform/transform-text.pipe';
import { TransformDatePipe } from '../../../../customer-pipe/transform-date.pipe';
import { MaterialModule } from '../../../../material-module';
import { AdminConsulteMissionComponent } from '../../../../dialogs/admin-dialogs/gestion-demande/admin-consulte-mission/admin-consulte-mission.component';

@Component({
  selector: 'app-admin-mission-list',
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
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-FR' },
],
  templateUrl: './admin-mission-list.component.html',
  styleUrl: './admin-mission-list.component.css'
})
export class AdminMissionListComponent implements OnInit {

  public list_missions: any = [];

  public mission_counter: number = 0;
  public user_id: string = "";
  public p: number = 1;

  constructor(
      private _dialog: MatDialog,
      private _mission: MissionService,
      private _notificationService: NotificationService,
      private _loadings: LoadingService,
      private _router: Router,
      private _userData: UserDataManagerService
  ){
    //   registerLocaleData(fr.default);
  }

  ngOnInit(): void {
      this.user_id = this._userData.getUserData().user_id;

      this.getMission();
  }

  getMission() {

      this._loadings.show_loading();

      this._mission.getAllMission().subscribe({
          next: (response: any) => {
              console.log(response);
              this.list_missions = response;
              this.mission_counter = this.list_missions.length;

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


  consulteMission(data: any) {
      const dialogRef = this._dialog.open(AdminConsulteMissionComponent,
          {
              data: data,
              panelClass: 'fullscreen-dialog'
          }
      );
      dialogRef.afterClosed().subscribe({
          next: (val) => {
              if (val) {
                  this.getMission();
              }
          },
      });
  }


  deleteMission(slug: string) {

      const dialogRef = this._dialog.open(DeleteComponent, { width: 'auto' });
      dialogRef.afterClosed().subscribe({
          next: (val) => {
              if (val == "confirm") {
                  this._mission.deleteMission(slug).subscribe({

                      next: (response: any) => {
                          if (response.code == 200) {
                              this._notificationService.openSnackBarSuccess(response);
                              this.getMission();

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
