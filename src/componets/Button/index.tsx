import React, { ReactNode } from 'react'
import { ActivityIndicator, TouchableWithoutFeedbackProps } from 'react-native'
import { RectButtonProperties } from 'react-native-gesture-handler'

import { Rec, Touchable, ButtonText } from './styles'

interface ButtonDefaultProps {
  children: string;
  color?: string;
  textColor?: string;
  shadow?: boolean;
  filled?: boolean;
  bordered?: boolean;
  marginTop?: number;
  loading?: boolean;
  loadingColor?: string;
  icon?: ReactNode;
  type?: 'rec' | 'touchable';
  flex?: number;
}

interface RecButtonProps extends ButtonDefaultProps, RectButtonProperties {}
interface TouchableButtonProps extends ButtonDefaultProps, TouchableWithoutFeedbackProps {}

const Button: React.FC<RecButtonProps> = ({
  children,
  color,
  icon: Icon,
  textColor,
  shadow,
  filled,
  bordered,
  marginTop,
  loading,
  loadingColor,
  enabled,
  ...rest
}) => {

  return (
    <Rec color={color} shadow={shadow} filled={filled} bordered={bordered} marginTop={marginTop} enabled={!loading} {...rest}>
      {loading ? (
        <ActivityIndicator color={loadingColor || '#fff'} />
      ) : (
          <>
          {Icon && Icon}
          <ButtonText color={textColor}>{children}</ButtonText>
          </>
        )}
    </Rec>
  )
}

export const TouchableButton: React.FC<TouchableButtonProps> = ({
  children,
  color,
  icon: Icon,
  textColor,
  shadow,
  filled,
  bordered,
  marginTop,
  loading,
  loadingColor,
  ...rest
}) => {

  return (
    <Touchable color={color} shadow={shadow} filled={filled} bordered={bordered} marginTop={marginTop} disabled={loading} {...rest}>
      {loading ? (
        <ActivityIndicator color={loadingColor || '#fff'} />
      ) : (
          <>
          {Icon && Icon}
          <ButtonText color={textColor}>{children}</ButtonText>
          </>
        )}
    </Touchable>
  )
}

export default Button
