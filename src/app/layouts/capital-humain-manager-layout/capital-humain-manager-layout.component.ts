import { Location } from '@angular/common';

import 'moment/locale/fr';
import {
  Component,
  OnInit,
} from '@angular/core';
import {
  NavigationStart,
  Router,
  RouterModule,
  RouterOutlet,
} from '@angular/router';

import { MaterialModule } from '../../material-module';
import { AuthService } from '../../services/auth/auth.service';
import {
  UserDataManagerService,
} from '../../services/data-managers/user-data/user-data-manager.service';
import {
  NotificationService,
} from '../../services/notifications/notification.service';
import {
  MainTreatmentsService,
} from '../../services/treatments/main-treatments.service';
import { MomentDateAdapter } from '@angular/material-moment-adapter';
import { MAT_DATE_LOCALE, DateAdapter, MAT_DATE_FORMATS } from '@angular/material/core';

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
    selector: 'app-capital-humain-manager-layout',
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
    templateUrl: './capital-humain-manager-layout.component.html',
    styleUrl: './capital-humain-manager-layout.component.css',
})
export class CapitalHumainManagerLayoutComponent implements OnInit {

    public sidebar_menu_list: any = [

        {
            id: 1,
            item_name: "Tableau de board",
            item_icon: "dashboard",
            router: "/capital-humain"
        },
        {
            id: 2,
            label: 'Employés',
            item_name: "Liste employé infos",
            item_icon: "group_add",
            router: "/ch.employees-infos"
        },
        {
            id:3,
            item_name: "Rupture de contrat",
            item_icon: "format_list_bulleted_add",
            router: "/ch.rupture-contrat"
        },
        {
            id: 4,
            item_name: "Liste des employés",
            item_icon: "group",
            router: "/ch.employees"
        },
        {
            id: 5,
            label: 'Gestion des missions',
            item_name: "Programmation",
            item_icon: "group",
            router: "/ch.missions"
        },
       
        {
            id: 6,
            item_name: "Liste des missions",
            item_icon: "group",
            router: "/ch.list-misson"
        },
        {
            id: 7,
            label: 'Autres gestions',
            item_name: "Rupture de contrat",
            item_icon: "format_list_bulleted_add",
            router: "/ch.rupture-contrat"
        },
        {
            id:8,
            item_name: "Dotation",
            item_icon: "format_list_bulleted_add",
            router: "/ch.dotation"
        },
        
        
        /**
        {
            id: 6,
            label: 'gestion des paies',
            margin: 'mb-4',
            item_name: "Salaire employés",
            item_icon: "payments",
            router: "/ch.salary"
        },

        {
            id: 8,
            item_name: "Fiche de paie",
            item_icon: "payments",
            router: "/ch.salary_view"
        },
        {
            id: 9,
            item_name: "Eléments de paie",
            item_icon: "payments",
            router: "/ch.payroll_item"
        },
        */
        {
            id: 11,
            label: 'Congés et Permissions',
            margin: 'mb-4',
            item_name: "Faire une demande",
            item_icon: "format_list_bulleted",
            router: "/ch.faire-demande"
        },
        {
            id: 12,
            item_name: "Liste permissions",
            item_icon: "format_list_bulleted",
            router: "/ch.permissions"
        },
        {
            id: 13,
            item_name: "Liste des congés",
            item_icon: "format_list_bulleted",
            router: "/ch.conges"
        },
        {
            id: 14,
            item_name: "Programmer un congé",
            item_icon: "format_list_bulleted",
            router: "/ch.programme-conge"
        },
        {
            id: 15,
            item_name: "Liste des programmes des congés",
            item_icon: "format_list_bulleted",
            router: "/ch.list-programme-conge"
        },
        {
            id: 16,
            label: 'Evaluation employés',
            item_name: "Evaluation",
            item_icon: "elevator",
            router: "/ch.evaluations"
        },

        {
            id: 17,
            label: 'Dossiers employés',
            item_name: "Liste dossiers",
            item_icon: "folder",
            router: "/ch.dossiers-employes"
        }

    ];

    public user_name: string = '';
    public user_id: any;
    public photo: string = '';
    public type_accounts: string = '';
    public screenWidth!: number;
    public code_data: string = '';
    public code_slug: string = '';
    public current_route: string = '';
    public current_date: Date = new Date();
    public code_date_echeance: string = '';

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
        window.onresize = () => {
            // set screenWidth on screen size change
            this.screenWidth = window.innerWidth;
        };
        this.__adapter.setLocale('fr');
        this._router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.current_route = event.url;
            }
        });
    }

    ngOnInit(): void {
        this.getUserConnectedData()

        this.getCodeAuthorization();
    }


    back() {
        this._location.back();
    }

    getUserConnectedData() {
        let data = this._userData.getUserData()
        this.user_name = data.first_name
        this.user_id = data.user_id;
        this.photo = data.photo;
        this.type_accounts = data.type_accounts
    }

    getCodeAuthorization()
    {

        this._traitements.getCodeAuthorization(this.type_accounts).subscribe({
            next: (response: any) => {
                //console.log(response)
                setTimeout(() => {
                    this.code_data = response.code;
                    this.code_slug = response.slug;
                    this.code_date_echeance = response.date_echeance;

                    this.autoRefreshCodeAuthorization(this.code_slug);
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

    refreshCodeAuthorization(code_slug: string)
    {
        //console.log(this.code_slug)

        //return
        this._traitements.refreshCodeAuthorization(code_slug).subscribe({
            next: (response: any) => {

                //console.log(response)
                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSuccess(response);
                        this.getCodeAuthorization();
                    }, 1000);
                } else if (response.code == 302 || response.code == 300) {
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


    autoRefreshCodeAuthorization(slug: string)
    {
        let date_formated = this.formatDate(this.current_date);

        //console.log(slug)
        if(date_formated > this.code_date_echeance)
        {
            this.refreshCodeAuthorization(slug)
        }else{
            return
        }
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


    formatDate(date: any)
    {
        let year = date.toLocaleString("default", { year: "numeric" });
        let month = date.toLocaleString("default", { month: "2-digit" });
        let day = date.toLocaleString("default", { day: "2-digit" });

        return year + "-" + month + "-" + day;
    }
}
