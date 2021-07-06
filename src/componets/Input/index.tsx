import React from 'react'
import { TextInputProps } from 'react-native'

import { Container, LabelText, ErrText } from './styles'

const Input: React.FC<TextInputProps> = (props) => {
  return (
    <Container {...props} />
  )
}

export const Label: React.FC = ({ children }) => {
  return(
    <LabelText>{children}</LabelText>
  )
}

export const Err: React.FC = ({ children }) => {
  return(
    <ErrText>{children}</ErrText>
  )
}

export default Input
