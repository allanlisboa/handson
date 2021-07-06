import styled from 'styled-components/native'

import { colors, metrics } from '../../styles/globalStyles'

interface AccountButtonTitleProps {
  type: 'revenue' | 'expense';
}

export const Container = styled.View`
  flex: 1;
`

export const SearchContainer = styled.View`
  width: 100%;
  padding: ${metrics.basePadding}px;
`

export const Search = styled.View`
  width: 100%;
  position: relative;
`

export const SearchIcon = styled.View`
  position: absolute;
  left: 26px;
  top: 18px;
`

export const SearchInput = styled.TextInput`
  background-color: #EFEFEF;
  font-family: 'Roboto';
  height: 56px;
  padding: 0 15px;
  color: ${colors.darker};
  font-size: 15px;
  border-radius: 46px;
  padding-left: 60px;
`

export const Account = styled.View`
  width: 100%;
  position: relative;
  justify-content: center;
  margin-bottom: 12px;
`

export const AccountButton = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6
})`
  background-color: #fff;
  height: 56px;
  padding: 0 ${metrics.basePadding}px;
  justify-content: center;
  border-radius: 16px;
`

export const AccountButtonTitle = styled.Text<AccountButtonTitleProps>`
  font-family: 'Roboto';
  font-size: 15px;
  color: ${props => props.type === 'revenue' ? colors.success : colors.warning };
`

export const AccountActionDelete = styled.TouchableOpacity.attrs({
  activeOpacity: 0.6
})`
  position: absolute;
  right: ${metrics.basePadding}px;
`
