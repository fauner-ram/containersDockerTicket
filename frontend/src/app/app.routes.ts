import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './modules/public/login/login.component';
import { NgModule } from '@angular/core';
import { authGuard } from './guards/auth.guard';
import { AdminLayoutComponent } from './views/admin-layout/admin-layout.component';
import { TicketListComponent } from './modules/private/ticket-list/ticket-list.component';

export const routes: Routes = [
    //Privvate Routes

    // {
    //     path: 'tiket',
    //     component: TicketListComponent,
    //     // children: [{ path: '', component: DahsboardsListComponent }],
    //     // canActivate: [authGuard]
    // },
   
    //   PUBLIC ROUTES
    {
        path: 'tiket',
        component: TicketListComponent
    },
    {
        path: '',
        redirectTo: 'tiket',
        pathMatch: 'full'
    },
    // {
    //     path: 'login',
    //     component: LoginComponent
    // },
    // {
    //     path: '',
    //     redirectTo: 'login',
    //     pathMatch: 'full'
    // },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, {
            useHash: true,
            /* Activa las anclas en angular */
            anchorScrolling: 'enabled',
            /* Restaura el scroll a la posición inicial */
            scrollPositionRestoration: 'enabled'
        })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule { }