import request from '@/plugin/axios'

export function ReturnIndex () {
  return request.get('SmtStencilTake/ReturnIndex')
}

// eslint-disable-next-line camelcase
export function ReturnLoadData (stencil_no) {
  return request.get('SmtStencilTake/ReturnLoadData', {
    params: {
      stencil_no
    }
  })
}

export function ReturnSaveData (data) {
  return request.post('SmtStencilTake/ReturnSaveData', data)
}
