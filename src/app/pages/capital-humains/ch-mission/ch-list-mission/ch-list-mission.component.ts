import { Component, OnInit } from '@angular/core';
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
import { TransformDatePipe } from '../../../../customer-pipe/transform-date.pipe';
import { MaterialModule } from '../../../../material-module';
import { ChDetailMissionComponent } from '../../../../dialogs/capital-humains-dialogs/ch-detail-mission/ch-detail-mission.component';
import { CommonModule } from '@angular/common';
import { TransformTextPipe } from '../../../../customer-pipe/text-transform/transform-text.pipe';

@Component({
  selector: 'app-ch-list-mission',
  standalone: true,
  imports: [
    NgxSpinnerModule,
    MaterialModule,
    NgxPaginationModule,
    FormsModule,
    TransformDatePipe,
    TransformTextPipe,
    RouterModule,
    CommonModule,
    NgxSpinnerModule,
  ],
  templateUrl: './ch-list-mission.component.html',
  styleUrl: './ch-list-mission.component.css'
})
export class ChListMissionComponent implements OnInit {

  public list_missions: any = [];

  public mission_counter: number = 0;
  public employe_matricule: string = "";
  public list_customer_missions: any = [];
  public customer_mission_counter: number = 0;

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
    this.employe_matricule = this._userData.getUserData().employe_matricule;

      this.getMission();
  }


  getMission() {

    this._loadings.show_loading();

    this._mission.getMission(this.employe_matricule).subscribe({

        next: (response: any) => {

            setTimeout(() => {
                // console.log(response)

                //all mission
                this.list_missions = response.mission;
                this.mission_counter = this.list_missions.length;

                // customer mission
                this.list_customer_missions = response.customer_permission;
                // this.customer_mission_counter = this.list_customer_missions.length;

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

    // updateMission(data: any) {
    //     const dialogRef = this._dialog.open(ChEditMissionComponent,
    //         {
    //             panelClass: 'fullscreen-dialog',
    //             data: data
    //         }
    //     );
    //     dialogRef.afterClosed().subscribe({
    //         next: (val) => {
    //             if (val) {
    //                 this.getMission();
    //             }
    //         },
    //     });
    // }

  consulteMission(data: any) {
      const dialogRef = this._dialog.open(ChDetailMissionComponent,
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
