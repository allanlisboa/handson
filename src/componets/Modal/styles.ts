import styled from 'styled-components/native'
import { Platform } from 'react-native'

import { colors, metrics } from '../../styles/globalStyles'

export const Container = styled.KeyboardAvoidingView.attrs({
  behavior: Platform.OS === "ios" ? 'padding' : 'height'
})`
  flex: 1;
  background-color: ${colors.darkTransparent};
  justify-content: center;
  padding: ${metrics.basePadding * 2}px;
`

export const Content = styled.View`
  background-color: ${colors.white};
  padding: 30px;
  margin: 20px;
  border-radius: 16px;
  align-items: stretch;
  shadow-color: #000;
  shadow-opacity: 0.1;
  shadow-offset: 1px 1px;
  shadow-radius: 5;
  elevation: 3;
`

export const Title = styled.Text`
  color: #6C6C80;
  text-align: center;
  font-size: 15px;
  margin-bottom: 22px;
  font-weight: bold;
  font-family: 'Roboto';
`

export const Description = styled.Text`
  color: #6C6C80;
  text-align: center;
  font-size: 15px;
  line-height: 22px;
  font-weight: 500;
  font-family: 'Roboto';
`

export const Buttons = styled.View`
  flex-direction: row;
`
