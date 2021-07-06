import React, { useEffect, useCallback } from 'react'
import { ActivityIndicator } from 'react-native'
import IconFe from 'react-native-vector-icons/Feather'
import { useAccounts } from '../../hooks/accounts'
import { useRoute, useNavigation } from '@react-navigation/native'
import Messages from '../../componets/Messages'
import { Account as AccountType, AccountWithParent } from '../../types/account'

import Content from '../../componets/Content'
import Input, { Label } from '../../componets/Input'
import { colors } from '../../styles/globalStyles'
import Modal from '../../componets/Modal'
import { Container } from './styles'
import { TouchableButton } from '../../componets/Button'

interface RouteParams {
  id: number;
}

const DetailsAccountScreen: React.FC = () => {
  const accounts = useAccounts()
  const navigation = useNavigation()

  const route = useRoute()

  useEffect(() => {
    if (route.params) {
      const { id } = route.params as RouteParams
      accounts.GetAccount(id)
    }

    return () => {
      accounts.setAccount({} as AccountWithParent)
      accounts.setParentLoading(true)
    }
  }, [])

  const handleDeleteAccount = useCallback(async () => {
    try {
      await accounts.DeleteAccount()
      Messages({ message: 'Conta excluída com sucesso' })
      navigation.navigate('AccountsScreen')
    } catch (error) {
      Messages({ message: 'Falha ao excluir Conta. Tente novamente!', type: 'error' })
    }
  }, [accounts, navigation])

  return (
    <Container>
      <Content>

        {accounts.parentLoading || !accounts.account.id && (
          <ActivityIndicator style={{ marginTop: 100 }} size="large" color={colors.primary} />
        )}

        {!accounts.parentLoading && accounts.account.id && (
          <>
            {accounts.account.parentAccount && (
              <>
                <Label>Conta pai</Label>
                <Input
                  placeholder="Conta pai"
                  defaultValue={`${accounts.account.parentAccount.code} - ${accounts.account.parentAccount.name}`}
                  autoCapitalize="characters"
                  placeholderTextColor='#9a9a9a'
                  keyboardType="numbers-and-punctuation"
                  returnKeyType="default"
                  editable={false}
                />
              </>
            )}

            <Label>Código</Label>
            <Input
              placeholder="Código"
              defaultValue={accounts.account.code}
              autoCapitalize="characters"
              placeholderTextColor='#9a9a9a'
              keyboardType="numbers-and-punctuation"
              returnKeyType="default"
              editable={false}
            />

            <Label>Nome</Label>
            <Input
              placeholder="Nome da conta"
              defaultValue={accounts.account.name}
              autoCapitalize="characters"
              placeholderTextColor='#9a9a9a'
              keyboardType="numbers-and-punctuation"
              returnKeyType="default"
              editable={false}
            />

            <Label>Tipo</Label>
            <Input
              placeholder="Tipo"
              defaultValue={accounts.account.type === 'revenue' ? 'Receita' : 'Despesa'}
              autoCapitalize="characters"
              placeholderTextColor='#9a9a9a'
              keyboardType="numbers-and-punctuation"
              returnKeyType="default"
              editable={false}
            />

            <Label>Aceita lançamento</Label>
            <Input
              placeholder="Aceita lançamento"
              defaultValue={accounts.account.launch === 'yes' ? 'Sim' : 'Não'}
              autoCapitalize="characters"
              placeholderTextColor='#9a9a9a'
              keyboardType="numbers-and-punctuation"
              returnKeyType="default"
              editable={false}
            />
          </>
        )}
      </Content>

      <Modal
        visible={accounts.modalDelete}
        icon={<IconFe name="trash" style={{ textAlign: 'center', marginBottom: 15 }} color={colors.danger} size={45} />}
        description="Deseja excluir a conta?"
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

export default DetailsAccountScreen
