import app from './config/App'
import { connection } from '../main/config/Connection'

connection.create()

app.listen(process.env.PORT || 3333, () => {
  console.log('Server is running')
})
