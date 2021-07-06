import React, { createContext, useContext, useCallback, useState } from 'react'
import { AccountReposiory } from '../services/database/repository/accounts'
import { useRegister } from './register'
import { Account, AccountWithParent } from '../types/account'
import Messages from '../componets/Messages'

interface AccountsContextData {
  accounts: Account[];
  accountsCount: number;
  searchAccounts: Account[];
  parents: Account[];
  parentNames: string[] | null;
  account: AccountWithParent;
  loading: boolean;
  deleteLoading: boolean;
  parentLoading: boolean;
  saveLoading: boolean;
  modalDelete: boolean;
  deleteItem: Account;
  search: string;
  setSearch: (param: string) => void;
  setAccountsCount: (param: number) => void;
  setModalDelete: (param: boolean) => void;
  setParentLoading: (param: boolean) => void;
  setSearchAccounts: (params: Account[]) => void;
  setAccount: (params: AccountWithParent) => void;
  toggleModalDelete: () => void;
  GetAccounts: () => Promise<void>;
  GetParents: () => Promise<void>;
  GetAccount: (id: number) => Promise<void>;
  SearchAccounts: (name: string) => Promise<void>;
  StoreAccount: (navigation: any) => Promise<void>;
  DeleteAccount: () => Promise<void>;
  setDeleteItem: (account: Account) => void;
  checkChildrenCode: () => Promise<boolean>;
}

const AccountsContext = createContext<AccountsContextData>({} as AccountsContextData)

export const AccountsProvider: React.FC = ({ children }) => {
  const [accounts, setAccounts] = useState<Account[]>([] as Account[])
  const [search, setSearch] = useState('')
  const [accountsCount, setAccountsCount] = useState(0)
  const [searchAccounts, setSearchAccounts] = useState<Account[]>([] as Account[])
  const [parents, setParents] = useState<Account[]>([] as Account[])
  const [parentNames, setParentNames] = useState<string[] | null>(null)
  const [account, setAccount] = useState<AccountWithParent>({} as AccountWithParent)
  const [modalDelete, setModalDelete] = useState(false)
  const [deleteItem, setDeleteItem] = useState<Account>({} as Account)
  const [loading, setLoading] = useState(true)
  const [deleteLoading, setDeleteLoading] = useState(false)
  const [parentLoading, setParentLoading] = useState(false)
  const [saveLoading, setSaveLoading] = useState(false)

  const accountRepository = AccountReposiory()
  const register = useRegister()

  const toggleModalDelete = useCallback(() => {
    setModalDelete(state => !state)
  }, [])

  const GetAccounts = useCallback(async () => {
    setAccounts([])
    setLoading(true)

    const response = await accountRepository.all()

    setAccounts(response || [])
    setAccountsCount(response?.length || 0)
    setLoading(false)
  }, [accountRepository])

  const StoreAccount = useCallback(async (navigation): Promise<void> => {
    setSaveLoading(true)

    const isCheckCode = await checkChildrenCode()

    const isError = register.validationFields()
    if(isError || !isCheckCode) {
      setSaveLoading(false)
      return
    }

    const data = {
      name: register.name,
      code: register.code,
      type: register.type,
      launch: register.launch,
      parent: register.parent
    } as Account

    await accountRepository.store(data)
    await GetAccounts()

    setSaveLoading(false)
    register.resetFields()
    Messages({ message: 'Conta criada com sucesso' })
    navigation.navigate('AccountsScreen')
  }, [accountRepository, register])

  const GetParents = useCallback(async (): Promise<void> => {
    setParents([])
    setParentLoading(true)

    const response = await accountRepository.findParents()
    if(response) {
      setParents(response || [])
      let names: string[] = []
      if(response.length > 0) {
        response.map(parent => {
          names.push(`${parent.code} - ${parent.name}`)
        })
      }

      setParentNames(names)
    }

    setParentLoading(false)
  }, [accountRepository])

  const GetAccount = useCallback(async (id: number): Promise<void> => {
    setAccount({} as Account)
    setParentLoading(true)

    let response = await accountRepository.find(id)
    if(response?.parent) {
      const parent = await accountRepository.find(response.parent)
      response = { ...response, parentAccount: parent} as AccountWithParent
    }

    setAccount(response || {} as AccountWithParent)
    setParentLoading(false)
  }, [accountRepository])

  const SearchAccounts = useCallback(async (name: string): Promise<void> => {
    if(accounts.length > 0) {
      const filtered = accounts.filter(function (account) { return account.name.includes(name); })
      setSearchAccounts(filtered)
      setAccountsCount(filtered.length)
    }
  }, [accounts])

  const DeleteAccount = useCallback(async (): Promise<void> => {
    setDeleteLoading(true)

    if(deleteItem.id || account.id) {
      await accountRepository.destroy(deleteItem.code || account.code)
    }
    const response = await accountRepository.all()

    setDeleteItem({} as Account)
    setAccount({} as AccountWithParent)
    setAccounts(response || [])
    setAccountsCount(response?.length || 0)
    setSearchAccounts([])
    setSearch('')
    setDeleteLoading(false)
    toggleModalDelete()
  }, [accountRepository, deleteItem, account])

  const checkChildrenCode = useCallback(async (): Promise<boolean> => {
    /**
     * Verifica se o código informado já existe
     */
    if(register.code) {
      const account = await accountRepository.findByCode(register.code)

      if(account) {
        register.setCodeError(true)
        register.setIsError(true)
        register.setIsErrorMessage('O código informado já existe. Por favor, use outro código e tente novamente!')

        return false
      }
    }

    return true
  }, [register.code, accountRepository])

  return (
    <AccountsContext.Provider value={{
      accounts,
      search,
      searchAccounts,
      parents,
      parentNames,
      account,
      loading,
      deleteLoading,
      parentLoading,
      saveLoading,
      deleteItem,
      modalDelete,
      accountsCount,
      setSearch,
      setAccountsCount,
      setModalDelete,
      toggleModalDelete,
      GetAccounts,
      GetParents,
      StoreAccount,
      GetAccount,
      SearchAccounts,
      DeleteAccount,
      setDeleteItem,
      checkChildrenCode,
      setParentLoading,
      setSearchAccounts,
      setAccount
    }}>
      {children}
    </AccountsContext.Provider>
  )
}

export function useAccounts(): AccountsContextData {
  const context = useContext(AccountsContext)

  if(!context){
    throw new Error('useAccounts must be used whitin an AccountsProvider')
  }

  return context
}
