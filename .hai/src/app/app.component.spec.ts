/**
 * Unit tests for the AppComponent
 */
import { TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
  // Set up testing environment before each test
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        RouterTestingModule  // Import RouterTestingModule for routing-related testing
      ],
      declarations: [
        AppComponent  // Declare the component being tested
      ],
    }).compileComponents();  // Compile all the components
  });

  /**
   * Test case to verify if the application component is created successfully
   */
  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);  // Create component instance
    const app = fixture.componentInstance;  // Get component instance
    expect(app).toBeTruthy();  // Verify component is created
  });

  /**
   * Test case to verify if the application title is set correctly
   */
  it(`should have as title 'Frontend'`, () => {
    const fixture = TestBed.createComponent(AppComponent);  // Create component instance
    const app = fixture.componentInstance;  // Get component instance
    expect(app.title).toEqual('Frontend');  // Verify title property value
  });

  /**
   * Test case to verify if the title is rendered correctly in the DOM
   */
  it('should render title', () => {
    const fixture = TestBed.createComponent(AppComponent);  // Create component instance
    fixture.detectChanges();  // Trigger change detection
    const compiled = fixture.nativeElement as HTMLElement;  // Get native DOM element
    // Verify if the rendered content contains expected text
    expect(compiled.querySelector('.content span')?.textContent).toContain('Frontend app is running!');
  });
});