import { FlatList, TouchableOpacity } from 'react-native';
import { CartItem } from '../../types/CartItem';
import { Actions, Item, ProductContainer, Image, QuantityContainer, ProductDetails, Sumary, TotalContainer } from './styles';
import { Text } from '../Text';
import { formatCurrency } from '../../util/formatCurrency';
import { MinusCircle } from '../Icons/MinusCircle';
import { PlusCircle } from '../Icons/PlusCircle';
import { products } from '../../mocks/products';
import { Button } from '../Button';
import { Product } from '../../types/Product';
import { OrderConfirmedModal } from '../OrderConfirmedModal';
import { useState } from 'react';
import { api } from '../../util/api';

interface CartProps {
  cartItems: CartItem[];
  onAdd: (products: Product) => void;
  onDecrement: (products: Product) => void;
  onConfirmOrder: () => void;
  selectedTable: string;
}

export function Cart({ cartItems, onAdd, onDecrement, onConfirmOrder, selectedTable }: CartProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const total = cartItems.reduce((acc, cartItem) => {
    return acc + cartItem.quantity * cartItem.product.price;
  }, 0);

  async function handleConfirmOrder() {
    setIsLoading(true);

    const payload = {
      table: selectedTable,
      products: cartItems.map(cartItems => ({
        product: cartItems.product._id,
        quantity: cartItems.quantity,
      })),
    };
    await api.post('/Orders', payload);
    setIsLoading(false);
    setIsModalVisible(true);
  }

  function handleOk() {
    setIsModalVisible(false);
    onConfirmOrder();
  }
  return (
    <>

      <OrderConfirmedModal
        visible={isModalVisible}
        onOk={handleOk}
      >

      </OrderConfirmedModal>
      {cartItems.length > 0 && (
        <FlatList
          data={cartItems}
          keyExtractor={cartItems => cartItems.product._id}
          showsVerticalScrollIndicator={false}
          style={{ marginBottom: 20, maxHeight: 140 }}
          renderItem={({ item: cartItem }) => (
            <Item>
              <ProductContainer>
                <Image
                  source={{
                    uri: `http://192.168.29.165:3001/uploads/${cartItem.product.imagePath}`,
                  }}
                />
                <QuantityContainer>
                  <Text size={14} color="#666">
                    {cartItem.quantity}x
                  </Text>
                </QuantityContainer>
                <ProductDetails>
                  <Text size={14} weight="600">{cartItem.product.name}</Text>
                  <Text size={14} color="#666" style={{ marginTop: 4 }}>
                    {formatCurrency(cartItem.product.price * cartItem.quantity)}
                  </Text>
                </ProductDetails>
              </ProductContainer>
              <Actions>
                <TouchableOpacity onPress={() => onAdd(cartItem.product)}>
                  <PlusCircle />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{ marginLeft: 24 }}
                  onPress={() => onDecrement(cartItem.product)}>
                  <MinusCircle />
                </TouchableOpacity>
              </Actions>
            </ Item>
          )}
        />
      )}
      <Sumary>
        <TotalContainer>
          {cartItems.length > 0 ? (
            <>
              <Text color="#666">Total</Text>
              <Text size={20} weight="600">{formatCurrency(total)}</Text>
            </>
          ) : (
            <Text color="#999">Seu Carrinho está vazio</Text>
          )}
        </TotalContainer>

        <Button
          onPress={handleConfirmOrder}
          disabled={cartItems.length === 0}
          loading={isLoading}
        >
          Confirmar Pedido
        </Button>
      </Sumary >

    </>
  );
}
