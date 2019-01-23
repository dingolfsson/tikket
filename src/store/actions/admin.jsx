import * as actions from './actions'

export const displayUserList = (list) => {
    return {
        type: actions.DISPLAY_USERLIST,
        list,
    }
}

export const displayTicketList = (list) => {
    return {
        type: actions.DISPLAY_TICKETLIST,
        list,
    }
}