import { Component, Inject, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AngularEditorConfig, AngularEditorModule } from '@kolkov/angular-editor';
import { UserDataManagerService } from '../../../../services/data-managers/user-data/user-data-manager.service';
import { LoadingService } from '../../../../services/loadings/loading.service';
import { NotificationService } from '../../../../services/notifications/notification.service';
import { MainTreatmentsService } from '../../../../services/treatments/main-treatments.service';
import { MissionService } from '../../../../services/treatments/mission/mission.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '../../../../material-module';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FullEditPermissionsFormsComponent } from '../../../../components/customer-demandes/full-edit-permissions-forms/full-edit-permissions-forms.component';

@Component({
  selector: 'app-ch-edit-mission',
  standalone: true,
  imports: [NgxSpinnerModule, MaterialModule, FormsModule, ReactiveFormsModule, AngularEditorModule],
  templateUrl: './ch-edit-mission.component.html',
  styleUrl: './ch-edit-mission.component.css'
})
export class ChEditMissionComponent implements OnInit {


  config: AngularEditorConfig = {
      editable: true,
      spellcheck: true,
      height: '20rem',
      minHeight: '20rem',
      placeholder: "Entrer l'ordre de la mission ici",
      translate: 'no',
      defaultParagraphSeparator: 'p',
      defaultFontName: 'Arial',
      toolbarHiddenButtons: [
        ['bold']
        ],

        fonts: [
          {class: 'arial', name: 'Arial'},
          {class: 'times-new-roman', name: 'Times New Roman'},
          {class: 'calibri', name: 'Calibri'},
          {class: 'comic-sans-ms', name: 'Comic Sans MS'}
        ],

      customClasses: [
        {
          name: "quote",
          class: "quote",
        },
        {
          name: 'redText',
          class: 'redText'
        },
        {
          name: "titleText",
          class: "titleText",
          tag: "h1",
        },
      ]
    };
    
public is_switching_assigment: boolean = true;
public is_switching_leave: boolean = false;
public switcher_is_active: boolean = true;

public employe_matricule: string = '';

public fullscreen: boolean = true;

public description: string = '';
public lieu_mission: string = '';

public is_choose: string = '';

public list_employes: any = [];
public list_bureau: any = [];
public employe_selected: any = '';

public date_depart: any;
public date_retour: any;

public duration_is_date: boolean = false;

public date_start: any;
public date_end: any;
public date_mission: any;

public items_slug: string = '';


constructor(
    private _traitement: MainTreatmentsService,
    private _router: Router,
    private _loading: LoadingService,
    private _userData: UserDataManagerService,
    private _notificationService: NotificationService,
    private _mission: MissionService,
    private _activatedRoute: ActivatedRoute,

    @Inject(MAT_DIALOG_DATA) public data: any,
    private _dialogRef: MatDialogRef<FullEditPermissionsFormsComponent>,

){}

ngOnInit(): void {

    if(this.data != null) {
        this.items_slug = this.data;
    }

    this.employe_matricule = this._userData.getUserData().employe_matricule;
    // this.getAllBureau();
    this.getAllEmployes();
}

radioChange(event: any) {

    this.is_choose = event.value;

}

MissionDurationChange(event: any)
{
    let res = event.value;

    if(res === 'date'){
        this.duration_is_date = true;
    }else{
        this.duration_is_date = false;
    }
}

// switchAction(data: string) {
//     if (data == "assigments") {
//         this.is_switching_assigment = true;
//         this.is_switching_leave = false;
//         this.switcher_is_active = true;
//     }

//     if (data == "leave") {
//         this.is_switching_leave = true;
//         this.is_switching_assigment = false;
//         this.switcher_is_active = false;
//     }
// }

onChangeListeemploye(event: any) {
    this.employe_selected = event.value
  //   console.log(event)
}

//   onChangeListeBureau(event: any) {
//       this.list_bureau = event.value
//   }


getAllEmployes() {

  this._loading.show_loading();
  this._traitement.getEmployes().subscribe({

      next: (response: any) => {
          setTimeout(() => {
              this.list_employes = response

              // console.log(this.list_employes)
              this._loading.hide_loading();
          }, 700);
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


// getAllBureau() {

//   this._loading.show_loading();
//   this._traitement.getBureau().subscribe({

//       next: (response: any) => {
//           setTimeout(() => {
//               this.list_bureau = response
//               this._loading.hide_loading();
//           }, 1000);
//       },
//       error: (error: any) => {
//           if (error.status == 401) {
//               this._notificationService.openSnackBarTokenExpired();
//               localStorage.clear();
//               this._router.navigateByUrl('/');

//           }
//       }
//   });
// }



getCurrentMission() {

    this._mission.editMission(this.items_slug).subscribe({

        next: (response: any) => {
            console.log(response);
            this.description = response.description;
            this.lieu_mission = response.lieu_mission;

            this.date_start = new Date(response.mission_start);
            this.date_end = new Date(response.mission_end);
          

            // this.checkedPermissionDurationChange(this.type_duration);
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



updateMission() {

  //console.log(this.dead_line_assigment);
  //return
  this._loading.show_loading();

  let slug: any = this._activatedRoute.snapshot.paramMap.get('slug');

  //return;
  this._loading.show_loading();

  let duree_jour = this.calculateDifferenceBetweenDates(this.date_start, this.date_end);

  // console.log(duree_jour);
  //return;
  const formData: FormData = new FormData();
  formData.append("employe_matricule", this.employe_selected);
  formData.append("lieu_mission", this.lieu_mission);
  // formData.append("date_mission", this.formatDate(this.date_mission).toString());


  // if(duree_jour != undefined) {
    
      formData.append("duree_mission", duree_jour);
    // }
 

  // if (duree_jour != undefined) {
      formData.append("mission_end", this.formatDate(this.date_end).toString());
      formData.append("mission_start", this.formatDate(this.date_start).toString());
  // } 

  formData.append("description", this.description);


  this._mission.updateMission(slug,formData).subscribe({

      next: (response: any) => {
          console.log(response);
          if (response.code == 200) {
              this._notificationService.openSnackBarSuccess(response);
              setTimeout(() => {
                  this._loading.hide_loading();
                  this._router.navigateByUrl('/ch.list-misson');
              }, 2000);
          } else if (response.code == 300 || response.code == 500 || response.code == 302) {
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


  })
}


formatDate(date: any)
{
  let year = date.toLocaleString("default", { year: "numeric" });
  let month = date.toLocaleString("default", { month: "2-digit" });
  let day = date.toLocaleString("default", { day: "2-digit" });

  return year + "-" + month + "-" + day;
}


// CALCULATE DATE DURATION
    calculateDifferenceBetweenDates(date1: any, date2: any): any {
        if(date1 != undefined && date2 != undefined) {
            let differenceEnMilliseconds = Math.abs(date2.getTime() - date1.getTime());
            let differenceEnJours = differenceEnMilliseconds / (1000 * 3600 * 24);
            return (differenceEnJours).toString() + 'Jour(s)';
        } else {
            return undefined;
        }
    }
}
