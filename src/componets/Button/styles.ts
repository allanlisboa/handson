import styled, { css } from 'styled-components/native'
import { RectButton } from 'react-native-gesture-handler'

import { colors } from '../../styles/globalStyles'

interface ButtonProps {
  filled?: boolean;
  bordered?: boolean;
  color?: string;
  shadow?: boolean;
  marginTop?: number;
  flex?: number;
}

interface ButtonTextProps {
  size?: number,
  color?: string
}

export const Rec = styled(RectButton) <ButtonProps>`
  width: 100%;
  height: 44px;
  border-radius: 22px;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  background-color: ${props => props.filled ? '#fff' : props.color || colors.secondary};

  ${props => props.shadow && css`
    shadow-color: #000;
    shadow-opacity: 0.1;
    shadow-offset: 2px 2px;
    shadow-radius: 4;
    elevation: 4;
  `}

  ${props => props.marginTop && css`
    margin-top: ${props.marginTop}px;
  `}

  ${props => props.bordered && props.filled && css`
    border-width: 1px;
    border-color: ${props.color};
  `}
`

export const Touchable = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6
 })<ButtonProps>`
  flex: ${props => props.flex ? props.flex : 1};
  height: 44px;
  border-radius: 22px;
  justify-content: center;
  align-items: center;
  flex-direction: row;

  background-color: ${props => props.filled ? '#fff' : props.color || colors.secondary};

  ${props => props.shadow && css`
    shadow-color: #000;
    shadow-opacity: 0.1;
    shadow-offset: 2px 2px;
    shadow-radius: 4;
    elevation: 4;
  `}

  ${props => props.marginTop && css`
    margin-top: ${props.marginTop}px;
  `}

  ${props => props.bordered && props.filled && css`
    border-width: 1px;
    border-color: ${props.color};
  `}
`

export const ButtonText = styled.Text<ButtonTextProps>`
  font-size: ${props => props.size || 13}px;
  font-family: 'Roboto';
  font-size: 15px;
  color: ${props => props.color || colors.white};
`
