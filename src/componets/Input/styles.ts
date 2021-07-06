import styled from 'styled-components/native'
import { colors } from '../../styles/globalStyles'

export const Container = styled.TextInput`
  background-color: #fff;
  border-radius: 10px;
  height: 43px;
  flex: 1;
  color: ${colors.dark};
  font-size: 15px;
  font-family: 'Roboto';
  padding: 0 15px;
  margin-bottom: 10px;
`

export const LabelText = styled.Text`
  font-family: 'Roboto';
  font-size: 15px;
  font-weight: 600;
  color: ${colors.dark};
  margin-bottom: 5px;
`

export const ErrText = styled.Text`
  font-family: 'Roboto';
  font-size: 13px;
  color: ${colors.danger};
  margin-bottom: 10px;
  margin-top: -7px;
`
