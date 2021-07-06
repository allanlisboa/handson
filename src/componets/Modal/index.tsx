import React from 'react'
import { Modal as RNModal } from 'react-native'

import {
  Container,
  Content,
  Title,
  Description,
  Buttons
} from './styles'

interface ModalProps {
  visible: boolean;
  icon?: React.ReactNode;
  title?: React.ReactNode;
  description: React.ReactNode;
  button?: React.ReactNode | null;
  onRequestClose?: () => void | undefined;
}

const Modal: React.FC<ModalProps> = ({ icon, title, description, button = null, visible, onRequestClose }) => (
  <RNModal visible={visible} animationType="fade" transparent onRequestClose={onRequestClose}>
    <Container>
      <Content>
        {icon}
        <Description>{description}</Description>
        <Title>{title}</Title>
        {button && (
          <Buttons>
            {button}
          </Buttons>
        )}
      </Content>
    </Container>
  </RNModal>
)

export default Modal
