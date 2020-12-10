import app from './config/app'
import { connection } from '../main/config/connection'

connection.create()

app.listen(process.env.PORT || 3333, () => {
  console.log('Server is running')
})
