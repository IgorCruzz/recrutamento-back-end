import { IUpdateResetPassword } from '@/domain/usecases/resetPassword/UpdatePassword.domain'
import {
  badRequest,
  created,
  serverError,
} from '../../../../presentation/http/http-helper'
import { DbUpdateResetPasswordStub } from '@/presentation/mocks/ResetPassword.mock'
import { IController, IHttpRequest } from '@/presentation/protocols'
import { UpdateResetPassword } from '../UpdateResetPassword.controller'

let updateResetPasswordController: IController
let dbUpdateResetPassword: IUpdateResetPassword

describe('UpdateResetPassword ( Controller )', () => {
  beforeEach(() => {
    dbUpdateResetPassword = new DbUpdateResetPasswordStub()
    updateResetPasswordController = new UpdateResetPassword(
      dbUpdateResetPassword
    )
  })

  it('should be defined', () => {
    expect(updateResetPasswordController).toBeDefined()
  })

  it('should return 201 if dbUpdateResetPassword returns true', async () => {
    const req: IHttpRequest = {
      params: {
        token: 'token',
      },
      body: {
        email: 'user@mail.com',
        password: 'password',
      },
    }

    const res = await updateResetPasswordController.handle(req)

    expect(res).toEqual(created({ message: 'Senha atualizada com sucesso.' }))
  })

  it('should return 400 if dbUpdateResetPassword return an error message', async () => {
    const req: IHttpRequest = {
      params: {
        token: 'token',
      },
      body: {
        email: 'user@mail.com',
        password: 'password',
      },
    }

    jest.spyOn(dbUpdateResetPassword, 'updateResetPassword').mockResolvedValue({
      error: 'Não existe um usuário com este e-mail.',
    })

    const res = await updateResetPasswordController.handle(req)

    expect(res).toEqual(badRequest('Não existe um usuário com este e-mail.'))
  })

  it('should return 500 if dbUpdateResetPassword throws', async () => {
    const req: IHttpRequest = {
      params: {
        token: 'token',
      },
      body: {
        email: 'user@mail.com',
        password: 'password',
      },
    }

    jest
      .spyOn(dbUpdateResetPassword, 'updateResetPassword')
      .mockImplementation(() => {
        throw new Error()
      })

    const res = await updateResetPasswordController.handle(req)

    expect(res).toEqual(serverError(new Error()))
  })
})
