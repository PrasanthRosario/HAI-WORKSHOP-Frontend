export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export interface Order {
  orderId: string;
  userId: string;
  bookTitle: string;
  date: string;
  status: OrderStatus;
}

export interface OrdersResponse {
  success: boolean;
  orders: Order[];
  message?: string;
}
