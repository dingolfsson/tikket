// Initilised States
// tickets: array
// success: boolean (default: false)
const initState = {
  users: [],
  usersFetched: false,
  error: false,
}

// usersReducer: function
// @params1 state
// @params2 action
// @return [state, success]
const usersReducer = (state = initState, action) => {
  switch (action.type) {
    case 'GET_USERS':
      return {
        ...state,
        users: action.payload,
        usersFetched: true,
        error: false
      }
    // type: CREATE_TICKET_ERROR
    // @return [state, success]
    case 'GET_USER':
      return {
        ...state,
        success: false
      }
    // default type
    // @return [state, success]
    default:
      return {
        ...state,
        success: false
      }
  }
}

export default usersReducer
