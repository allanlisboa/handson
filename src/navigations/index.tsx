import React from 'react'
import { ActivityIndicator, } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import Icon from 'react-native-vector-icons/MaterialIcons'
import IconFe from 'react-native-vector-icons/Feather'
import IconIon from 'react-native-vector-icons/Ionicons'
import { useAccounts } from '../hooks/accounts'
import { colors, metrics } from '../styles/globalStyles'

import AccountsScreen from '../screens/AccountsScreen'
import CreateAccountScreen from '../screens/CreateAccountScreen'
import DetailsAccountScreen from '../screens/DetailsAccountScreen'

const MainStack = createStackNavigator();
const MainStackScreen: React.FC = () => {
  const accounts = useAccounts()

  return (
    <MainStack.Navigator
      screenOptions={{
        cardStyle: { backgroundColor: colors.primary },
        headerTitleStyle: { fontSize: 22, color: '#fff', fontFamily: 'Roboto', fontWeight: '700' },
        headerTitleAlign: 'left',
        headerBackTitleVisible: false,
        headerLeftContainerStyle: { paddingLeft: metrics.basePadding },
        headerRightContainerStyle: { paddingRight: metrics.basePadding },
        headerStyle: {
          borderBottomWidth: 0,
          elevation: 0,
          shadowOpacity: 0,
          backgroundColor: colors.primary
        },
        headerLeft: ({ canGoBack, onPress }) => (
          canGoBack && <IconIon name="chevron-back" onPress={onPress} color="#fff" size={28} />
        ),
      }}
    >
      <MainStack.Screen
        name="AccountsScreen"
        component={AccountsScreen}
        options={({ navigation }) => (
          {
            title: 'Plano de Contas',
            headerRight: () => (
              <Icon name="add" size={28} onPress={() => navigation.navigate('CreateAccountScreen')} color='#fff' />
            )
          }
        )}
      />
      <MainStack.Screen
        name="CreateAccountScreen"
        component={CreateAccountScreen}
        options={({ navigation }) => ({
          title: 'Criar Conta',
          headerRight: () => ( accounts.saveLoading ? <ActivityIndicator color='#fff' /> :
            <IconFe name="check" size={28} onPress={() => accounts.StoreAccount(navigation)} color='#fff' />
          )
        })}
      />
      <MainStack.Screen
        name="DetailsAccountScreen"
        component={DetailsAccountScreen}
        options={{
          title: 'Detalhes da Conta',
          headerRight: () => ( accounts.saveLoading ? <ActivityIndicator color='#fff' /> :
            <IconFe name="trash" size={20} onPress={() => accounts.toggleModalDelete()} color='#fff' />
          )
        }}
      />
    </MainStack.Navigator>
  )
}

export default MainStackScreen
