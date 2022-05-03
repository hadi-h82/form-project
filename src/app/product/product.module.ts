import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProductRoutingModule } from './product-routing.module';
import { SharedModule } from '../shared/shared.module';

import { RegisterProductComponent } from './register-product/register-product.component';
import { ProductListComponent } from './product-list/product-list.component';

@NgModule({
  declarations: [ProductListComponent, RegisterProductComponent],
  imports: [SharedModule, CommonModule, ProductRoutingModule],
})
export class ProductModule {}
