# Frontend

# Angular Project Documentation

This document provides essential information about the Angular project setup, development, and testing procedures.

## Project Setup
- Generated using Angular CLI version 14.1.2
- Built with standard Angular project structure and configurations

## Development Environment

### Local Development Server
- Command: `ng serve`
- Access URL: http://localhost:4200/
- Features hot-reload functionality for real-time development

### Component Generation
- Base command: `ng generate component component-name`
- Supports generation of multiple Angular artifacts:
  - Components
  - Directives
  - Pipes
  - Services
  - Classes
  - Guards
  - Interfaces
  - Enums
  - Modules

## Build Process
- Command: `ng build`
- Output location: `dist/` directory
- Creates production-ready artifacts

## Testing Framework

### Unit Testing
- Command: `ng test`
- Uses Karma test runner
- Reference: https://karma-runner.github.io

### End-to-End Testing
- Command: `ng e2e`
- Requires additional e2e testing package installation
- Flexible platform choice for testing

## Additional Resources
- Command for CLI help: `ng help`
- Comprehensive documentation: [Angular CLI Overview and Command Reference](https://angular.io/cli)