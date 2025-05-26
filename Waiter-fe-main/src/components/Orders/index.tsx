import { useEffect, useState } from 'react';
import SocketIo from 'socket.io-client';

import { Order } from '../../types/Order';
import { OrderBoard } from '../ordersBoard';
import { Container } from './styles';
import { api } from '../../util/api';


export function Orders() {
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    const socket = SocketIo('http://localhost:3001', {
      transports: ['websocket'],
    });

    socket.on('orders@new', (order: Order) => {
      setOrders((prevState) => [...prevState, order]);
    });
  }, []);

  useEffect(() => {
    api.get('/orders')
      .then(({ data }) => {
        setOrders(data);
      });
  }, []);

  const waiting = orders.filter(order => order.status === 'WAITING');
  const inProduction = orders.filter(order => order.status === 'IN_PRODUCTION');
  const done = orders.filter(order => order.status === 'DONE');

  function handleCancelOrder(orderID: string) {
    setOrders((prevState) => prevState.filter(order => order._id !== orderID));
  }
  function handleChangeOrderStatus(orderID: string, status: Order['status']) {
    setOrders((prevState) => prevState.map((order) => (
      order._id === orderID
        ? { ...order, status }
        : order
    )));
  }
  return (
    <Container>
      <OrderBoard
        icon="🕔"
        title="Em fila de espera"
        orders={waiting}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleChangeOrderStatus}
      />
      <OrderBoard
        icon="🍔"
        title="Em preparação"
        orders={inProduction}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleChangeOrderStatus}
      />
      <OrderBoard
        icon="✅"
        title="Pronto"
        orders={done}
        onCancelOrder={handleCancelOrder}
        onChangeOrderStatus={handleChangeOrderStatus}
      />

    </Container>
  );
}
