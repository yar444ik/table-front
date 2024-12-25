import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserAuthComponent } from './components/user-auth/user-auth.component';
import { TableStudentsComponent } from './components/table-students/table-students.component';

const routes: Routes = [
  {
    path:'login',
    component: UserAuthComponent
  },
  {
    path:'',
    redirectTo:'login',
    pathMatch:'full'
  },
  {
    path:'',
    component:TableStudentsComponent,
    children:[
      {
        path:'api/base/students',
        component:TableStudentsComponent
      }
    ]
  },
  {
    path:'**',
    component:UserAuthComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
