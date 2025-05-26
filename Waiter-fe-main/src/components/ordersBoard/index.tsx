import { useState } from 'react';
import { toast } from 'react-toastify';

import { Board, OrdersContainer } from './styles';
import { Order } from '../../types/Order';
import { OrderModal } from '../OrderModal';
import { api } from '../../util/api';

interface OrderBoardProps {
  icon: string;
  title: string;
  orders: Order[];
  onCancelOrder: (orderId: string) => void;
  onChangeOrderStatus: (orderId: string, status: Order['status']) => void;
}


export function OrderBoard({ icon, title, orders, onCancelOrder, onChangeOrderStatus }: OrderBoardProps) {
  const [isModalvisible, setIsModalvisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<null | Order>(null);
  const [isLoading, setIsLoading] = useState(false);

  function hanndleOpenModal(order: Order) {
    setIsModalvisible(true);
    setSelectedOrder(order);
  }

  function handlecloseModal() {
    setIsModalvisible(false);
    setSelectedOrder(null);
  }

  async function handleChangeOrderStatus() {
    setIsLoading(true);

    const Status = selectedOrder?.status === 'WAITING'
      ? 'IN_PRODUCTION'
      : 'DONE';

    api.patch(`/orders/${selectedOrder?._id}`, { Status });

    toast.success(`O pedido da mesa ${selectedOrder?.table} teve o status alterado!`);
    onChangeOrderStatus(selectedOrder!._id, Status);
    setIsLoading(false);
    setIsModalvisible(false);
  }
  async function handleDeleteOrder() {
    setIsLoading(true);

    await new Promise(resolve => setTimeout(resolve, 1000));
    await api.delete(`/orders/${selectedOrder?._id}`);

    toast.success(`O pedido da mesa ${selectedOrder?.table} foi cancelado com sucesso`);
    onCancelOrder(selectedOrder!._id);
    setIsLoading(false);
    setIsModalvisible(false);
  }


  return (
    <Board>
      <OrderModal
        visible={isModalvisible}
        order={selectedOrder}
        onClose={handlecloseModal}
        onCancelOrder={handleDeleteOrder}
        onChangeOrderStatus={handleChangeOrderStatus}
        isLoading={isLoading}
      />
      <header>
        <span>{icon}</span>
        <strong>{title}</strong>
        <span>({orders.length})</span>
      </header>

      {orders.length > 0 && (
        <OrdersContainer>
          {orders.map((order) => (
            <button
              type='button'
              onClick={() => hanndleOpenModal(order)}
              key={order._id}>
              <strong>mesa {order.table}</strong>
              <span>{order.products.length} itens</span>
            </button>
          ))}

        </OrdersContainer>
      )}
    </Board>
  );
}
