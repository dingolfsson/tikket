import reducer from './auth'
import * as actionTypes from '../actions/actionTypes';

describe('auth reducer', () => {
  it('should return init state', () => {
    expect(reducer(undefined, {})).toEqual({
      authError: null,
      loading: false
    })
  })
})