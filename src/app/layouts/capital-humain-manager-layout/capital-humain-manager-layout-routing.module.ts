import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ChWelcomeComponent } from '../../pages/capital-humains/ch-welcome/ch-welcome.component';
import { ChEmployeesListComponent } from '../../pages/capital-humains/ch-employees-list/ch-employees-list.component';
import { RegisterAttendanceComponent } from '../../pages/capital-humains/ch-employees-attendance-list/register-attendance/register-attendance.component';
import { ChEmployeesAttendanceListComponent } from '../../pages/capital-humains/ch-employees-attendance-list/ch-employees-attendance-list.component';
import { FullDemandesFormsComponent } from '../../components/customer-demandes/full-demandes-forms/full-demandes-forms.component';
import { ChEmployeesDetailsComponent } from '../../pages/capital-humains/ch-employees-details/ch-employees-details.component';
import { ChEmployeesCongesComponent } from '../../pages/capital-humains/ch-employees-conges/ch-employees-conges.component';
import { ChEmployeesGestionPaieComponent } from '../../pages/capital-humains/ch-employees-gestion-paie/ch-employees-gestion-paie.component';
import { ChEmployeesEvaluationsComponent } from '../../pages/capital-humains/ch-employees-evaluations/ch-employees-evaluations.component';
import { ChEmployeesFolderListComponent } from '../../pages/capital-humains/ch-employees-folder-list/ch-employees-folder-list.component';
import { EmployeesFolderDetailsComponent } from '../../pages/capital-humains/ch-employees-folder-list/employees-folder-details/employees-folder-details.component';
import { ChEmployeesPermissionsComponent } from '../../pages/capital-humains/ch-employees-permissions/ch-employees-permissions.component';
import { ChEditCongesComponent } from '../../pages/capital-humains/ch-employees-conges/ch-edit-conges/ch-edit-conges.component';
import { ChEditPermissionsComponent } from '../../pages/capital-humains/ch-employees-permissions/ch-edit-permissions/ch-edit-permissions.component';
import { ChEmployeesInfoPersonnelleComponent } from '../../pages/capital-humains/ch-employees-list/ch-employees-info-personnelle/ch-employees-info-personnelle.component';
import { ChMissionComponent } from '../../pages/capital-humains/ch-mission/ch-mission.component';
import { ChListMissionComponent } from '../../pages/capital-humains/ch-mission/ch-list-mission/ch-list-mission.component';
import { ChEditMissionComponent } from '../../pages/capital-humains/ch-mission/ch-edit-mission/ch-edit-mission.component';
import { DotationComponent } from '../../pages/admins/dotation/dotation.component';
import { ChRuptureContratComponent } from '../../pages/capital-humains/ch-rupture-contrat/ch-rupture-contrat.component';
import { ChProgrammeCongeComponent } from '../../pages/capital-humains/ch-programme-conge/ch-programme-conge.component';
import { ChListProgrammeComponent } from '../../pages/capital-humains/ch-list-programme/ch-list-programme.component';

const routes: Routes = [
    {
        path: 'capital-humain',
        component: ChWelcomeComponent,
        data: {title: 'Capital humain'}
    },
    {
        path: 'ch.employees-infos',
        component: ChEmployeesInfoPersonnelleComponent,
        data: {title: 'Liste des information des employes'}
    },
    {
        path: 'ch.employees',
        component: ChEmployeesListComponent,
        data: {title: 'Liste employes'}
    },
    {
        path: 'ch.detail.employes/:slug',
        component: ChEmployeesDetailsComponent,
        data: {title: 'Détail employes'}
    },
    {
        path: 'ch.create-pointing',
        component: RegisterAttendanceComponent,
        data: {title: 'Nouveau pointage'}
    },

    {
        path: 'ch.pointages',
        component: ChEmployeesAttendanceListComponent,
        data: {title: 'Liste présences'}
    },
    {
        path: 'ch.faire-demande',
        component: FullDemandesFormsComponent,
        data: {title: 'Faire une demande'}
    },
    {
        path: 'ch.conges',
        component: ChEmployeesCongesComponent,
        data: {title: 'Liste des conges'}
    },
    {
        path: 'ch.edit-conges/:slug',
        component: ChEditCongesComponent,
        data: {title: 'Modifier un congé'}
    },
    {
        path: 'ch.permissions',
        component: ChEmployeesPermissionsComponent,
        data: {title: 'Liste permissions'}
    },
    {
        path: 'ch.edit-permissions/:slug',
        component: ChEditPermissionsComponent,
        data: {title: 'Modifier permission'}
    },
    {
        path: 'ch.dossiers-employes',
        component: ChEmployeesFolderListComponent,
        data: {title: 'Liste des dossiers'}
    },
    {
        path: 'ch.detail-dossiers/:dossiers_code/:slug',
        component: EmployeesFolderDetailsComponent,
        data: {title: 'Detail du dossier'}
    },
    
    {
        path: 'ch.missions',
        component: ChMissionComponent,
        data: {title: 'Programmer une mission'}
    },
    {
        path: 'ch.list-misson',
        component: ChListMissionComponent,
        data: {title: 'Liste des missions'}
    },
    {
        path: 'ch.programme-conge',
        component: ChProgrammeCongeComponent,
        data: {title: 'Programme des congés'}
    },
    {
        path: 'ch.list-programme-conge',
        component: ChListProgrammeComponent,
        data: {title: 'Liste des programmes des congés'}
    },
    {
        path: 'ch.edit-mission/:slug',
        component: ChEditMissionComponent,
        data: {title: 'Modifier une mission'}
    },
    {
        path: 'ch.rupture-contrat',
        component: ChRuptureContratComponent,
        data: {title: 'Rupture Contrat'}
    },


    // ROUTER GESTION DE PAIE

    {
        path: 'ch.salary',
        component: ChEmployeesGestionPaieComponent,
        data: {title: 'Liste salaire des emplyés'}
    },
    /**
    {
        path: 'ch.salary_view',
        component: SalaryViewComponent,
        data: {title: 'Fiche de paie'}
    },
    {
        path: 'ch.payroll_item',
        component: PayrollItemsComponent,
        data: {title: 'Fiche de paie'}
    },*/
    {
        path: 'ch.evaluations',
        component: ChEmployeesEvaluationsComponent,
        data: {title: 'Evaluation des employes'}
    },
   
    {
        path: 'ch.dotation',
        component: DotationComponent,
        data: { title: 'Dotation de materiel' },
    }
    ,
    {
        path: 'ch.rupture-contrat',
        component: ChRuptureContratComponent,
        data: { title: 'Rupture de contrat' },
    }
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class CapitalHumainManagerLayoutRoutingModule {}
