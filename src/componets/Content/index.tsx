import React from 'react'
import { ScrollView, KeyboardAvoidingView, Platform } from 'react-native'
import { metrics } from '../../styles/globalStyles'

import {
  Container,
  Header,
  Title,
  Description
} from './styles'

interface ContentProps {
  title?: string;
  description?: string;
  children: React.ReactNode;
  disableRadius?: boolean;
}

const Content: React.FC<ContentProps> = ({ title, description, children, disableRadius}) => {
  return (
    <Container disableRadius={disableRadius}>
      <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <ScrollView
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={{ padding: metrics.basePadding }}
      >
      {(title || description) && (
          <Header>
            {title && (
              <Title>{title}</Title>
            )}
            {description && (
              <Description>{description}</Description>
            )}
          </Header>
        )}
        {children}
      </ScrollView>
    </KeyboardAvoidingView>
    </Container>
  )
}

export default Content
