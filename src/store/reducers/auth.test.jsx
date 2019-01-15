import reducer from './auth'

describe('auth reducer', () => {
  it('should return init state', () => {
    expect(reducer(undefined, {})).toEqual({
      authError: null,
      loading: false
    })
  })
})
