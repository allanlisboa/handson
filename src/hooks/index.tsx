import React from 'react'

import { AccountsProvider } from './accounts'
import { RegisterProvider } from './register'

export const Providers: React.FC = ({ children }) => {
  return (
    <RegisterProvider>
      <AccountsProvider>
        {children}
      </AccountsProvider>
    </RegisterProvider>
  )
}
