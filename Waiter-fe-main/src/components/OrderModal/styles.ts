import styled from 'styled-components';

export const Overlay = styled.div`
  top: 0px;
  left: 0px;
  background: rgba(0, 0, 0, 0.8);
  backdrop-filter: blur(4.5px);
  width: 100%;
  height: 100%;
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const ModalBody = styled.div`
  width: 468px;
  max-width: 480px;
  background: #fff;
  border-radius: 8px;
  padding: 32px;

  header {
    display: flex;
    align-items: center;
    justify-content: space-between;

    strong {
      font-size: 24px;
      color: #333;
    }

    button {
      border: 0;
      background: none;
      line-height: 0;
    }
  }
  .status-container {
    margin-top: 32px;
    small {
      font-size: 14px;
      opacity: 0.8;
      color: #333;
    }
    div {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-top: 8px;
    }
  }
`;

export const OrderDetails = styled.div`
  margin-top: 32px;

  > strong {
    font-size: 14px;
    font-weight: 500;
    opacity: 0.8;
    color: #333;
  }

  .ordem-items {
    margin-top: 16px;

    .item {
      display: flex;

      & + .item {
        margin-top: 16px;
    }
      img {
        border-radius: 6px;
      }
      .quantity {
        margin-left: 12px;
        font-size: 14px;
        color: #666;
        display: block;
        min-width: 20px;
  }
      .product-details {
        margin-left: 4px;
      strong{
        display: block;
        margin-bottom: 4px;
      }
      span {
        font-size: 14px;
        color: #666;
      }
    }
  }
}
  .total {
    margin-top: 16px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 24px;

    span {
      font-weight: 500;
      font-size: 14px;
      opacity: 0.8;
    }
  }
`;
export const Actions = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 32px;

  button:disabled {
    opacity: 0.5;
    cursor: not-allowed
  }

  .primary {
    background: #333;
    border-radius: 48px;
    border: 0;
    color: #fff;
    padding: 12px 24px;
    align-items: center;
    justify-content: center;
    gap: 8px;
  }

  .secundary {
    background: transparent;
    border: 0;
    color: #D73035;
    font-weight: bold;
    margin-top: 12px;
    padding: 12px 24px;
  }
`;
