import { Modal, TouchableOpacity, Platform } from 'react-native';
import { Form, Header, Input, ModalBody, Overlay } from './styles';
import { Close } from '../Icons/Close';
import { Button } from '../Button';
import { useState } from 'react';
import { Text } from '../Text';

interface TableModalProps {
  visible: boolean;
  onClose: () => void;
  onSave: (table: string) => void;
}

export function TableModal({ visible, onClose, onSave}: TableModalProps) {
  const [Table, setTable] = useState('');

  function handleSave() {
    setTable('');
    onSave(Table);
    onClose();
  }

  return (
    <Modal
      visible={visible}
      transparent
      animationType='fade'
      onRequestClose={onClose}
    >
      <Overlay behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
        <ModalBody>
          <Header>
            <Text weight="600">Informe a Mesa</Text>
            <TouchableOpacity onPress={onClose}>
              <Close color='#666' />
            </TouchableOpacity>
          </Header>

          <Form>
            <Input
              placeholder='Numero da mesa'
              placeholderTextColor='#666'
              keyboardType='number-pad'
              onChangeText={setTable}
            />
          </Form>

          <Button onPress={handleSave} disabled={Table.length === 0}>
            Salvar
          </Button>
        </ModalBody>
      </Overlay>
    </Modal>
  );
}
