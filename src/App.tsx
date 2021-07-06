import 'react-native-gesture-handler'

import React, { useEffect } from 'react'
import { StatusBar } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import SplashScreen from 'react-native-splash-screen'

import { initDB } from './services/database/sqlite'

import MainStackScreen from './navigations'
import { Providers } from './hooks'

const App: React.FC = () => {
  useEffect(() => {
    async function initDatabase() {
      await initDB()
      SplashScreen.hide()
    }

    initDatabase()
  }, [])

  return (
    <Providers>
      <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />
      <NavigationContainer>
        <MainStackScreen />
      </NavigationContainer>
    </Providers>
  )
}

export default App
