/**
 * Authentication Guard for route protection in Angular application.
 * This guard implements CanActivate interface to control access to routes based on user authentication and role.
 */
@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  /**
   * Constructor for AuthGuard
   * @param router - Angular Router service for navigation
   * @param loginService - Service handling user authentication
   */
  constructor(
    private router: Router,
    private loginService: LoginService
  ) {}

  /**
   * Determines if a route can be activated based on user authentication and role requirements
   * @param route - The route being accessed
   * @returns boolean - true if access is allowed, false otherwise
   */
  canActivate(route: ActivatedRouteSnapshot): boolean {
    // Get current user from login service
    const user = this.loginService.getCurrentUser();

    // If no user is logged in, redirect to login page
    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    // Check if route requires specific role
    const requiredRole = route.data['role'] as string;
    if (requiredRole && user.role !== requiredRole) {
      // Redirect to appropriate dashboard based on user's role
      this.router.navigate([user.role === 'admin' ? '/admin/dashboard' : '/user/dashboard']);
      return false;
    }

    // Allow access if all checks pass
    return true;
  }
}