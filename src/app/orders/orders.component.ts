import { Component, OnInit } from '@angular/core';
import { Order, OrderStatus } from './orders.interface';

import { LoginService } from '../login/login.service';
import { OrdersService } from './orders.service';

type SortableFields = 'date' | 'status' | 'bookTitle';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent implements OnInit {
  orders: Order[] = [];
  filteredOrders: Order[] = [];
  isLoading = false;
  error: string | null = null;
  OrderStatus = OrderStatus;
  statusFilter: OrderStatus | 'ALL' = 'ALL';
  sortField: SortableFields = 'date';
  sortDirection: 'asc' | 'desc' = 'desc';
  isUpdating: boolean = false;
  updateError: string | null = null;

  constructor(
    private ordersService: OrdersService,
    private loginService: LoginService
  ) {}

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    this.isLoading = true;
    this.error = null;
    
    const currentUser = this.loginService.getCurrentUser();
    if (!currentUser) {
      this.error = 'User not authenticated';
      this.isLoading = false;
      return;
    }

    const orderObservable = currentUser.role === 'admin' 
      ? this.ordersService.getOrders()
      : this.ordersService.getUserOrders(currentUser.userId);

    orderObservable.subscribe({
      next: (response) => {
        if (response.success) {
          this.orders = response.orders;
          this.applyFilters();
        } else {
          this.error = response.message || 'Failed to load orders';
        }
      },
      error: (error) => {
        this.error = 'Error loading orders: ' + error.message;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }

  applyFilters(): void {
    let filtered = [...this.orders];

    // Apply status filter
    if (this.statusFilter !== 'ALL') {
      filtered = filtered.filter(order => order.status === this.statusFilter);
    }

    // Apply sorting
    filtered.sort((a, b) => {
      let comparison = 0;
      
      switch (this.sortField) {
        case 'date':
          comparison = new Date(a.date).getTime() - new Date(b.date).getTime();
          break;
        case 'status':
          comparison = a.status.localeCompare(b.status);
          break;
        case 'bookTitle':
          comparison = a.bookTitle.localeCompare(b.bookTitle);
          break;
      }

      return this.sortDirection === 'asc' ? comparison : -comparison;
    });

    this.filteredOrders = filtered;
  }

  onStatusFilterChange(event: Event): void {
    const status = (event.target as HTMLSelectElement).value as OrderStatus | 'ALL';
    this.statusFilter = status;
    this.applyFilters();
  }

  onSortChange(field: 'date' | 'status' | 'bookTitle'): void {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortField = field;
      this.sortDirection = 'asc';
    }
    this.applyFilters();
  }

  getSortIcon(field: string): string {
    if (this.sortField !== field) return 'fa-sort';
    return this.sortDirection === 'asc' ? 'fa-sort-up' : 'fa-sort-down';
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  }

  onStatusChange(orderId: string, event: Event): void {
    const select = event.target as HTMLSelectElement;
    const newStatus = select.value as OrderStatus;
    this.updateOrderStatus(orderId, newStatus);
  }

  private updateOrderStatus(orderId: string, newStatus: OrderStatus): void {
    this.isUpdating = true;
    this.updateError = null;

    this.ordersService.updateOrderStatus(orderId, newStatus).subscribe({
      next: (response) => {
        if (response.success && response.order) {
          // Update the order status in the local array
          const orderIndex = this.orders.findIndex(o => o.orderId === orderId);
          if (orderIndex !== -1) {
            this.orders[orderIndex].status = response.order.status;
            this.applyFilters();
          }
        }
      },
      error: (error) => {
        this.updateError = error.message;
      },
      complete: () => {
        this.isUpdating = false;
      }
    });
  }

  getStatusClass(status: OrderStatus): string {
    switch (status) {
      case OrderStatus.PENDING: return 'status-pending';
      case OrderStatus.PROCESSING: return 'status-processing';
      case OrderStatus.SHIPPED: return 'status-shipped';
      case OrderStatus.DELIVERED: return 'status-delivered';
      case OrderStatus.CANCELLED: return 'status-cancelled';
      default: return '';
    }
  }

  canUpdateStatus(currentStatus: OrderStatus): boolean {
    const currentUser = this.loginService.getCurrentUser();
    if (!currentUser) return false;

    // Only admin can update any status
    if (currentUser.role === 'admin') return true;

    // Users can only cancel pending orders
    return currentStatus === OrderStatus.PENDING;
  }

  getAvailableStatuses(currentStatus: OrderStatus): OrderStatus[] {
    const currentUser = this.loginService.getCurrentUser();
    if (!currentUser) return [];

    if (currentUser.role === 'admin') {
      // Admin can set any status except the current one
      return Object.values(OrderStatus).filter(status => status !== currentStatus);
    }

    // Users can only cancel pending orders
    if (currentStatus === OrderStatus.PENDING) {
      return [OrderStatus.CANCELLED];
    }

    return [];
  }
}
