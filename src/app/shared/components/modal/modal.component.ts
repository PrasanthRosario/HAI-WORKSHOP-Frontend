import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService, ModalConfig } from '../../services/modal.service';

@Component({
  selector: 'app-modal',
  template: `
    <div *ngIf="modalConfig" 
         class="modal-container"
         [ngClass]="{'success': modalConfig?.type === 'success', 'error': modalConfig?.type === 'error'}">
      {{ modalConfig?.message }}
    </div>
  `,
  styles: [`
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

    .success {
      background-color: #4caf50;
      box-shadow: 0 2px 5px rgba(76, 175, 80, 0.3);
    }

    .error {
      background-color: #f44336;
      box-shadow: 0 2px 5px rgba(244, 67, 54, 0.3);
    }

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
  modalConfig: ModalConfig | null = null;
  private subscription: Subscription;

  constructor(private modalService: ModalService) {
    this.subscription = this.modalService.modal$.subscribe(
      config => this.modalConfig = config
    );
  }

  ngOnInit(): void {}

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
