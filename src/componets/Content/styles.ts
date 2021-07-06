import styled from 'styled-components/native'
import { colors, metrics } from '../../styles/globalStyles'

interface ContainerProps {
  disableRadius?: boolean;
}

export const Container = styled.View<ContainerProps>`
  flex: 1;
  background-color: ${colors.background};
  border-top-left-radius: ${props => props.disableRadius ? 0 : 24 }px;
  border-top-right-radius: ${props => props.disableRadius ? 0 : 24 }px;
  margin-top: 10px;
`

export const Header = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${metrics.baseMargin};
`

export const Title = styled.Text`
  font-family: 'Roboto';
  color: ${colors.darker};
  font-size: 20px;
`

export const Description = styled.Text`
  font-family: 'Roboto';
  color: #A0A0B2;
  font-size: 15px;
`
