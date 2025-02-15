import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { OrdersComponent } from './orders.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    OrdersComponent
  ],
  imports: [
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    RouterModule
  ],
  exports: [
    OrdersComponent
  ]
})
export class OrdersModule { }
