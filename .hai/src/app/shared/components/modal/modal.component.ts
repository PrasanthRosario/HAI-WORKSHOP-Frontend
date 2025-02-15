import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService, ModalConfig } from '../../services/modal.service';

/**
 * @description Modal component for displaying success and error messages
 * This component creates a toast-like notification that slides down from the top of the screen
 */
@Component({
  selector: 'app-modal',
  template: `
    <!-- Modal container that shows only when modalConfig is present -->
    <!-- Applies different styles based on the type of modal (success/error) -->
    <div *ngIf="modalConfig" 
         class="modal-container"
         [ngClass]="{'success': modalConfig?.type === 'success', 'error': modalConfig?.type === 'error'}">
      {{ modalConfig?.message }}
    </div>
  `,
  styles: [`
    /* Base styles for the modal container */
    .modal-container {
      position: fixed;
      top: 20px;
      left: 50%;
      transform: translateX(-50%);
      padding: 15px 30px;
      border-radius: 4px;
      color: white;
      font-weight: 500;
      z-index: 1000;
      animation: slideDown 0.3s ease-out;
    }

    /* Success modal styling */
    .success {
      background-color: #4caf50;
      box-shadow: 0 2px 5px rgba(76, 175, 80, 0.3);
    }

    /* Error modal styling */
    .error {
      background-color: #f44336;
      box-shadow: 0 2px 5px rgba(244, 67, 54, 0.3);
    }

    /* Animation for sliding down effect */
    @keyframes slideDown {
      from {
        transform: translate(-50%, -100%);
        opacity: 0;
      }
      to {
        transform: translate(-50%, 0);
        opacity: 1;
      }
    }
  `]
})
export class ModalComponent implements OnInit, OnDestroy {
  /** Stores the current modal configuration */
  modalConfig: ModalConfig | null = null;
  
  /** Subscription to handle modal service updates */
  private subscription: Subscription;

  /**
   * @constructor
   * @param modalService - Service for managing modal state
   */
  constructor(private modalService: ModalService) {
    // Subscribe to modal service updates
    this.subscription = this.modalService.modal$.subscribe(
      config => this.modalConfig = config
    );
  }

  /** Lifecycle hook for component initialization */
  ngOnInit(): void {}

  /**
   * Lifecycle hook for component destruction
   * Cleans up subscription to prevent memory leaks
   */
  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}