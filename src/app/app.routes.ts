import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: 'collaborators',
        title: 'Collaborator',
        loadComponent: () => import('./pages/collaborator/collaborator.component'),
    },
    {
        path: 'newcollaborators',
        title: 'New Collaborator',
        loadComponent: () => import('./pages/new-collaborator/new-collaborator.component'),
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
        path: 'company',
        title: 'Company',
        loadComponent: () => import('./pages/company/company.component'),
    },
    { path: '', redirectTo: 'collaborators', pathMatch: 'full' },
];
