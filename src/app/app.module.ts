import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatCardModule } from '@angular/material/card';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { MatTableModule } from '@angular/material/table';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { TaskDisplayPipe } from 'app/pipes/task-display.pipe';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireDatabaseModule } from '@angular/fire/compat/database';
import { CountdownModule } from 'ngx-countdown';
import { CountdownComponent } from 'app/countdown-component/countdown.component';
import { TimeDisplayPipe } from 'app/pipes/time-display.pipe';
import { AddTaskComponent } from './add-task/add-task.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { TasksComponent } from './tasks/tasks.component';
import { SkincareComponent } from './skincare/skincare.component';
import { RouterModule } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTabsModule } from '@angular/material/tabs';
import { MatDividerModule } from '@angular/material/divider';
import { RoutineModalComponent } from './routine-modal/routine-modal.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';

export const firebaseConfig = {
  apiKey: 'AIzaSyBH-FmWYidPPISHzo4uwIpjExU_wC38dIw',
  authDomain: 'maks-egi.firebaseapp.com',
  databaseURL:
    'https://maks-egi-default-rtdb.europe-west1.firebasedatabase.app',
  projectId: 'maks-egi',
  storageBucket: 'maks-egi.appspot.com',
  messagingSenderId: '429288672997',
  appId: '1:429288672997:web:8fea753b4edf4e30120e0c',
};

@NgModule({
  declarations: [
    AppComponent,
    TaskDisplayPipe,
    CountdownComponent,
    TimeDisplayPipe,
    AddTaskComponent,
    TasksComponent,
    SkincareComponent,
    RoutineModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000',
    }),
    BrowserAnimationsModule,
    MatToolbarModule,
    CdkAccordionModule,
    MatCardModule,
    MatTableModule,
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireDatabaseModule,
    CountdownModule,
    MatCheckboxModule,
    MatDialogModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatSortModule,
    RouterModule,
    MatMenuModule,
    MatBadgeModule,
    MatTabsModule,
    MatDividerModule,
    MatSlideToggleModule,

    // provideFirebaseApp(() => initializeApp(firebaseConfig)),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
