/**
 * Root module of the Angular application.
 * This module bootstraps the application and declares the main components.
 */
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedModule } from './shared/shared.module';

@NgModule({
  // Components that belong to this module
  declarations: [
    AppComponent,        // Root component of the application
    SignupComponent,     // Component for user registration
    LoginComponent,      // Component for user authentication
    DashboardComponent   // Component for main dashboard view
  ],
  // External modules required by this module
  imports: [
    BrowserModule,           // Essential browser-specific services
    AppRoutingModule,        // Routing configuration
    ReactiveFormsModule,     // Support for reactive forms
    FormsModule,            // Support for template-driven forms
    HttpClientModule,       // Support for HTTP operations
    SharedModule,           // Custom shared module with common components
    BrowserAnimationsModule, // Support for animations
    CommonModule            // Common Angular directives and pipes
  ],
  providers: [],            // Services to be injected
  bootstrap: [AppComponent] // Component to bootstrap when application starts
})
export class AppModule { }