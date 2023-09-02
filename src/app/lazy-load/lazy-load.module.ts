import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from '../pages/admin/admin.component';
import { RouterModule } from '@angular/router';
import { MaterialsModule } from '../materials/materials.module';
import { FormsModule } from '@angular/forms';
import {AngularFireModule} from '@angular/fire/compat';
import {AngularFireStorageModule} from '@angular/fire/compat/storage';
import { environment } from '../environments/environment';



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
    RouterModule.forChild(routes),
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireModule
  ]
})
export class LazyLoadModule { }
