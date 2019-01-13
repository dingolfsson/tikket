const initState = {
  tickets: [{ title: '' }],
  success: false,
}

const ticketReducer = (state = initState, action) => {
  switch (action.type) {
    case 'CREATE_TICKET':
      return {
        ...state,
        success: true
      }
    case 'CREATE_TICKET_ERROR':
      return state;
    case 'SOLVE_TICKET':
      return {
        ...state,
        success: true
      }
    case 'SOLVE_TICKET_ERROR':
      return state
    default:
      return {
        ...state,
        success: false,
      }
  }
}

export default ticketReducer;