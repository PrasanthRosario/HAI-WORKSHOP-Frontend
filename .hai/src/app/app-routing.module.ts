import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { SignupComponent } from './signup/signup.component';

/**
 * Application routing configuration
 * Defines the mapping between URLs and components
 */
const routes: Routes = [
  // Route for the login page
  { path: 'login', component: LoginComponent },

  // Route for the signup page
  { path: 'signup', component: SignupComponent },

  // Admin dashboard route with authentication and role-based access
  { 
    path: 'admin/dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard],  // Protects route with authentication guard
    data: { role: 'admin' }    // Specifies admin role requirement
  },

  // User dashboard route with authentication and role-based access
  { 
    path: 'user/dashboard', 
    component: DashboardComponent,
    canActivate: [AuthGuard],  // Protects route with authentication guard
    data: { role: 'user' }     // Specifies user role requirement
  },

  // Default route redirect to login
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  // Wildcard route for undefined paths, redirects to login
  { path: '**', redirectTo: '/login' }
];

/**
 * AppRoutingModule
 * 
 * Angular module that handles the application's routing configuration
 * Imports RouterModule with the defined routes
 * Exports RouterModule for use in other parts of the application
 */
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }