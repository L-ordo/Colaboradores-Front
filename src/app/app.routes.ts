import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'collaborators',
        title: 'Collaborator',
        loadComponent: () => import('./pages/collaborator/collaborator.component'),
    },
    {
        path: 'country',
        title: ' Country',
        loadComponent: () => import('./pages/country/country.component'),
    },
    {
        path: 'department',
        title: 'Department',
        loadComponent: () => import('./pages/departament/departament.component'),
    },
    {
        path: 'municipality',
        title: 'Municipality',
        loadComponent: () => import('./pages/municipality/municipality.component'),
    },
    {
        path: 'company',
        title: 'Company',
        loadComponent: () => import('./pages/company/company.component'),
    },
    { path: '', redirectTo: 'collaborators', pathMatch: 'full' },
];
