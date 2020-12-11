import app from './config/app'
import { connection } from '../main/config/connection'

connection.create()

app.listen(3333, () => {
  console.log('Server is running')
})
