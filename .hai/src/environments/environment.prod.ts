// This file contains environment-specific configuration for production mode

/**
 * Environment configuration object for production environment
 * @property {boolean} production - Flag indicating if app is running in production mode
 * @property {string} apiUrl - Base URL for API endpoints in production environment
 */
export const environment = {
  production: true,
  apiUrl: 'http://localhost:3000' // This should be updated with actual production API URL when deploying
};