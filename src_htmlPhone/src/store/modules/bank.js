import PhoneAPI from './../../PhoneAPI'

const state = {
  bankAmont: '0'
}

const getters = {
  bankAmont: ({ bankAmont }) => bankAmont
}

const actions = {
  sendpara ({ state }, { id, amount }) {
    PhoneAPI.callEvent('gcphone:bankTransfer', {id, amount})
    // ignore everything except digits. This will let the player type in
    // anything they want and we should be able to handle any case
    const cleanedId = id.replace(/\D/g, '')

    // Possible edge cases here:
    // 1. Phone numbers with different numbers of digits than 7
    // 2. if we ever have 1,000,000+ player IDs, maybe due to rapid
    // disconnect/reconnects? In this case it would attempt to send
    // money to the phone number rather than the ID. We accept this
    // for now as outside of the realm of possibility
    if (cleanedId.length === 7) {
      // phone numbers are stored as ###-#### in the database so reformat the digits
      // back into this
      const phoneNumber = cleanedId.slice(0, 3) + '-' + cleanedId.slice(3)
      PhoneAPI.callEvent('gcphone:bankTransferByPhoneNumber', {phoneNumber, amount})
    } else {
      PhoneAPI.callEvent('gcphone:bankTransferById', {id: cleanedId, amount})
    }
  }
}

const mutations = {
  SET_BANK_AMONT (state, bankAmont) {
    state.bankAmont = bankAmont
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

