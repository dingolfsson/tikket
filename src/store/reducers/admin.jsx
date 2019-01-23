
const initState = {
    showTicketList: true,
    list: [],
    cardClicked: false,
}

const reducer = (state = initState, action) => {
    switch (action.type) {
        case 'DISPLAY_USERLIST':
            return {
                ...state,
                list: action.list,
                showTicketList: false,
                cardClicked: true,
            }
        case 'DISPLAY_TICKETLIST':
            return {
                ...state,
                list: action.list,
                showTicketList: true,
                cardClicked: true,
            }
        default:
            return state
    }
}

export default reducer;