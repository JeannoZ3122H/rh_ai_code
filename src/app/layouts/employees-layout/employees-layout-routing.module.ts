import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmployeesWelcomeComponent } from '../../pages/employees/employees-welcome/employees-welcome.component';
import { EmployeesProfilComponent } from '../../components/customer-profil/employees-profil/employees-profil.component';
import { CustomerListCongesComponent } from '../../components/customer-demandes/customer-list-conges/customer-list-conges.component';
import { CustomerListPermissionsComponent } from '../../components/customer-demandes/customer-list-permissions/customer-list-permissions.component';
import { CustomerFoldersComponent } from '../../components/customer-folders/customer-folders.component';
import { CustomerEvaluationsComponent } from '../../components/customer-evaluations/customer-evaluations.component';
import { FullDemandesFormsComponent } from '../../components/customer-demandes/full-demandes-forms/full-demandes-forms.component';
import { CustomerRuptureContratComponent } from '../../components/customer-demandes/customer-rupture-contrat/customer-rupture-contrat.component';

const routes: Routes = [
    {
        path: 'employees',
        component: EmployeesWelcomeComponent,
        data: {title: 'Espace employees'}
    },
    {
        path: 'employees.profil',
        component: EmployeesProfilComponent,
        data: {title: 'Mon profil'}
    },

    {
        path: 'employees.demande',
        component: FullDemandesFormsComponent,
        data: {title: 'Faire une demande'}
    },
    {
        path: 'employees.conges',
        component: CustomerListCongesComponent,
        data: {title: 'Liste des conges'}
    },
    {
        path: 'employees.permissions',
        component: CustomerListPermissionsComponent,
        data: {title: 'Liste permissions'}
    },
    {
        path: 'employees.dossiers-employes',
        component: CustomerFoldersComponent,
        data: {title: 'Mes des dossiers'}
    },

    {
        path: 'employees.evaluations',
        component: CustomerEvaluationsComponent,
        data: {title: 'Liste des évaluations'}
    },
    {
        path: 'employees.rupture-contrat',
        component: CustomerRuptureContratComponent,
        data: {title: 'Rupture de contrat'}
    },

    // ROUTER GESTION DE PAIE
    /*
        {
            path: 'rh.salary',
            component: SalaryEmployeesComponent,
            data: {title: 'Liste salaire des emplyés'}
        },
        {
            path: 'rh.salary_view',
            component: SalaryViewComponent,
            data: {title: 'Fiche de paie'}
        },
        {
            path: 'rh.payroll_item',
            component: PayrollItemsComponent,
            data: {title: 'Fiche de paie'}
        },
    */
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class EmployeesLayoutRoutingModule {}
