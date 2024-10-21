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
    selector: 'app-admin-layout',
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

    templateUrl: './admin-layout.component.html',
    styleUrl: './admin-layout.component.css',
})
export class AdminLayoutComponent implements OnInit {

    public sidebar_menu_list: any = [

        {
            id: 1,
            item_name: "Tableau de bord",
            item_icon: "dashboard",
            router: "/admin"
        },
        {
            id: 2,
            label: 'Gestions des compptes',
            item_name: "Liste des utilisateurs",
            item_icon: "mark_email_unread",
            router: "/admin.users"
        },
        {
            id: 3,
            item_name: "Liste rôles",
            item_icon: "mark_email_unread",
            router: "/admin.user-role"
        },
        {
            id: 8,
            label: 'Gestion des employés',
            margin: 'mb-4',
            item_name: "Liste des employes",
            item_icon: "format_list_bulleted_add",
            router: "/admin.list-employes"
        },
        {
            id: 9,
            item_name: "Responsables",
            item_icon: "groups",
            router: "/admin.list-responsable-agents"
        },
        {
            id: 10,
            item_name: "Mission",
            item_icon: "groups",
            router: "/admin.mission-employe"
        },
        
        {
            id: 11,
            item_name: "Liste des missions",
            item_icon: "groups",
            router: "/admin.mission-list"
        },
        {
            id: 12,
            item_name: "Augmentations des employes",
            item_icon: "format_list_bulleted_add",
            router: "/admin.augmentation/:slug"
        },
        {
            id: 13,
            item_name: "Gratification",
            item_icon: "format_list_bulleted_add",
            router: "/admin.gratification"
        },
        {
            id: 14,
            item_name: "Rupture de contrat",
            item_icon: "format_list_bulleted_add",
            router: "/admin.rupture-contrat"
        },
        {
            id: 15,
            item_name: "Dotation",
            item_icon: "format_list_bulleted_add",
            router: "/admin.dotation"
        },
        {
            id: 16,
            item_name: "Statistique des productions",
            item_icon: "format_list_bulleted_add",
            router: "/admin.statistique"
        },
        
        {
            id: 17,
            item_name: "Absence non justifié",
            item_icon: "format_list_bulleted_add",
            router: "/admin.absence-no-justify"
        },
        
        {
            id: 18,
            label: 'Gestion des demandes',
            margin: 'mb-4',
            item_name: "Liste des permissions",
            item_icon: "format_list_bulleted",
            router: "/admin.list-permissions"
        },
        {
            id: 19,
            item_name: "Liste des congés",
            item_icon: "format_list_bulleted_add",
            router: "/admin.list-conges"
        },
        // {
        //     id: 12,
        //     label: 'Gestion des évaluations',
        //     margin: 'mb-4',
        //     item_name: "Liste des évaluations",
        //     item_icon: "format_list_bulleted",
        //     router: "/admin.list-evaluations"
        // },
        {
            id: 20,
            label: 'Paramètre global',
            margin: 'mb-4',
            item_name: "Liste des fonctions",
            item_icon: "format_list_bulleted",
            router: "/admin.list-fonctions"
        },
        {
            id: 21,
            item_name: "Liste des services",
            item_icon: "format_list_bulleted_add",
            router: "/admin.list-services"
        },
        {
            id: 22,
            item_name: "Liste des sites",
            item_icon: "format_list_bulleted_add",
            router: "/admin.list-bureau"
        },
        {
            id: 23,
            item_name: "Liste des contrats",
            item_icon: "format_list_bulleted_add",
            router: "/admin.list-contrats"
        },
        {
            id: 24,
            item_name: "Liste des catégories",
            item_icon: "format_list_bulleted_add",
            router: "/admin.list-category-pro"
        },
        {
            id: 25,
            item_name: "Liste des types des congés",
            item_icon: "format_list_bulleted_add",
            router: "/admin.list-type-conge"
        }
        ,
        {
            id: 26,
            item_name: "Liste des documents",
            item_icon: "format_list_bulleted_add",
            router: "/admin.doc-provider"
        }
        
    ];

    public current_route: string = '';
    public user_name: string = '';
    public user_id: any;
    public photo: string = '';
    public screenWidth!: number;
    public is_opened: boolean = true;

    public current_date: Date = new Date();
    public code_date_echeance: string = '';
    public code_data: string = '';
    public code_slug: string = '';
    public type_accounts: string = '';

    constructor(
        private _location: Location,

        private _traitements: MainTreatmentsService,

        private _userData: UserDataManagerService,
        private _notificationService: NotificationService,
        private _authService: AuthService,
        private _router: Router,
        private __adapter: DateAdapter<Date>


    ) {
        this.screenWidth = window.innerWidth;
        window.onresize = () => {
            // set screenWidth on screen size change
            this.screenWidth = window.innerWidth;
        };
        this.__adapter.setLocale('fr')
        this._router.events.subscribe(event => {
            if (event instanceof NavigationStart) {
                this.current_route = event.url;
            }
        });

    }

    ngOnInit() {
        this.getUserConnectedData()

        this.getCodeAuthorization();
    }

    back() {
        this._location.back();
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


    formatDate(date: any)
    {
        let year = date.toLocaleString("default", { year: "numeric" });
        let month = date.toLocaleString("default", { month: "2-digit" });
        let day = date.toLocaleString("default", { day: "2-digit" });

        return year + "-" + month + "-" + day;
    }

    getUserConnectedData() {
        let data = this._userData.getUserData()
        this.user_name = data.first_name + " " + data.last_name;
        this.user_id = data.user_id;
        this.photo = data.photo;
        this.type_accounts = data.type_accounts
    }


    logOut(id: number) {
        console.log(id)
        this._traitements.logOut(id).subscribe({

            next: (response: any) =>{

                console.log(response)
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
