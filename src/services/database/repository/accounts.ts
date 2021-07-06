import { useCallback } from 'react'
import { database } from '../sqlite'

import { Account } from '../../../types/account'

export const AccountReposiory = () => {
  const all = useCallback(async () => {
    try{
      let accounts = [] as Account[]
      const db = await database()
      await db?.transaction( async tx => {
        tx.executeSql('SELECT * FROM accounts ORDER BY code ASC', [], (tx, results) => {
          accounts = results.rows.raw() as Account[]
        })
      })

      return accounts
    }catch(error) {
      console.log('allError', error)
    }
  }, [database])

  const find = useCallback(async (id: number) => {
    try{
      let account = {} as Account
      const db = await database()
      await db?.transaction( async tx => {
        tx.executeSql('SELECT * FROM accounts WHERE id=?', [id], (tx, results) => {
          account = results.rows.item(0) as Account
        })
      })

      return account
    }catch(error) {
      console.log('findError', error)
    }
  }, [database])

  const findByName = useCallback(async (name: string) => {
    try{
      let accounts = [] as Account[]
      const db = await database()
      await db?.transaction( async tx => {
        tx.executeSql('SELECT * FROM accounts WHERE name LIKE ? ORDER BY code ASC', [name], (tx, results) => {
          accounts = results.rows.raw() as Account[]
        })
      })

      return accounts
    }catch(error) {
      console.log('findByNameError', error)
    }
  }, [database])

  const findByCode = useCallback(async (code: string) => {
    try{
      let account = {} as Account
      const db = await database()
      await db?.transaction( async tx => {
        tx.executeSql('SELECT * FROM accounts WHERE code=? LIMIT 1', [code], (tx, results) => {
          account = results.rows.item(0) as Account
        })
      })

      return account
    }catch(error) {
      console.log('findByCodeError', error)
    }
  }, [database])

  const findParents = useCallback(async () => {
    try{
      let accounts = [] as Account[]
      const db = await database()
      await db?.transaction( async tx => {
        tx.executeSql('SELECT * FROM accounts WHERE launch=? ORDER BY code ASC', ['no'], (tx, results) => {
          accounts = results.rows.raw() as Account[]
        })
      })

      return accounts
    }catch(error) {
      console.log('findParents', error)
    }
  }, [database])

  const findMasterParents = useCallback(async () => {
    try{
      let accounts = [] as Account[]
      const db = await database()
      await db?.transaction( async tx => {
        tx.executeSql('SELECT * FROM accounts WHERE parent IS NULL ORDER BY code ASC', [], (tx, results) => {
          accounts = results.rows.raw() as Account[]
        })
      })

      return accounts
    }catch(error) {
      console.log('findMasterParents', error)
    }
  }, [database])

  const findLastChildren = useCallback(async (parentId: number) => {
    try{
      let account = {} as Account
      const db = await database()
      await db?.transaction( async tx => {
        tx.executeSql('SELECT * FROM accounts WHERE parent=? ORDER BY code DESC LIMIT 1', [parentId], (tx, results) => {
          account = results.rows.item(0) as Account
        })
      })

      return account
    }catch(error) {
      console.log('findLastChildren', error)
    }
  }, [database])

  const store = useCallback(async (params: Account) => {
    try{
      let account = {} as Account
      const db = await database()
      await db?.transaction(tx => {
        tx.executeSql('INSERT INTO accounts (parent, code, name, type, launch) VALUES (?, ?, ?, ?, ?)',
          [params.parent, params.code, params.name, params.type, params.launch],
          (tx, results) => {
            account = results.rows.item(0) as Account
          })
      })
    }catch(error) {
      console.log('store ERROR', error)
    }
  }, [database])

  const destroy = useCallback(async (code: string) => {
    try{
      const db = await database()

      let childrens = [] as Account[]
      await db?.transaction( async tx => {
        tx.executeSql('SELECT * FROM accounts WHERE code LIKE ?', [`${code}%`], (tx, results) => {
          childrens = results.rows.raw() as Account[]
        })
      })
      if(childrens.length > 0) {
        await Promise.all(childrens.map(async children => {
          await db?.transaction( async tx => {
            tx.executeSql('DELETE FROM accounts WHERE id=?', [children.id], (tx, results) => {
              console.log('rowChildrenDeleted', results.rowsAffected)
            })
          })
        }))
      }

      await db?.transaction( async tx => {
        tx.executeSql('DELETE FROM accounts WHERE code=?', [code], (tx, results) => {
          console.log('rowDeleted', results.rowsAffected)
        })
      })
    }catch(error) {
      console.log('destroyError', error)
    }
  }, [database])

  return {
    all,
    find,
    findByName,
    findByCode,
    findParents,
    findLastChildren,
    findMasterParents,
    store,
    destroy
  }
}

