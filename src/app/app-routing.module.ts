import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SkincareComponent } from 'app/skincare/skincare.component';
import { TasksComponent } from 'app/tasks/tasks.component';

const routes: Routes = [
  { path: 'tasks', component: TasksComponent },
  { path: 'skincare', component: SkincareComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
