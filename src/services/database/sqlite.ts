import SQLite  from 'react-native-sqlite-storage'

SQLite.enablePromise(true);

export const database = async () => {
  try{
    const db = await SQLite.openDatabase({ name: 'ucondo.db', location: 'default' })
    return db
  }catch(error) {
    console.log('databaseError', error)
  }
}

export const initDB = async () => {
  try{
    const db = await database()
    await createTables(db)
  }catch(error) {
    console.log('initDBError', error)
  }
}

const createTables = async (db?: SQLite.SQLiteDatabase) => {
  try{
    await db?.transaction(async tx => {
      await tx.executeSql("CREATE TABLE IF NOT EXISTS accounts (id INTEGER PRIMARY KEY AUTOINCREMENT, parent INTEGER, code TEXT, name TEXT, type TEXT, launch TEXT);")
    })
  }catch(error) {
    console.log('createTableError', error)
  }
}

export const dropDatabase = async () => {
  try{
    await SQLite.deleteDatabase({ name: 'ucondo.db', location: 'default' })
  }catch(error) {
    console.log('dropDatabaseError', error)
  }
}

