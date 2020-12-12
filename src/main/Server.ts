import app from './config/App'
import { connection } from '../main/config/Connection'

connection.create()

app.listen(3333, () => {
  console.log('Server is running')
})
