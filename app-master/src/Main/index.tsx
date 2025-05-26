import { ActivityIndicator } from 'react-native';
import { useEffect, useState } from 'react';

import { Container, CategoriesContainer, Footer, MenuContainer, CenteredContainer } from './styles';

import { Header } from '../components/Header';
import { Menu } from '../components/Menu';
import { Categories } from '../components/Categories';
import { Button } from '../components/Button';
import { TableModal } from '../components/TableModal';
import { Cart } from '../components/cart';

import { CartItem } from '../types/CartItem';
import { Product } from '../types/Product';

import { products as mockProducts } from '../mocks/products';
import { categories as mockCategories } from '../mocks/categories';
import { Empty } from '../components/Icons/Empty';
import { Text } from '../components/Text';
import { Category } from '../types/category';
import { api } from '../util/api';

export function Main() {
  const [istableModalVisible, setIsTableModalVisible] = useState(false);
  const [selectedTable, setSelectedTable] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoadingProducts, setIsloadingProducts] = useState(false);

  useEffect(() => {
    Promise.all([
      api.get('/categories'),
      api.get('/products')
    ]).then(([categoriesResponse, productsResponse]) => {
      setCategories(categoriesResponse.data);
      setProducts(productsResponse.data);
      setIsLoading(false);
    });
  }, []);

  async function handleSelectCategories(categoryId: string) {
    const route = !categoryId
      ? '/products'
      : `/categories/${categoryId}/products`;

    setIsloadingProducts(true);
    await new Promise((resolve => setTimeout(resolve, 1000)));
    const { data } = await api.get(route);
    setProducts(data);
    setIsloadingProducts(false);
  }

  function handleSaveTable(table: string) {
    setSelectedTable(table);
  }

  function handleResetOrder() {
    setSelectedTable('');
    setCartItems([]);
  }

  function handleAddToCart(product: Product) {
    if (!selectedTable) {
      setIsTableModalVisible(true);
    }
    setCartItems((prevState) => {
      const itemsIndex = prevState.findIndex(
        cartItems => cartItems.product._id === product._id);

      if (itemsIndex < 0) {
        return prevState.concat({
          quantity: 1,
          product

        });
      }
      const newCartItems = [...prevState];
      const item = newCartItems[itemsIndex];

      newCartItems[itemsIndex] = {
        ...item,
        quantity: item.quantity + 1,
      };

      return newCartItems;
    });
  }

  function handleDecrementCartItem(product: Product) {

    setCartItems((prevState) => {
      const itemsIndex = prevState.findIndex(
        cartItems => cartItems.product._id === product._id);

      const item = prevState[itemsIndex];
      const newCartItems = [...prevState];

      if (item.quantity === 1) {

        newCartItems.splice(itemsIndex, 1);
        return newCartItems;
      }

      newCartItems[itemsIndex] = {
        ...item,
        quantity: item.quantity - 1,
      };

      return newCartItems;
    });
  }

  return (
    <>
      <Container>
        <Header
          onCancelOrder={handleResetOrder}
          selectedTable={selectedTable} />
        {isLoading && (
          <CenteredContainer>
            <ActivityIndicator color="#d73035" size={'large'} />
          </CenteredContainer>
        )}

        <CategoriesContainer>
          <Categories
            categories={categories}
            onSelectCategories={handleSelectCategories}
          />
        </CategoriesContainer>

        {isLoadingProducts ? (
          <CenteredContainer>
            <ActivityIndicator color="#d73035" size={'large'} />
          </CenteredContainer>
        ) : (
          <>
            {!isLoading && (
              <>

                {products.length > 0 ? (
                  <MenuContainer>
                    <Menu
                      products={products}
                      onAddToCart={handleAddToCart} />
                  </MenuContainer>
                ) : (
                  <CenteredContainer>
                    <Empty />
                    <Text color="#666" style={{ marginTop: 24 }}>Nenhum produto encontrado</Text>
                  </CenteredContainer>
                )}
              </>
            )}
          </>
        )}
      </Container>
      <Footer>
        {!selectedTable && (
          <Button
            disabled={isLoading}
            onPress={() => setIsTableModalVisible(true)}>
            Novo Pedido
          </Button>
        )}

        {selectedTable && (
          <Cart
            onAdd={handleAddToCart}
            onDecrement={handleDecrementCartItem}
            cartItems={cartItems}
            onConfirmOrder={handleResetOrder}
            selectedTable={selectedTable}
          />
        )}
      </Footer>
      <TableModal
        onClose={() => setIsTableModalVisible(false)}
        visible={istableModalVisible}
        onSave={handleSaveTable}
      />
    </>
  );
}
