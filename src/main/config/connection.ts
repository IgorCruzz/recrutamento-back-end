import { createConnection, getConnection } from 'typeorm'

export const connection = {
  async create() {
    await createConnection().then(() => {
      console.log('Connected successfully')
    })
  },

  async close() {
    await getConnection()
      .close()
      .then(() => {
        console.log('Connection closed')
      })
  },
}
