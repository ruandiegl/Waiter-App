import styled from 'styled-components/native';
import { Platform, StatusBar } from 'react-native';

const isAndroid = Platform.OS === 'android';



export const Container = styled.SafeAreaView`
  margin-top: ${isAndroid ? `${StatusBar.currentHeight}px` : '0'};
  flex: 1;
  background: #fafafa;
`;


export const CategoriesContainer = styled.View`
  padding: 0px 24px;
  height: 73px;
  margin-top: 34px;

`;

export const MenuContainer = styled.View`

  flex: 1;
`;

export const Footer = styled.View`
  min-height: 110px;
  background-color: #fafafa;
  padding: 16px 24px;
`;

export const FooterContainer = styled.SafeAreaView`
`;

export const CenteredContainer = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;





