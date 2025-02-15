/**
 * Service responsible for managing modal notifications in the application.
 * Uses RxJS Subject to handle modal state and visibility.
 */

import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

/**
 * Interface defining the configuration for modal messages
 * @interface ModalConfig
 * @property {string} message - The text content to be displayed in the modal
 * @property {'success' | 'error'} type - The type of modal, either success or error
 */
export interface ModalConfig {
  message: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  /**
   * Subject to handle modal state changes
   * @private
   */
  private modalSubject = new Subject<ModalConfig | null>();

  /**
   * Observable stream of modal configurations
   * Components can subscribe to this to react to modal state changes
   */
  modal$ = this.modalSubject.asObservable();

  /**
   * Shows a modal with the provided configuration
   * Automatically hides the modal after 3 seconds
   * @param {ModalConfig} config - The configuration for the modal to be displayed
   */
  showModal(config: ModalConfig): void {
    this.modalSubject.next(config);
    // Auto hide after 3 seconds
    setTimeout(() => {
      this.hideModal();
    }, 3000);
  }

  /**
   * Hides the currently displayed modal
   * Emits null to clear the modal state
   */
  hideModal(): void {
    this.modalSubject.next(null);
  }
}