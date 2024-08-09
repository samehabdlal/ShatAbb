import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MemberDetailsComponent } from './Members/member-details/member-details.component';
import { MemberListComponent } from './Members/member-list/member-list.component';
import { ListsComponent } from './lists/lists.component';
import { MessagesComponent } from './messages/messages.component';
import { authgard } from './_guards/-guards-auth.guard';
import { TestErrorComponent } from './error/test-error/test-error.component';
import { NotFoundComponent } from './error/not-found/not-found.component';
import { ServerErrorsComponent } from './error/server-errors/server-errors.component';
import { MemberEditComponent } from './Members/member-edit/member-edit.component';
import { preventUnsavedChangesGuard } from './_guards/prevent-unsaved-changes.guard';

export const routes: Routes = [
  {path:'',redirectTo:'home',pathMatch:'full'},
  {path:'home',component:HomeComponent},
  {
   path:'',
   runGuardsAndResolvers:'always',
   canActivate:[authgard],
   children:[
    {path:'members',component:MemberListComponent},
    {path:'members/:username',component:MemberDetailsComponent},
    {path:'member/:edit',component:MemberEditComponent,canDeactivate:[preventUnsavedChangesGuard]},
    {path:'lists',component:ListsComponent},
    {path:'messages',component:MessagesComponent},
   ]
  },
  {path:'errors',component:TestErrorComponent},
  {path:'not-found',component:NotFoundComponent},
  {path:'server-error',component:ServerErrorsComponent},
  {path:'**',redirectTo:'home',pathMatch:'full'},
];
