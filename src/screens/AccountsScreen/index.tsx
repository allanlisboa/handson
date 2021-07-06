import React, { useEffect, useCallback } from 'react'
import { ActivityIndicator } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import IconFe from 'react-native-vector-icons/Feather'
import { useAccounts } from '../../hooks/accounts'
import { useDebounce } from '../../hooks/debounce'
import { Account as AccountType } from '../../types/account'

import Content from '../../componets/Content'
import Modal from '../../componets/Modal'
import NotFound from '../../componets/NotFound'
import Messages from '../../componets/Messages'
import Button, { TouchableButton } from '../../componets/Button'
import { colors } from '../../styles/globalStyles'

import {
  Container,
  SearchContainer,
  Search,
  SearchInput,
  SearchIcon,
  Account,
  AccountButton,
  AccountButtonTitle,
  AccountActionDelete
} from './styles'

const AccountsScreen: React.FC = () => {
  const accounts = useAccounts()
  const navigation = useNavigation()
  const searchTerm = useDebounce(accounts.search, 500)

  useEffect(() => {
    accounts.GetAccounts()
  }, [])

  const handleDeleteAccount = useCallback(async () => {
    try {
      await accounts.DeleteAccount()
      Messages({ message: 'Conta excluída com sucesso' })
    }catch(error) {
      Messages({ message: 'Falha ao excluir Conta. Tente novamente!', type: 'error' })
    }
  }, [accounts])

  useEffect(() => {
    if(searchTerm){
      accounts.SearchAccounts(searchTerm)
    }
  }, [searchTerm])

  useEffect(() => {
    if(accounts.search.length === 0) {
      accounts.setSearchAccounts([])
      accounts.setAccountsCount(accounts.accounts.length)
    }
  }, [accounts.search])

  const renderItem = useCallback((account: AccountType) => {
    return (
      <Account key={account.id.toString()}>
        <AccountButton onPress={() => navigation.navigate('DetailsAccountScreen', { id: account.id })}>
          <AccountButtonTitle type={account.type}>{`${account.code} - ${account.name}`}</AccountButtonTitle>
        </AccountButton>
        <AccountActionDelete onPress={() => {
          accounts.toggleModalDelete()
          accounts.setDeleteItem(account)
        }}>
          <IconFe name="trash" color={colors.gray} size={20} />
        </AccountActionDelete>
      </Account>
    )
  }, [])

  const handleSubmit = useCallback(() => {
    accounts.SearchAccounts(accounts.search)
  }, [accounts])

  return (
    <Container>
      <SearchContainer>
        <Search>
          <SearchInput
            placeholder="Pesquisar conta"
            defaultValue={accounts.search}
            onChangeText={value => accounts.setSearch(value)}
            onSubmitEditing={() => handleSubmit()}
            onBlur={() => {
              accounts.setSearchAccounts([])
              accounts.setAccountsCount(accounts.accounts.length)
              accounts.setSearch('')
            }}
            returnKeyType="send"
          />
          <SearchIcon>
            <IconFe name="search" color={colors.gray} size={20} />
          </SearchIcon>
        </Search>
      </SearchContainer>

      <Content title="Listagem" description={`${accounts.accountsCount} registro(s)`}>
        {accounts.loading && (
          <ActivityIndicator style={{ marginTop: 100 }} size="large" color={colors.primary} />
        )}

        {accounts.accounts.length > 0 && accounts.search.length === 0 && !accounts.loading && accounts.accounts.map(account => renderItem(account))}

        {accounts.searchAccounts.length > 0 && !accounts.loading && accounts.searchAccounts.map(account => renderItem(account))}

        {(accounts.accounts.length < 1 || accounts.search.length > 0 && accounts.searchAccounts.length === 0) && !accounts.loading && (
          <NotFound description={`${accounts.search.length > 0 && accounts.searchAccounts.length === 0 ? 'Contas não encontradas' : "No momento você não possui contas registradas." }`}>
            <Button
              onPress={() => navigation.navigate('CreateAccountScreen')}
              color={colors.danger}
              style={{ width: 200 }}
            >
              Criar Conta
            </Button>
          </NotFound>
        )}
      </Content>

      <Modal
        visible={accounts.modalDelete}
        icon={<IconFe name="trash" style={{ textAlign: 'center', marginBottom: 15 }} color={colors.danger} size={45} />}
        description="Deseja excluir a conta"
        title={accounts.deleteItem?.code ? `${accounts.deleteItem?.code} - ${accounts.deleteItem?.name}?` : ''}
        button={
          <>
            <TouchableButton
              onPress={() => {
                accounts.toggleModalDelete()
                accounts.setDeleteItem({} as AccountType)
              }}
              filled
              textColor={colors.danger}
              disabled={accounts.deleteLoading}
            >
              Não!
            </TouchableButton>
            <TouchableButton
              color={colors.danger}
              onPress={() => handleDeleteAccount()}
              flex={2}
              loading={accounts.deleteLoading}
            >
              Com certeza
            </TouchableButton>
          </>
        }
      />
    </Container>
  )
}

export default AccountsScreen
