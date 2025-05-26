import { FlatList } from 'react-native';
import { useState } from 'react';

import { AddToCartButton, ContainerProduct, ProductDetails, ProductImage, Separator } from './styles';

import { formatCurrency } from '../../util/formatCurrency';
import { Text } from '../Text';
import { PlusCircle } from '../Icons/PlusCircle';
import { ProductModal } from '../productModal';
import { Product } from '../../types/Product';


interface MenuProps {
  onAddToCart: (product: Product) => void;
  products: Product[];
}

export function Menu({ onAddToCart, products }: MenuProps) {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<null | Product>(null);

  function handleOpenModal(product: Product) {
    setSelectedProduct(product);
    setIsModalVisible(true);
  }
  return (
    <>
      <ProductModal
        visible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
        product={selectedProduct}
        onAddToCart={onAddToCart}
      />
      <FlatList
        data={products}
        contentContainerStyle={{ paddingHorizontal: 24 }}
        style={{ marginTop: 32 }}
        ItemSeparatorComponent={Separator}
        keyExtractor={product => product._id}
        renderItem={({ item: product }) => {
          return (

            <ContainerProduct onPress={() => handleOpenModal(product)}>
              <ProductImage
                source={{
                  uri: `http://192.168.29.165:3001/uploads/${product.imagePath}`
                }}

              />
              <ProductDetails>
                <Text weight="600">{product.name}</Text>
                <Text size={14} color="#666" style={{ marginVertical: 8 }}>
                  {product.description}
                </Text>
                <Text size={14} color="#666" style={{ marginVertical: 8 }}>
                  {formatCurrency(product.price)}
                </Text>
              </ProductDetails>

              <AddToCartButton onPress={() => onAddToCart(product)}>
                <PlusCircle />
              </AddToCartButton>
            </ContainerProduct>
          );
        }}
      />
    </>
  );
}

