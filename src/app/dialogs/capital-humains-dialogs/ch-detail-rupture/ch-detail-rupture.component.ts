import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Router, RouterModule } from '@angular/router';
import { NotificationService } from '../../../services/notifications/notification.service';
import { MissionService } from '../../../services/treatments/mission/mission.service';
import { AdminConsulteMissionComponent } from '../../admin-dialogs/gestion-demande/admin-consulte-mission/admin-consulte-mission.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TransformDatePipe } from '../../../customer-pipe/transform-date.pipe';
import { MaterialModule } from '../../../material-module';
import { RuptureService } from '../../../services/treatments/rupture/rupture.service';

@Component({
  selector: 'app-ch-detail-rupture',
  standalone: true,
  imports: [
    CommonModule,
    MaterialModule,
    RouterModule,
    TransformDatePipe,
    FormsModule
  ],
  templateUrl: './ch-detail-rupture.component.html',
  styleUrl: './ch-detail-rupture.component.css'
})
export class ChDetailRuptureComponent implements OnInit {


  public item_slug: any = '';

  public mission_data: any;
  public mission_ref: string = '';
  public fonction: string = '';
  public service: string = '';
  public created_at: string = '';
  public status_on: number = 0;
  public status_off: number = 0;
  public decision_dg: number = 0;
  public duree_mission: string = '';
  public customer_name: string = '';

  public rupture_motif: string = '';
  public lieu_mission: string = '';

  public is_choose: string = '';

  public list_employes: any = [];
  public list_bureau: any = [];
  public employe_selected: any = '';

  public mission_start: any;
  public mission_end: any;
  
  public duration_is_date: boolean = false;

  public date_start: any;
  public date_end: any;
  public date_mission: any;


  public show_comment_box: boolean = false;
  public decision: string = '';
  public decision_comments: string = '';
  public comments: string = '';

  public loading: boolean = false;

  constructor(
      private _notificationService: NotificationService,
      private _rupture: RuptureService,
      private _router: Router,
      @Inject(MAT_DIALOG_DATA) public data: any,
      private _dialogRef: MatDialogRef<AdminConsulteMissionComponent>,
  ) {
      // registerLocaleData(fr.default);
  }

  ngOnInit(): void {

      if(this.data != null) {
          this.item_slug = this.data.slug
      }

      this.updateIsConsultingStatus();

      this.getCurrentRuptureInfo();
  }


  getCurrentRuptureInfo() {
      this._rupture.showRupture(this.item_slug).subscribe({
          next: (response: any) => {
              console.log(response);
              // MISSION
              this.customer_name = response.first_name + " " + response.last_name;
              this.rupture_motif = response.rupture_motif;
              this.date_mission = response.date_mission;
              this.mission_data = response;
              this.mission_end = response.mission_end;
              this.mission_ref = response.mission_ref;
              this.created_at = response.created_at;
              this.fonction = response.fonction;
              this.service = response.service;
              this.comments = response.comments;
              this.status_on = response.status_on;
              this.status_off = response.status_off;
              this.decision_dg = response.decision_dg;
              this.mission_start = response.mission_start;
              this.duree_mission = response.duree_mission;


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


  MissionDecisionChange(event: any) {

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

      this._rupture.approvedOrRejectedRupture(data).subscribe({

          next: (response: any) => {
            console.log(response);
              if (response.code == 200) {
                  this._notificationService.openSnackBarSuccess(response);
                  setTimeout(() => {
                      this.loading = false;

                      this.show_comment_box = false;

                      this.getCurrentRuptureInfo();
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

      this._rupture.updateIsConsultingStatus(this.item_slug).subscribe({

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



  printMission() {

      var printContents: any = document.querySelector('#mission_card')?.innerHTML;
      var originalContents = document.body.innerHTML;
      document.body.innerHTML = printContents;
      //window.open(originalContents, '_blank');
      window.print();
      document.body.innerHTML = originalContents;
      location.reload();

  }
}
