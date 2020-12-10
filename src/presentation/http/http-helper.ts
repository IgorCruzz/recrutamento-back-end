export const created = (data: any) => {
  return {
    status: 201,
    body: data,
  }
}

export const ok = (data: any) => {
  return {
    status: 200,
    body: data,
  }
}

export const serverError = (err: any) => {
  return {
    status: 500,
    body: err,
  }
}

export const badRequest = (message: any) => {
  return {
    status: 400,
    body: { message: message },
  }
}

export const unauthorized = (message: any) => {
  return {
    status: 401,
    body: { message: message },
  }
}
