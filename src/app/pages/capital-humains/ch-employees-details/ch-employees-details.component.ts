import { Component, OnInit } from '@angular/core';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MaterialModule } from '../../../material-module';
import { NgxPaginationModule } from 'ngx-pagination';
import { FormsModule } from '@angular/forms';
import { TransformDatePipe } from '../../../customer-pipe/transform-date.pipe';
import { TransformTextPipe } from '../../../customer-pipe/text-transform/transform-text.pipe';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { MainTreatmentsService } from '../../../services/treatments/main-treatments.service';
import { NotificationService } from '../../../services/notifications/notification.service';
import { LoadingService } from '../../../services/loadings/loading.service';

@Component({
    selector: 'app-ch-employees-details',
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
    templateUrl: './ch-employees-details.component.html',
    styleUrl: './ch-employees-details.component.css',
})
export class ChEmployeesDetailsComponent implements OnInit {
    // EMPLOYE INFO VARIBLE
    public first_name: string = ''; //OK
    public last_name: string = ''; //OK
    public diplome: string = ''; //OK
    public matricule: string = ''; //OK
    public adresse_email: string = ''; // OK;
    public genre: any; //OK;
    public telephone: string = ''; //OK ;
    public photo!: File;
    public situation_matrimoniale: any; // OK ;
    public nombre_enfant_a_charge: any = 0;
    public nationalite: string = '';
    public date_naissance: any = new Date(); //OK ;
    public lieu_naissance: string = ''; // OK ;
    public piece_number: string = '';
    public lieu_residence: string = ''; // OK ;
    public cnps_number: string = '';
    public status_info: any;

    public personne_a_contacter: string = "";
    public contact_personne_a_contacter: string = "";
    public nombre_personne_a_charge: string = "";
    public personne_a_charge: string = "";

    public conjoint_name: string = "";
    public contact_conjoint: string = "";
    public antecedant_medicaux: string = "";

    //infocontrats

    public status_contrats: any;

    public is_disabled: boolean = true;
    public is_disabled_contrats: boolean = true;
    public timescontrats: boolean = true;


    public fonction: any;
    public profession: string = '';
    public service: any;
    public bureau: any;
    public contrats: any;
    public categorie_pro: any;
    public date_embauche: any = new Date();
    public salaire_categoriel: any = 0;
    public salaire_net_mensuel: any = 0;
    public item_slug: any;
    public item_slug_info: any;
    public item_slug_contrats: any;
    public old_image: string = '';
    public img_update: boolean = true;
    public user_image!: File;
        
    public type_contrat: string = "";
    public fonction_employe: string = "";
    public statut: string = "";
    public garde_employe: string = "";
    public employe_bureau: string = "";
    public loading: boolean = false;
    public salaire_mensuel: any = "";
    public augmantation: any = "";
    public date_augmantation: Date = new Date();
    public date_embauche_end: Date = new Date();
    public commission: any = "";
    public avantage: any = "";
    public profesion: any = "";

    public selectedFonctionOption: any;
    public selectedSituationMatrimonialeOption: any;
    public selectedServiceOption: any;
    public selectedGenreOption: any;
    public selectedPieceOption: any;
    public selectedContratsOption: any;
    public selectedBureauOption: any;
    public selectedCategorieProfessionnelleOption: any;

    public list_fonction: any = [];
    public list_service: any = [];
    public list_genre: any = [
        { id: 1, genre: 'Homme' },
        { id: 2, genre: 'Femme' },
    ];
    public list_piece: any = [
        { id: 1, piece: "Carte Nationale d'Identité" },
        { id: 2, piece: 'PassePort' },
    ];
    public list_situation_matrimoniale: any = [
        { id: 1, situation_matrimoniale: 'Célibataire' },
        { id: 2, situation_matrimoniale: 'Marié(e)' },
        { id: 3, situation_matrimoniale: 'Veuf(ve)' },
        { id: 3, situation_matrimoniale: 'Divorcé(e)' },
    ];

