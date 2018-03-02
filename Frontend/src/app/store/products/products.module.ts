import { NgModule } from '@angular/core';

import { ThemeModule } from '../../@theme/theme.module';
import { ProductsRoutingModule } from './products-routing.module';

import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { ProductsComponent } from './products.component';

@NgModule({
  imports: [ThemeModule, ProductsRoutingModule,FormsModule,ReactiveFormsModule],
  declarations: [ProductsComponent],
  providers: []
})

export class ProductsModule {}
