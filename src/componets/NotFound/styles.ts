import styled from 'styled-components/native'
import { metrics } from '../../styles/globalStyles'

export const Container = styled.View`
  align-items: center;

  padding: ${metrics.basePadding}px;
`

export const Description = styled.Text`
  margin-top: 10px;
  margin-bottom: 25px;
  font-size: 15px;
  font-family: 'Roboto';
  text-align: center;
  color: #999;
  max-width: 200px;
  line-height: 22px;
`
