import { NgModule } from "@angular/core";
import{ MatPaginatorModule} from "@angular/material/paginator";
import {MatSortModule} from "@angular/material/sort";
import {MatFormFieldModule} from '@angular/material/form-field';

@NgModule({
  exports:[
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule

  ]
})

export class MaterialModule{


}
