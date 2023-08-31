import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from '../pages/admin/admin.component';
import { RouterModule } from '@angular/router';
import { MaterialsModule } from '../materials/materials.module';
import { FormsModule } from '@angular/forms';

const routes = [
  {
    path: '',
    component: AdminComponent,
  },
];

@NgModule({
  declarations: [
    AdminComponent
  ],
  imports: [
    FormsModule,
    MaterialsModule,
    CommonModule,
    RouterModule.forChild(routes)
  ]
})
export class LazyLoadModule { }
