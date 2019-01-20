const initState = {
  tickets: [{ title: '' }],
  success: false,
  checkoutTickets: false,
  coTicks: []
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
    case 'CHECKOUT_TICKETS':
      return {
        ...state,
        checkoutTickets: true,
        coTicks: action.coTicks
      }
    default:
      return {
        ...state,
        success: false,
      }
  }
}

export default ticketReducer;