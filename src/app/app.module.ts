import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { StudentEditorComponent } from './components/student-editor/student-editor.component';
import { TableStudentsComponent } from './components/table-students/table-students.component';
import { DialogEditWrapperComponent } from './components/student-editor/dialog-edit-wrapper/dialog-edit-wrapper.component';
import { HttpClientInMemoryWebApiModule } from 'angular-in-memory-web-api';
import { InMemoryDataService } from './service/in-memory-data.service';

@NgModule({
  declarations: [
    AppComponent,
    StudentEditorComponent,
    TableStudentsComponent,
    DialogEditWrapperComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatDialogModule,
    BrowserAnimationsModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    HttpClientInMemoryWebApiModule.forRoot(
      InMemoryDataService, { dataEncapsulation: false}
    ),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