    public piece: any;

    public list_categorie_pro: any = [];
    public list_contrats: any = [];
    public list_bureau: any = [];
    public phone: string = '';

    public employee_dossier: any;
    public first_step: boolean = false;
    public second_step: boolean = false;
    public fird_step: boolean = false;

    constructor(
        //private _dialog: MatDialog,
        private _traitement: MainTreatmentsService,
        private _notificationService: NotificationService,
        private _loadings: LoadingService,
        private _router: Router,
        private _active_router: ActivatedRoute
    ) {}

    ngOnInit(): void {
        this.getEmployeCurrentInfo();
        this.getFonctionList();
        this.getServiceList();
        this.getBureauList();
        this.getCategorieProList();
        this.getContratsList();
    }

    selectPiece(event: any) {
        this.piece = event.value;
    }

    selectFonction(event: any) {
        this.fonction = event.value;
    }

    selectSituationMatrimoniale(event: any) {
        this.situation_matrimoniale = event.value;
    }

    selectCategorieProfessionnelle(event: any) {
        this.categorie_pro = event.value;
    }

    selectService(event: any) {
        this.service = event.value;
    }

    selectGenre(event: any) {
        this.genre = event.value;
    }

    selectContrats(event: any) {
        this.contrats = event.value;
    }

    selectBureau(event: any) {
        this.bureau = event.value;
    }

    isUpdateImg() {
        this.img_update = true;
    }

