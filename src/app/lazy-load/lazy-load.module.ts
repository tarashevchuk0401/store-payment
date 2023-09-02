import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminComponent } from '../pages/admin/admin.component';
import { RouterModule } from '@angular/router';
import { MaterialsModule } from '../materials/materials.module';
import { FormsModule } from '@angular/forms';

import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
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
    AngularFireStorageModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireAuthModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireDatabaseModule,
  ]
})
export class LazyLoadModule { }
