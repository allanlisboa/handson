import React, { createContext, useContext, useState, useCallback } from 'react'
import { AccountReposiory } from '../services/database/repository/accounts'
import { Account } from '../types/account'
import { getChildrenCode, sugestChildrenCode } from '../utils/accountCode'

interface RegisterContextData {
  parent: number | null;
  launch: 'yes' | 'no' | null;
  type: 'revenue' | 'expense' | null;
  name: string | null;
  code: string | null;
  launchError: boolean;
  typeError: boolean;
  nameError: boolean;
  codeError: boolean;
  isError: boolean;
  isErrorMessage: string;
  setParent: (param: number | null) => void;
  setLaunch: (param: 'yes' | 'no' | null) => void;
  setType: (param: 'revenue' | 'expense' | null) => void;
  setName: (param: string | null) => void;
  setCode: (param: string | null) => void;
  setLaunchError: (param: boolean) => void;
  setTypeError: (param: boolean) => void;
  setNameError: (param: boolean) => void;
  setCodeError: (param: boolean) => void;
  toggleIsError: () => void;
  validationFields: () => boolean;
  resetFields: () => void;
  generateChildrenCode: (account?: Account) => Promise<void>;
  setIsError: (param: boolean) => void;
  setIsErrorMessage: (param: string) => void;
}

const RegisterContext = createContext<RegisterContextData>({} as RegisterContextData)

export const RegisterProvider: React.FC = ({ children }) => {
  const [parent, setParent] = useState<number | null>(null)
  const [launch, setLaunch] = useState<'yes' | 'no' | null>(null)
  const [type, setType] = useState<'revenue' | 'expense' | null>(null)
  const [name, setName] = useState<string | null>(null)
  const [code, setCode] = useState<string | null>(null)
  const [launchError, setLaunchError] = useState(false)
  const [typeError, setTypeError] = useState(false)
  const [nameError, setNameError] = useState(false)
  const [codeError, setCodeError] = useState(false)
  const [isError, setIsError] = useState(false)
  const [isErrorMessage, setIsErrorMessage] = useState('')

  const accountReposiory = AccountReposiory()

  const toggleIsError = useCallback(() => {
    setIsError(state => !state)
  }, [])

  const validationFields = useCallback((): boolean => {
    if(!launch) {
      setLaunchError(true)
    }

    if(!type) {
      setTypeError(true)
    }

    if(!name || name === '') {
      setNameError(true)
    }

    if(!code || code === '') {
      setCodeError(true)
    }

    if(!launch || !type || !name || name === '' || !code || code === '') {
      setIsError(true)
      setIsErrorMessage('Preencha os campos obrigatórios e tente novamente.')
      return true
    }

    return false
  }, [launch, type, name, code])

  const resetFields = useCallback(() => {
    setParent(null)
    setLaunch(null)
    setType(null)
    setName(null)
    setCode(null)
    setLaunchError(false)
    setTypeError(false)
    setNameError(false)
    setCodeError(false)
    setIsError(false)
    setIsErrorMessage('')
  }, [])

  const generateChildrenCode = useCallback(async (account?: Account): Promise<void> => {
    /** Gera o código se nenhum pai for selecionado */
    if(!account) {
      const masterParents = await accountReposiory.findMasterParents()

      if(masterParents && masterParents.length > 0) {
        const masterParent = masterParents[masterParents.length -1]
        setCode((Number(masterParent.code) + 1).toString())
      }

      return
    }

    /** Consulta o último filho */
    const lastChildren = await accountReposiory.findLastChildren(account.id)

    setParent(Number(account.id))
    setType(account.type)

    if(lastChildren) {
      /** Gera o children code removendo o parent code e todos os pontos */
      const childrenCode = getChildrenCode(lastChildren.code, account.code)

      /** Verifica se o children code é maior que 999 */
      if(childrenCode > 999) {
        const sugestionCode = sugestChildrenCode(`${account.code}.999`)
        setCode(sugestionCode)
      }

      setCode(`${account.code}.${childrenCode}`)
      return
    }

    /**
     * Se não existir contas filhas, cria o primeiro filho
     * setando o code do pai no início da string
     */
    setCode(`${account.code}.1`)
  }, [accountReposiory])

  return (
    <RegisterContext.Provider value={{
      parent,
      launch,
      type,
      name,
      code,
      launchError,
      typeError,
      nameError,
      codeError,
      isError,
      isErrorMessage,
      setParent,
      setLaunch,
      setType,
      setName,
      setCode,
      setLaunchError,
      setTypeError,
      setNameError,
      setCodeError,
      validationFields,
      toggleIsError,
      resetFields,
      generateChildrenCode,
      setIsError,
      setIsErrorMessage
    }}>
      {children}
    </RegisterContext.Provider>
  )
}

export function useRegister(): RegisterContextData {
  const context = useContext(RegisterContext)

  if(!context){
    throw new Error('useRegister must be used whitin an RegisterProvider')
  }

  return context
}