    getFonctionList() {
        this._traitement.getFonction().subscribe({
            next: (response: any) => {
                setTimeout(() => {
                    this.list_fonction = response;
                }, 1000);
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

    getServiceList() {
        this._traitement.getService().subscribe({
            next: (response: any) => {
                setTimeout(() => {
                    this.list_service = response;
                }, 1000);
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

    getBureauList() {
        this._traitement.getBureau().subscribe({
            next: (response: any) => {
                setTimeout(() => {
                    this.list_bureau = response;
                }, 1000);
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

    getCategorieProList() {
        this._traitement.getCategorieProfessionnelle().subscribe({
            next: (response: any) => {
                console.log(response);
                setTimeout(() => {
                    this.list_categorie_pro = response;
                }, 1000);
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

    getContratsList() {
        this._traitement.getContrats().subscribe({
            next: (response: any) => {
                setTimeout(() => {
                    this.list_contrats = response;
                }, 1000);
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

    uploadFile(e: any) {
        this.user_image = e.target.files[0];
    }

    edited() {
        this.is_disabled = false;
    }

    cancel() {
        this.is_disabled = true;
    }

    editedContrats() {
        this.is_disabled_contrats = false;
    }

    cancelContrats() {
        this.is_disabled_contrats = true;
    }

    getEmployeCurrentInfo() {
        this.item_slug = this._active_router.snapshot.paramMap.get('slug');
        this._loadings.show_loading();


        this._traitement.showEmployes(this.item_slug).subscribe({
            next: (response: any) => {
                console.log(response);
                // INFORMATION PERSONNELLE

                setTimeout(() => {
                    this.first_name = response.employe_info_perso.first_name;
                    this.matricule = response.employe_info_perso.matricule;
                    this.last_name = response.employe_info_perso.last_name;
                    this.diplome = response.employe_info_perso.diplome;
                    this.profession = response.employe_info_perso.profession;
                    this.adresse_email = response.employe_info_perso.adresse_email;
                    this.date_naissance =
                        response.employe_info_perso.date_naissance;
                    this.lieu_naissance =
                        response.employe_info_perso.lieu_naissance;
                    this.piece_number = response.employe_info_perso.piece_number;
                    this.nationalite = response.employe_info_perso.nationalite;
                    this.nombre_enfant_a_charge =
                        response.employe_info_perso.nombre_enfant_a_charge;
                    this.lieu_residence =
                        response.employe_info_perso.lieu_residence;
                    this.selectedSituationMatrimonialeOption =
                        response.employe_info_perso.situation_matrimoniale;
                    this.selectedGenreOption = response.employe_info_perso.genre;
                    this.selectedPieceOption =
                        response.employe_info_perso.type_piece;
                    this.phone = response.employe_info_perso.phone;
                    this.old_image = response.employe_info_perso.photo;
                    this.item_slug_info = response.employe_info_perso.slug;

                    this.personne_a_contacter = response.employe_info_perso.personne_a_contacter;
                    this.personne_a_charge = response.employe_info_perso.personne_a_charge;
                    this.conjoint_name = response.employe_info_perso.conjoint_name;
                    this.contact_conjoint = response.employe_info_perso.contact_conjoint;
                    this.antecedant_medicaux = response.employe_info_perso.antecedant_medicaux;
                    this.contact_personne_a_contacter = response.employe_info_perso.contact_personne_a_contacter;
                    this.situation_matrimoniale = response.employe_info_perso.situation_matrimoniale;


                    // EMPLOYEE FOLDER

                    this.employee_dossier = response.employee_dossier;

                    //INFORMATION SUR LE CONTRAT
                    if(response.employe_info_contrats != null){

                        this.selectedCategorieProfessionnelleOption =
                            response.employe_info_contrats.categorie_pro_id;
                        this.selectedFonctionOption =
                            response.employe_info_contrats.fonction_id;
                        this.selectedContratsOption =
                            response.employe_info_contrats.contrats_id;
                        this.selectedBureauOption =
                            response.employe_info_contrats.bureau_id;
                        this.selectedServiceOption =
                            response.employe_info_contrats.service_id;
                        this.salaire_categoriel =
                            response.employe_info_contrats.salaire_categoriel;
                        this.date_embauche =
                            response.employe_info_contrats.date_embauche;
                        this.salaire_net_mensuel =
                            response.employe_info_contrats.salaire_mensuel_net;
                        this.item_slug_contrats = response.employe_info_contrats.slug;
                    
                        this.cnps_number = response.employe_info_contrats.cnps_number;
                    }

                    this._loadings.hide_loading();
                }, 1000);

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

    updateEmployeInformationPersonnelle() {
        if (this.first_name == '') {
            this._notificationService.openSnackBarSimpleError(
                'Le nom est obligatoire'
            );
            return;
        }

        if (this.last_name == '') {
            this._notificationService.openSnackBarSimpleError(
                'Le prénom est obligatoire'
            );
            return;
        }

        if (this.diplome == '') {
            this._notificationService.openSnackBarSimpleError(
                'Le diplôme est obligatoire'
            );
            return;
        }
        if (this.profession == '') {
            this._notificationService.openSnackBarSimpleError(
                'La profession est obligatoire'
            );
            return;
        }

        if (this.adresse_email == '') {
            this._notificationService.openSnackBarSimpleError(
                "L'adresse email est obligatoire"
            );
            return;
        }

        if (this.date_naissance == '') {
            this._notificationService.openSnackBarSimpleError(
                'La date de naissance est obligatoire'
            );
            return;
        }
        if (this.lieu_naissance == '') {
            this._notificationService.openSnackBarSimpleError(
                'Le lieu de naissance est obligatoire'
            );
            return;
        }

        if (this.lieu_residence == '') {
            this._notificationService.openSnackBarSimpleError(
                'Le lieu de residence est obligatoire'
            );
            return;
        }

        if (this.phone == '') {
            this._notificationService.openSnackBarSimpleError(
                'Le téléphone est obligatoire'
            );
            return;
        }

        if (this.nationalite == '') {
            this._notificationService.openSnackBarSimpleError(
                'La nationalité est obligatoire'
            );
            return;
        }

        if (this.piece_number == '') {
            this._notificationService.openSnackBarSimpleError(
                'Le numéro de la pièce est obligatoire'
            );
            return;
        }

        const data = {
            first_name: this.first_name,
            last_name: this.last_name,
            diplome: this.diplome,
            profession: this.profession,
            adresse_email: this.adresse_email,
            phone: this.phone,
            genre:
                this.genre == undefined ? this.selectedGenreOption : this.genre,
            situation_matrimoniale:
                this.situation_matrimoniale == undefined
                    ? this.selectedSituationMatrimonialeOption
                    : this.situation_matrimoniale,
            date_naissance: this.date_naissance,
            lieu_naissance: this.lieu_naissance,
            lieu_residence: this.lieu_residence,
            nationalite: this.nationalite,
            type_piece:
                this.piece == undefined ? this.selectedPieceOption : this.piece,
            piece_number: this.piece_number,
            nombre_enfant_a_charge: this.nombre_enfant_a_charge,

           personne_a_contacter: this.personne_a_contacter,
           personne_a_charge: this.personne_a_charge,
           conjoint_name: this.conjoint_name,
           contact_conjoint: this.contact_conjoint,
           antecedant_medicaux: this.antecedant_medicaux,
           contact_personne_a_contacter: this.contact_personne_a_contacter,

        };

        //console.log(data);
        //return

        this._loadings.show_loading();

        this._traitement.updateEmployes(data, this.item_slug_info).subscribe({
            next: (response: any) => {
                console.log(response);
                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSuccess(response);
                        this._loadings.hide_loading();
                        this.is_disabled = true;
                        //console.log(this.status_info);
                    }, 1000);
                } else if (response.code == 302 || response.code == 300) {
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
            },
        });
    }

    updateEmployeInformationContrats() {
        if (this.date_embauche == '') {
            this._notificationService.openSnackBarSimpleError(
                'La date de prise de fonction est obligatoire'
            );
            return;
        }

        if (this.matricule == '') {
            this._notificationService.openSnackBarSimpleError(
                "Le matricule de l'employé est obligatoire"
            );
            return;
        }

        // if (this.salaire_categoriel == '') {
        //     this._notificationService.openSnackBarSimpleError(
        //         'Le salaire catégoriel est obligatoire'
        //     );
        //     return;
        // }

        if (this.salaire_net_mensuel == '') {
            this._notificationService.openSnackBarSimpleError(
                'La salaire net mensuel est obligatoire'
            );
            return;
        }

        const data = {
            employe_matricule: this.matricule,
            contrats:
                this.contrats == undefined
                    ? this.selectedContratsOption
                    : this.contrats,
            service:
                this.service == undefined
                    ? this.selectedServiceOption
                    : this.service,
            fonction:
                this.fonction == undefined
                    ? this.selectedFonctionOption
                    : this.fonction,
            bureau:
                this.bureau == undefined
                    ? this.selectedBureauOption
                    : this.bureau,
            categorie_pro:
                this.categorie_pro == undefined
                    ? this.selectedCategorieProfessionnelleOption
                    : this.categorie_pro,
            // salaire_categoriel: this.salaire_categoriel,
            salaire_net_mensuel: this.salaire_net_mensuel,
            date_embauche: this.date_embauche,
            adresse_email: this.adresse_email,
            date_embauche_end: this.date_embauche_end,
            // augmantation: this.augmantation,
            // date_augmantation: this.date_augmantation,

            cnps_number: this.cnps_number,

            avantage: this.avantage,
        };

        //console.log(data);

        this._loadings.show_loading();

        this._traitement.updateEmployeContrats(data, this.matricule).subscribe({
            next: (response: any) => {
                console.log( response);

                if (response.code == 200) {
                    setTimeout(() => {
                        this._notificationService.openSnackBarSuccess(response);
                        this._loadings.hide_loading();
                        this.is_disabled_contrats = true;
                        //stepper.next();
                    }, 1000);
                } else if (response.code == 302 || response.code == 300) {
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
            },
        });
    }

}
