import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TabAdminPage } from './tab-admin.page';

const routes: Routes = [
  {
    path: '',
    component: TabAdminPage,
    children : [
      {
        path : '',
        pathMatch: 'full',
        redirectTo: 'main-admin-page'
      },
      {
        path : 'main-admin-page',
        loadChildren: () => import('../main-admin-page/main-admin-page.module').then( m => m.MainAdminPagePageModule)
      },
      {
        path: 'logs',
        loadChildren: () => import('../logs/logs.module').then( m => m.LogsPageModule)
      },
      {
        path: 'new-medic-account',
        loadChildren: () => import('../new-medic-account/new-medic-account.module').then( m => m.NewMedicAccountPageModule)
      },
      {
        path: 'users-list',
        loadChildren: () => import('../users-list/users-list.module').then( m => m.UsersListPageModule)
      },
      {
        path: 'manage-db',
        loadChildren: () => import('../manage-db/manage-db.module').then( m => m.ManageDbPageModule)
      },
      {
        path: 'user-admin-profile',
        loadChildren: () => import('../user-admin-profile/user-admin-profile.module').then( m => m.UserAdminProfilePageModule)
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TabAdminPageRoutingModule {}
