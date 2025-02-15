import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

export interface ModalConfig {
  message: string;
  type: 'success' | 'error';
}

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  private modalSubject = new Subject<ModalConfig | null>();
  modal$ = this.modalSubject.asObservable();

  showModal(config: ModalConfig): void {
    this.modalSubject.next(config);
    // Auto hide after 3 seconds
    setTimeout(() => {
      this.hideModal();
    }, 3000);
  }

  hideModal(): void {
    this.modalSubject.next(null);
  }
}
