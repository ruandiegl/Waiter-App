import styled from 'styled-components/native';

import { Image as RNimage } from 'react-native';

export const Item = styled.View`
  padding: 8px 0;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const ProductContainer = styled.View`
  flex-direction: row;
`;

export const Name = styled.Text`
`;

export const Actions = styled.View`
  flex-direction: row;
`;

export const Image = styled(RNimage)`
  width: 48px;
  height: 40px;
  border-radius: 6px;

`;

export const QuantityContainer = styled.View`
  min-width: 20px;
  margin-left: 12px;
`;

export const ProductDetails = styled.View`

`;

export const Sumary = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;
export const TotalContainer = styled.View`
  margin-right: 32px;
  flex: 1;
  `;
