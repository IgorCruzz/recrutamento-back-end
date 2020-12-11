import components from './Components'
import { createPassword } from './paths/User/CreatePassword.path'
import { createUser } from './paths/User/CreateUser.path'
import schemas from './Schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'companyHUB',
    description: '',
    version: '1.0.0',
  },
  servers: [
    {
      url: '/api',
    },
  ],
  license: {
    name: '',
    url: '',
  },
  tags: [
    {
      name: 'User',
    },
  ],
  paths: {
    '/user': createUser,
    '/password/{code}': createPassword,
  },
  components,
  schemas,
}
