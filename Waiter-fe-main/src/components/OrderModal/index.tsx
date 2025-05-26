import { ModalBody, Overlay, OrderDetails, Actions } from './styles';
import closeIcon from '../../assets/images/close-icon.svg';
import { Order } from '../../types/Order';
import { formatCurrency } from '../../util/formatCurrency/formatCurrency';
import { useEffect } from 'react';

interface OrderModalProps {
  visible: boolean;
  order: Order | null;
  onClose: () => void;
  onCancelOrder: () => Promise<void>;
  onChangeOrderStatus: () => void;
  isLoading: boolean;
}

export function OrderModal({
  visible,
  order,
  onClose,
  onCancelOrder,
  onChangeOrderStatus,
  isLoading }: OrderModalProps) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        onClose();
      }
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [onClose]);

  if (!visible || !order) {
    return null;
  }

  const total = order.products.reduce((total, { product, quantity }) => {
    return total + (product.price * quantity);
  }, 0);


  return (
    <div>
      <Overlay >
        <ModalBody>
          <header>
            <strong>Mesa {order.table}</strong>

            <button
              type='button'
              onClick={onClose}
              disabled={isLoading}
            >
              <img
                src={closeIcon}
                alt="Icone de fechar"
              />
            </button>
          </header>

          <div className="status-container">
            <small>Status do pedido</small>
            <div>
              <span>
                {order.status === 'WAITING' && '🕓'}
                {order.status === 'IN_PRODUCTION' && '👨‍🍳'}
                {order.status === 'DONE' && '✅'}
              </span>
              <strong>
                {order.status === 'WAITING' && 'Fila de espera'}
                {order.status === 'IN_PRODUCTION' && 'Em preparação'}
                {order.status === 'DONE' && 'Pronto!'}
              </strong>
            </div>
          </div>

          <OrderDetails>
            <strong>Items</strong>

            <div className="ordem-items">
              {order.products.map(({ _id, product, quantity }) => (
                <div className='item' key={_id}>
                  <img
                    src={`http://localhost:3001/uploads/${product.imagePath}`}
                    alt={product.imagePath}
                    width="56"
                    height="28.51"
                  />
                  <span className='quantity'>{quantity}x</span>

                  <div className="product-details">
                    <strong>{product.name}</strong>
                    <span>{formatCurrency(product.price)}</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="total">
              <span>Total</span>
              <strong>{formatCurrency(total)}</strong>
            </div>
          </OrderDetails>

          <Actions>
            {order.status !== 'DONE' && (
              <button
                className="primary"
                type='button'
                onClick={onChangeOrderStatus}
                disabled={isLoading}
              >
                <span>
                  {order.status === 'WAITING' && '👨‍🍳'}
                  {order.status === 'IN_PRODUCTION' && '✅'}
                </span>
                <span>
                  {order.status === 'WAITING' && 'Iniciar produção!'}
                  {order.status === 'IN_PRODUCTION' && 'Concluir pedido!'}
                </span>
              </button>
            )}

            <button
              className="secundary"
              onClick={onCancelOrder}
              disabled={isLoading}
            >
              <span>cancelar Pedido</span>
            </button>
          </Actions>
        </ModalBody>
      </Overlay>
    </div>
  );
}
