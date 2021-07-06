import React from 'react'
import  IconIon from 'react-native-vector-icons/Ionicons'

import { Container, Description } from './styles'

interface NotFoundProps {
  description: string;
  children?: React.ReactNode;
}

const NotFound: React.FC<NotFoundProps> = ({ description, children }: NotFoundProps) => {
  return (
    <Container>
      <IconIon name="md-document-text-outline" size={45} color="#999" />
      <Description>{description}</Description>
      {children}
    </Container>
  )
}

export default NotFound
