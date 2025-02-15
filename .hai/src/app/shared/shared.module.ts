import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ModalComponent } from './components/modal/modal.component';
import { ModalService } from './services/modal.service';

/**
 * SharedModule is a feature module that contains components, directives, and services
 * that can be reused across different modules in the application.
 * 
 * This module follows the Angular best practice of creating shared modules
 * to organize and modularize reusable components.
 */
@NgModule({
  // Components, directives, and pipes that belong to this module
  declarations: [
    ModalComponent
  ],
  // Other modules whose exported classes are needed by component templates declared in this module
  imports: [
    CommonModule
  ],
  // Makes the components, directives, and pipes available for other modules to use
  exports: [
    ModalComponent
  ],
  // Services that this module contributes to the global collection of services
  providers: [
    ModalService
  ]
})
export class SharedModule { }