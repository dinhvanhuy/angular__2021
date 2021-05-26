import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { MemberDetailsComponent } from './components/member-details/member-details.component';
import { MemberEditComponent } from './components/member-edit/member-edit.component';
import { MemberComponent } from './components/member/member.component';
import { TestErrorComponent } from './components/test-error/test-error.component';

const routes: Routes = [
    {
      path: 'test-error',
      component: TestErrorComponent
    },
    {
      path: 'member',
      component: MemberComponent
    },
    {
      path: 'member/detail/:id',
      component: MemberDetailsComponent
    },
    {
      path: 'member/edit/:id',
      component: MemberEditComponent
    }, 
    {
      path: 'edit-profile',
      component: EditProfileComponent
    },
    { path: 'auth', loadChildren: () => import('./modules/auth/auth.module').then(m => m.AuthModule) }
  ];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule],
})
export class AppRoutingModule { }