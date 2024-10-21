import { Component, OnInit } from '@angular/core';
import { NavigationStart, Router, RouterModule, RouterOutlet } from '@angular/router';
import { MaterialModule } from '../../material-module';
import { MainTreatmentsService } from '../../services/treatments/main-treatments.service';
import { UserDataManagerService } from '../../services/data-managers/user-data/user-data-manager.service';
import { AuthService } from '../../services/auth/auth.service';
import { NotificationService } from '../../services/notifications/notification.service';
import { Location } from '@angular/common';
import { DateAdapter, MAT_DATE_FORMATS, MAT_DATE_LOCALE } from '@angular/material/core';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import 'moment/locale/fr';

const MY_DATE_FORMAT = {
    parse: {
        dateInput: 'DD/MM/YYYY', // this is how your date will be parsed from Input
    },
    display: {
        dateInput: 'DD/MM/YYYY', // this is how your date will get displayed on the Input
        monthYearLabel: 'MMMM YYYY',
        dateA11yLabel: 'LL',
        monthYearA11yLabel: 'MMMM YYYY'
    }
};
@Component({
    selector: 'app-employees-layout',
    standalone: true,
    imports: [
        RouterOutlet,
        MaterialModule,
        RouterModule
    ],
    providers: [
        { provide: MAT_DATE_LOCALE, useValue: 'fr' },
        { provide: DateAdapter, useClass: MomentDateAdapter, deps: [MAT_DATE_LOCALE] },
        { provide: MAT_DATE_FORMATS, useValue: MY_DATE_FORMAT }
    ],
    templateUrl: './employees-layout.component.html',
    styleUrl: './employees-layout.component.css',
})
export class EmployeesLayoutComponent implements OnInit {


    public sidebar_menu_list: any = [

        {
            id: 1,
            item_name: "Tableau de board",
            item_icon: "dashboard",
            router: "/employees"
        },
        {
            id: 2,
            label: 'Employés',
            item_name: "Mon profil",
            item_icon: "group_add",
            router: "/employees.profil"
        },
        {
            id: 3,
            item_name: "Rupture contrat",
            item_icon: "list_alt",
            router: "/employees.rupture-contrat"
        },
        /*
        {
            id: 6,
            label: 'gestion des paies',
            margin: 'mb-4',
            item_name: "Salaire employés",
            item_icon: "payments",
            router: "/rh.salary"
        },

        {
            id: 8,
            item_name: "Fiche de paie",
            item_icon: "payments",
            router: "/rh.salary_view"
        },
        {
            id: 9,
            item_name: "Eléments de paie",
            item_icon: "payments",
            router: "/rh.payroll_item"
        }*/

        {
            id: 11,
            label: 'Congés et Permissions',
            margin: 'mb-4',
            item_name: "Faire une demande",
            item_icon: "playlist_add",
            router: "/employees.demande"
        },
        {
            id: 12,
            item_name: "Mes permissions",
            item_icon: "format_list_bulleted",
            router: "/employees.permissions"
        },
        {
            id: 13,
            item_name: "Mes congés",
            item_icon: "format_list_bulleted",
            router: "/employees.conges"
        },

        /**
        {
            id: 14,
            label: 'Evaluation employés',
            item_name: "Evaluation",
            item_icon: "elevator",
            router: "/employees.evaluations"
        },
        */
        {
            id: 15,
            label: 'Dossiers employés',
            item_name: "Mon dossier",
            item_icon: "folder",
            router: "/employees.dossiers-employes"
        }




    ];

    public user_name: string = '';
    public user_id: any;
    public photo: string = '';
    public screenWidth!: number;

    public current_route: string = '';

    constructor(
        private _location: Location,
        private _traitements: MainTreatmentsService,
        private _userData: UserDataManagerService,
        private _notificationService: NotificationService,
        private _authService: AuthService,
        private _router: Router,
        private __adapter: DateAdapter<Date>,

    ) {
        this.screenWidth = window.innerWidth;
        this.__adapter.setLocale('fr');
        window.onresize = () => {
            // set screenWidth on screen size change
            this.screenWidth = window.innerWidth;
        };

        this._router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.current_route = event.url;
            }
        });
    }


    ngOnInit() {


        //console.log(this.current_route);
        this.getUserConnectedData()
    }



    back() {
        this._location.back();
    }

    getUserConnectedData() {
        let data = this._userData.getUserData()
        this.user_name = data.first_name
        this.user_id = data.user_id;
        this.photo = data.photo;
    }


    logOut(id: number) {

        this._traitements.logOut(id).subscribe({

            next: (response: any) =>{

                if(response.code == 200){

                    sessionStorage.clear();
                    localStorage.clear();

                    this._notificationService.openSnackBarSuccess(response);

                    this._router.navigate(['/']);
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
}
