import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material-module';
import { FormComponent } from './form/form.component';
import { PopupComponent } from './popup/popup.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import{MatDialogModule} from '@angular/material/dialog';
import { UpdatelistComponent } from './updatelist/updatelist.component';
import{MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatRadioModule} from '@angular/material/radio';
import {MatInputModule} from '@angular/material/input';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import{HttpClientModule} from '@angular/common/http';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DeleteComponent } from './delete/delete.component';
import { ConfirmationPopoverModule } from 'angular-confirmation-popover';
import { ViewComponent } from './view/view.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatSortHeader } from '@angular/material/sort';
import { Ng2OrderModule } from 'ng2-order-pipe';
import { FilterPipe } from './filter.pipe';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    PopupComponent,
    UpdatelistComponent,
    DeleteComponent,
    ViewComponent,
    FilterPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    MatDialogModule,
    MatCheckboxModule,
    MatSelectModule,
    MatButtonToggleModule,
    MatRadioModule,
    MatInputModule,
    MatAutocompleteModule,
    HttpClientModule,
    MatFormFieldModule,
    ConfirmationPopoverModule.forRoot({
      confirmButtonType: 'danger', // set defaults here
    }),
    MatSelectModule,
    MatTableModule,
    Ng2OrderModule



  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents:[ViewComponent,FormComponent]
})
export class AppModule { }
