import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { AngularEditorConfig } from '@kolkov/angular-editor';
import { DeleteComponent } from '../../../components/actions/delete/delete.component';
import { AdminConsultePermissionComponent } from '../../../dialogs/admin-dialogs/gestion-demande/admin-consulte-permission/admin-consulte-permission.component';
import { UserDataManagerService } from '../../../services/data-managers/user-data/user-data-manager.service';
import { LoadingService } from '../../../services/loadings/loading.service';
import { NotificationService } from '../../../services/notifications/notification.service';
import { DotationService } from '../../../services/treatments/dotation/dotation.service';
import { MainTreatmentsService } from '../../../services/treatments/main-treatments.service';

@Component({
  selector: 'app-ch-emploiye-dotation',
  standalone: true,
  imports: [],
  templateUrl: './ch-emploiye-dotation.component.html',
  styleUrl: './ch-emploiye-dotation.component.css'
})
export class ChEmploiyeDotationComponent implements OnInit {

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
    

  public employe_matricule: string = '';
  
  public fullscreen: boolean = true;

  public materiel: string = '';
  
  public is_choose: string = '';
  
  public list_employes: any = [];
  public employe_selected: any = '';
  
  public date_dotation: any;

  public list_dotation: any = [];

  public dotation_counter: number = 0;
  public user_id: string = "";
  public p: number = 1;
  public is_update: boolean = false;
  public is_loading: boolean = false;
  public item_slug: any;


  constructor(
      private _dialog: MatDialog,
      private _dotation: DotationService,
      private _notificationService: NotificationService,
      private _loadings: LoadingService,
      private _router: Router,
      private _userData: UserDataManagerService,
      private _traitement: MainTreatmentsService,

  ){
      // registerLocaleData(fr.default);
  }

  ngOnInit(): void {
      this.user_id = this._userData.getUserData().user_id;
      this.getDotation();
      this.employe_matricule = this._userData.getUserData().employe_matricule;
      this.getAllEmployes();
      if (this._userData != null) {
          this.is_update = true;
      }

  }


  radioChange(event: any) {

      this.is_choose = event.value;
  
  }

  onChangeListeemploye(event: any) {
      this.employe_selected = event.value
    //   console.log(event)
  }

    saveDotation() {
      // console.log(this.date_start, this.date_end, this.date_mission);
      
      this._loadings.show_loading();
    
 
      //return;
      const formData: FormData = new FormData();
      formData.append("employe_matricule", this.employe_selected);
      formData.append("date_dotation", this.formatDate(this.date_dotation).toString());
    
      formData.append("materiel", this.materiel);
    
      this._dotation.addDotation(formData).subscribe({
    
          next: (response: any) => {
            //   console.log(response);
              if (response.code == 200) {
                  this._notificationService.openSnackBarSuccess(response);
                  setTimeout(() => {
                      this._loadings.hide_loading();
                      window.location.reload();
                  }, 2000);
              } else if (response.code == 300 || response.code == 500 || response.code == 302) {
                  this._loadings.hide_loading();
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

    getAllEmployes() {

      this._loadings.show_loading();
      this._traitement.getEmployes().subscribe({
  
          next: (response: any) => {
              setTimeout(() => {
                  this.list_employes = response
  
                  // console.log(this.list_employes)
                  this._loadings.hide_loading();
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


  getDotation() {

      this._loadings.show_loading();

      this._dotation.getAllDotation().subscribe({

          next: (response: any) => {
              console.log(response)

              this.list_dotation = response;
              this.dotation_counter = this.list_dotation.length;

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


  consulteDotation(data: any) {
      const dialogRef = this._dialog.open(AdminConsultePermissionComponent,
          {
              data: data,
              panelClass: 'fullscreen-dialog'
          }
      );
      dialogRef.afterClosed().subscribe({
          next: (val) => {
              if (val) {
                  this.getDotation();
              }
          },
      });
  }

  deleteDotation(slug: string) {

      const dialogRef = this._dialog.open(DeleteComponent, { width: 'auto' });
      dialogRef.afterClosed().subscribe({
          next: (val) => {
              if (val == "confirm") {
                  this._dotation.deleteDotation(slug).subscribe({

                      next: (response: any) => {
                          if (response.code == 200) {
                              this._notificationService.openSnackBarSuccess(response);
                              this.getDotation();

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

  updateDotation() {
      if (this.materiel == '') {
          this._notificationService.openSnackBarSimpleError(
              'motif aubligatoire'
          );
          return;
      }

      const data = {
          materiel: this.materiel.toUpperCase(),
          date_dotation: this.date_dotation.toUpperCase(),

      };

      this.is_loading = true;

      this._dotation.updateDotation(data, this.item_slug).subscribe({
          next: (response: any) => {
              //console.log(response);
              if (response.code == 200) {
                  setTimeout(() => {
                      this._notificationService.openSnackBarSuccess(response);
                      this.is_loading = false;
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
    
  
  formatDate(date: any)
  {
  let year = date.toLocaleString("default", { year: "numeric" });
  let month = date.toLocaleString("default", { month: "2-digit" });
  let day = date.toLocaleString("default", { day: "2-digit" });
  
  return year + "-" + month + "-" + day;
  }
}
