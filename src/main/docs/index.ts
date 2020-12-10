import components from './Components'
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
  },
  components,
  schemas,
}
