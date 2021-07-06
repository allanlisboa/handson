import React, { useRef, useEffect } from 'react'
import { ActivityIndicator } from 'react-native'
import SelectDropdown from 'react-native-select-dropdown'
import IconAnt from 'react-native-vector-icons/AntDesign'
import IconEnt from 'react-native-vector-icons/Entypo'
import { Launch, Types } from '../../types/form'
import { useAccounts } from '../../hooks/accounts'
import { useRegister } from '../../hooks/register'

import Content from '../../componets/Content'
import Input, { Label, Err } from '../../componets/Input'
import { colors, dropDown } from '../../styles/globalStyles'
import Modal from '../../componets/Modal'
import { Container } from './styles'
import { TouchableButton } from '../../componets/Button'

const CreateAccountScreen: React.FC = () => {
  const accounts = useAccounts()
  const register = useRegister()

  const dropdownRef = useRef<any>(null)

  useEffect(() => {
    accounts.GetParents()

    return () => {
      register.resetFields()
      accounts.setParentLoading(true)
    }
  }, [])

  useEffect(() => {
    if(accounts.parentNames && accounts.parentNames.length === 0) {
      register.setCode('1')
    }

    if(accounts.parentNames && accounts.parentNames.length > 0) {
      register.generateChildrenCode()
    }
  }, [accounts.parentNames])

  useEffect(() => {
    if(!register.parent) {
      dropdownRef?.current?.reset()
    }
  }, [register.parent])

  return (
    <Container>
      <Content>

      {accounts.parentLoading && (
        <ActivityIndicator style={{ marginTop: 100 }} size="large" color={colors.primary} />
      )}

      {!accounts.parentLoading && (
        <>
          {accounts.parentNames && accounts.parentNames.length > 0 && (
            <>
              <Label>Conta pai</Label>
              <SelectDropdown
                data={accounts.parentNames}
                onSelect={(value: string, index: number) => {
                  register.generateChildrenCode(accounts.parents[index])
                }}
                defaultButtonText='Selecione'
                renderDropdownIcon={() => <IconAnt name="caretdown" color={colors.regular} size={12} />}
                buttonStyle={dropDown.button}
                buttonTextStyle={dropDown.buttonText}
                dropdownStyle={{...dropDown.dropDownContainer, height: 230}}
                rowStyle={dropDown.row}
                rowTextStyle={dropDown.rowText}
                ref={dropdownRef}
              />
            </>
          )}

          <Label>Código</Label>
          <Input
            placeholder="Código"
            defaultValue={register.code || ''}
            autoCapitalize="none"
            placeholderTextColor='#9a9a9a'
            keyboardType="numbers-and-punctuation"
            returnKeyType="default"
            style={ register.codeError && { borderWidth: 1, borderColor: colors.danger }}
            onChangeText={(text) => {
              register.setCode(text)
              register.setCodeError(false)
              register.setParent(null)
            }}
            onBlur={() => accounts.checkChildrenCode()}
          />
          {register.codeError && (
            <Err>Código inválido</Err>
          )}

          <Label>Nome</Label>
          <Input
            placeholder="Nome da conta"
            autoCapitalize="words"
            placeholderTextColor='#9a9a9a'
            keyboardType="numbers-and-punctuation"
            returnKeyType="default"
            style={ register.nameError && { borderWidth: 1, borderColor: colors.danger }}
            onChangeText={(text) => {
              register.setName(text)
              register.setNameError(false)
            }}
          />
          {register.nameError && (
            <Err>Nome inválido</Err>
          )}

          {!register.parent && (
            <>
              <Label>Tipo</Label>
              <SelectDropdown
                data={Object.values(Types)}
                onSelect={(value: string) => {
                  register.setType(value === 'Receita' ? 'revenue' : 'expense')
                  register.setTypeError(false)
                }}
                defaultButtonText='Selecione'
                renderDropdownIcon={() => <IconAnt name="caretdown" color={colors.regular} size={12} />}
                buttonStyle={register.typeError ? { ...dropDown.button, borderWidth: 1, borderColor: colors.danger } : dropDown.button}
                buttonTextStyle={dropDown.buttonText}
                dropdownStyle={dropDown.dropDownContainer}
                rowStyle={dropDown.row}
                rowTextStyle={dropDown.rowText}
              />
              {register.typeError && (
                <Err>Selecione um tipo</Err>
              )}
            </>
          )}

          <Label>Aceita lançamentos</Label>
          <SelectDropdown
            data={Object.values(Launch)}
            onSelect={(value: string) => {
              register.setLaunch(value === 'Sim' ? 'yes' : 'no')
              register.setLaunchError(false)
            }}
            defaultButtonText='Selecione'
            renderDropdownIcon={() => <IconAnt name="caretdown" color={colors.regular} size={12} />}
            buttonStyle={register.launchError ? { ...dropDown.button, borderWidth: 1, borderColor: colors.danger } : dropDown.button}
            buttonTextStyle={dropDown.buttonText}
            dropdownStyle={dropDown.dropDownContainer}
            rowStyle={dropDown.row}
            rowTextStyle={dropDown.rowText}
          />
          {register.launchError && (
            <Err>Selecione um item</Err>
          )}
        </>
      )}

      </Content>

      <Modal
        visible={register.isError}
        icon={<IconEnt name="emoji-sad" style={{ textAlign: 'center', marginBottom: 15 }} color={colors.danger} size={45} />}
        description={register.isErrorMessage}
        button={
          <TouchableButton
            color={colors.danger}
            onPress={() => register.toggleIsError()}
          >
            Ok!
          </TouchableButton>
        }
      />
    </Container>
  )
}

export default CreateAccountScreen
