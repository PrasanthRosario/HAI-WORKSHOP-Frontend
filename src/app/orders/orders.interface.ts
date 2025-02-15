export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED'
}

export enum OrderAction {
  CANCEL = 'CANCEL',
  REFUND = 'REFUND'
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

export interface OrderActionResponse {
  success: boolean;
  message: string;
  order?: {
    orderId: string;
    status: OrderStatus;
    actionPerformed: OrderAction;
    actionDate: string;
  };
}

export interface OrderActionError {
  message: string;
  statusCode: number;
  details?: {
    action: OrderAction;
    reason: string;
  };
}
