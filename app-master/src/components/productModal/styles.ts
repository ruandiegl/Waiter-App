import styled from 'styled-components/native';

export const Image = styled.ImageBackground`
  width: 100%;
  height: 200px;
  align-items: flex-end;
`;

export const CloseButton = styled.TouchableOpacity`
 align-items: center;
 justify-content: center;
  width: 32px;
  height: 32px;
  background: rgba(0, 0, 0, 0.5);
  border-radius: 16px;
  margin: 24px;
`;

export const ModalBody = styled.View`
  background-color: #fafafa;
  flex:1;
  padding: 32px 24px 0px;
`;

export const Header = styled.View`
`;

export const IngredientsContainer = styled.View`
  margin-top: 32px;
  flex: 1;
`;

export const Ingredient = styled.View`
    border: 1px solid rgba(204, 204, 204, 0.3);
    border-radius: 8px;
    padding: 16px;
    flex-direction: row;
    align-items: center;
    margin-bottom: 4px;

`;

export const Footer = styled.View`
  min-height: 110px;
  background-color: #fafafa;
  padding: 16px 24px;
`;

export const FooterContainer = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const PriceContainer = styled.View`

`;
