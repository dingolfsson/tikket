// Initilised States
// tickets: array
// success: boolean (default: false)
const initState = {
  tickets: [{ title: '' }],
  success: false
}

// ticketReducer: function
// @params1 state
// @params2 action
// @return [state, success]
const ticketReducer = (state = initState, action) => {
  switch (action.type) {
    // type: CREATE_TICKET
    // @return [state, success: true]
    case 'CREATE_TICKET':
      return {
        ...state,
        success: true
      }
    // type: CREATE_TICKET_ERROR
    // @return [state, success]
    case 'CREATE_TICKET_ERROR':
      return {
        ...state,
        success: false
      }
    // type: SOLVE_TICKET
    // @return [state, success: true]
    case 'SOLVE_TICKET':
      return {
        ...state,
        success: true
      }
    // type: SOLVE_TICKET_ERROR
    // @return [state, success]
    case 'SOLVE_TICKET_ERROR':
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

export default ticketReducer
