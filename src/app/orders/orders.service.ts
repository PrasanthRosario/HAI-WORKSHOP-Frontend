import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { OrderAction, OrderActionError, OrderActionResponse, OrderStatus, OrdersResponse } from './orders.interface';
import { catchError, map } from 'rxjs/operators';

import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

interface UpdateStatusResponse {
  success: boolean;
  message: string;
  order?: {
    orderId: string;
    status: OrderStatus;
  };
}

@Injectable({
  providedIn: 'root'
})
export class OrdersService {
  private readonly apiUrl = `${environment.apiUrl}/api/orders`;

  constructor(private http: HttpClient) {}

  getOrders(): Observable<OrdersResponse> {
    return this.http.get<OrdersResponse>(this.apiUrl)
      .pipe(catchError(this.handleError));
  }

  getUserOrders(userId: string): Observable<OrdersResponse> {
    return this.http.get<OrdersResponse>(`${this.apiUrl}/user/${userId}`)
      .pipe(catchError(this.handleError));
  }

  getOrderById(orderId: string): Observable<OrdersResponse> {
    return this.http.get<OrdersResponse>(`${this.apiUrl}/${orderId}`)
      .pipe(catchError(this.handleError));
  }

  updateOrderStatus(orderId: string, newStatus: OrderStatus): Observable<UpdateStatusResponse> {
    return this.http.patch<UpdateStatusResponse>(
      `${this.apiUrl}/${orderId}/status`,
      { status: newStatus }
    ).pipe(
      map(response => {
        if (!response.success) {
          throw new Error(response.message || 'Failed to update order status');
        }
        return response;
      }),
      catchError(this.handleError)
    );
  }

  processOrderAction(orderId: string, action: OrderAction): Observable<OrderActionResponse> {
    return this.http.post<OrderActionResponse>(
      `${this.apiUrl}/${orderId}/action`,
      { action }
    ).pipe(
      map(response => {
        if (!response.success) {
          throw new Error(response.message || `Failed to process ${action.toLowerCase()} action`);
        }
        return response;
      }),
      catchError(this.handleActionError)
    );
  }

  private handleActionError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    let details;
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = 'Invalid order action';
          details = error.error?.details;
          break;
        case 404:
          errorMessage = 'Order not found';
          break;
        case 403:
          errorMessage = 'Not authorized to perform this action';
          break;
        case 409:
          errorMessage = 'Order action cannot be processed';
          details = error.error?.details;
          break;
        default:
          errorMessage = error.error?.message || 'Server error';
      }
    }

    const actionError: OrderActionError = {
      message: errorMessage,
      statusCode: error.status,
      details: details
    };

    return throwError(() => actionError);
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    let errorMessage = 'An error occurred';
    
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = error.error.message;
    } else {
      // Server-side error
      switch (error.status) {
        case 400:
          errorMessage = 'Invalid order status';
          break;
        case 404:
          errorMessage = 'Order not found';
          break;
        case 403:
          errorMessage = 'Not authorized to update this order';
          break;
        default:
          errorMessage = error.error?.message || 'Server error';
      }
    }

    return throwError(() => ({
      message: errorMessage,
      statusCode: error.status
    }));
  }
}
