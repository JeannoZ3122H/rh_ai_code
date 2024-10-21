import { DotationComponent } from './../../pages/admins/dotation/dotation.component';
import { GratificationComponent } from './../../pages/admins/gratification/gratification.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminWelcomeComponent } from '../../pages/admins/admin-welcome/admin-welcome.component';
import { AdminListEmployeesComponent } from '../../pages/admins/admin-gestion-employees/admin-list-employees/admin-list-employees.component';
import { UserRoleListComponent } from '../../pages/admins/admin-users-accounts/user-role-list/user-role-list.component';
import { AdminListCongesComponent } from '../../pages/admins/admin-gestion-demandes/admin-list-conges/admin-list-conges.component';
import { AdminListPermissionsComponent } from '../../pages/admins/admin-gestion-demandes/admin-list-permissions/admin-list-permissions.component';
import { AdminUsersAccountsComponent } from '../../pages/admins/admin-users-accounts/admin-users-accounts.component';
import { UserTypeAccountsListComponent } from '../../pages/admins/admin-users-accounts/user-type-accounts-list/user-type-accounts-list.component';
import { AdminEmployeesProfilComponent } from '../../pages/admins/admin-gestion-employees/admin-employees-profil/admin-employees-profil.component';
import { ResponsableAgentListComponent } from '../../pages/admins/admin-gestion-responsable-agent/responsable-agent-list/ResponsableAgentListComponent';
import { EvaluationListComponent } from '../../pages/admins/admin-gestion-evaluations/evaluation-list/evaluation-list.component';
import { BureauListComponent } from '../../pages/admins/admin-app-settings/bureau-list/bureau-list.component';
import { CategorieProfessionnelleListComponent } from '../../pages/admins/admin-app-settings/categorie-professionnelle-list/categorie-professionnelle-list.component';
import { ContratsListComponent } from '../../pages/admins/admin-app-settings/contrats-list/contrats-list.component';
import { FonctionsListComponent } from '../../pages/admins/admin-app-settings/fonctions-list/fonctions-list.component';
import { ServicesListComponent } from '../../pages/admins/admin-app-settings/services-list/services-list.component';
import { TypeCongesListComponent } from '../../pages/admins/admin-app-settings/type-conges-list/type-conges-list.component';
import { ConfigurationPointageComponent } from '../../pages/admins/admin-app-settings/configuration-pointage/configuration-pointage.component';
import { AdminMissionComponent } from '../../pages/admins/admin-mission/admin-mission.component';
import { AdminMissionListComponent } from '../../pages/admins/admin-gestion-demandes/admin-mission-list/admin-mission-list.component';
import { StatistiqueComponent } from '../../pages/admins/statistique/statistique.component';
import { AugmentationComponent } from '../../pages/admins/augmentation/augmentation.component';
import { RuptureContratComponent } from '../../pages/admins/rupture-contrat/rupture-contrat.component';
import { MisADisponibiliteComponent } from '../../pages/admins/mis-a-disponibilite/mis-a-disponibilite.component';
import { AbsenceNonJustifieComponent } from '../../pages/admins/absence-non-justifie/absence-non-justifie.component';
import { AdminDocProvideComponent } from '../../pages/admins/admin-doc-provide/admin-doc-provide.component';

const routes: Routes = [

    //
    {
        path: 'admin',
        component: AdminWelcomeComponent,
        data: { title: 'Administration' },
    },
    {
        path: 'admin.list-employes',
        component: AdminListEmployeesComponent,
        data: { title: 'Liste des employes' },
    },
    {
        path: 'admin.detail.employes/:slug',
        component: AdminEmployeesProfilComponent,
        data: { title: 'Détail employes' },
    },
    {
        path: 'admin.users',
        component: AdminUsersAccountsComponent,
        data: { title: 'Liste des utilisateurs' },
    },
    {
        path: 'admin.user-role',
        component: UserRoleListComponent,
        data: { title: 'Liste des rôles' },
    },
    {
        path: 'admin.type-accounts',
        component: UserTypeAccountsListComponent,
        data: { title: 'Liste des types de compte' },
    },
    {
        path: 'admin.list-permissions',
        component: AdminListPermissionsComponent,
        data: { title: 'Liste des permissions' },
    },
    {
        path: 'admin.list-conges',
        component: AdminListCongesComponent,
        data: { title: 'Liste des conges' },
    },
    {
        path: 'admin.mission-employe',
        component: AdminMissionComponent,
        data: { title: 'Mission employe' },
    },
    {
        path: 'admin.mission-list',
        component: AdminMissionListComponent,
        data: { title: 'Liste des missions' },
    },
    {
        path: 'admin.list-responsable-agents',
        component: ResponsableAgentListComponent,
        data: { title: 'Liste des responsables et agents de service' },
    },
    {
        path: 'admin.list-evaluations',
        component: EvaluationListComponent,
        data: { title: 'Liste des evaluations' },
    },
    //App Settings Route
    {
        path: 'admin.list-bureau',
        component: BureauListComponent,
        data: { title: 'Liste des bureaux' },
    },
    {
        path: 'admin.list-category-pro',
        component: CategorieProfessionnelleListComponent,
        data: { title: 'Liste des categories' },
    },
    {
        path: 'admin.list-contrats',
        component: ContratsListComponent,
        data: { title: 'Liste des contrats' },
    },
    {
        path: 'admin.list-fonctions',
        component: FonctionsListComponent,
        data: { title: 'Liste des fonctions' },
    },
    {
        path: 'admin.list-services',
        component: ServicesListComponent,
        data: { title: 'Liste des services' },
    },
    {
        path: 'admin.list-type-conge',
        component: TypeCongesListComponent,
        data: { title: 'Liste des type de conges' },
    },
    {
        path: 'admin.config-attendance',
        component: ConfigurationPointageComponent,
        data: { title: 'Configuration des presences' },
    },
    {
        path: 'admin.statistique',
        component: StatistiqueComponent,
        data: { title: 'Statistique de production des journalistes' },
    },
    {
        path: 'admin.augmentation/:slug',
        component: AugmentationComponent,
        data: { title: 'Augmentations des employe' },
    },
    {
        path: 'admin.rupture-contrat',
        component: RuptureContratComponent,
        data: { title: 'Rupture de contrat' },
    },
    {
        path: 'admin.dotation',
        component: DotationComponent,
        data: { title: 'Dotation de materiel' },
    },
    {
        path: 'admin.absence-no-justify',
        component: AbsenceNonJustifieComponent,
        data: { title: 'Absence non justifié' },
    },
    {
        path: 'admin.gratification',
        component: GratificationComponent,
        data: { title: 'Gratification' },
    },
    {
        path: 'admin.doc-provider',
        component: AdminDocProvideComponent,
        data: { title: 'Document à fournir' },
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class AdminLayoutRoutingModule {}
