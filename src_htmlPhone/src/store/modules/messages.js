import PhoneAPI from './../../PhoneAPI'

const state = {
  messages: []
}

const getters = {
  messages: ({ messages }) => messages,
  nbMessagesUnread: ({ messages }) => {
    return messages.filter(e => e.isRead !== 1).length
  }
}

const actions = {
  setMessages ({ commit }, messages) {
    commit('SET_MESSAGES', messages)
  },
  sendMessage ({ commit }, {phoneNumber, message, gpsData}) {
    PhoneAPI.sendMessage(phoneNumber, message, gpsData)
  },
  deleteMessage ({ commit }, { id }) {
    PhoneAPI.deleteMessage(id)
  },
  deleteMessagesNumber ({ commit, state }, { num }) {
    PhoneAPI.deleteMessagesNumber(num)
    commit('SET_MESSAGES', state.messages.filter(mess => {
      return mess.transmitter !== num
    }))
  },
  deleteAllMessages ({ commit }) {
    PhoneAPI.deleteAllMessages()
    commit('SET_MESSAGES', [])
  },
  setMessageRead ({ commit }, num) {
    PhoneAPI.setMessageRead(num)
    commit('SET_MESSAGES_READ', { num })
  },
  resetMessage ({ commit }) {
    commit('SET_MESSAGES', [])
  }
}

const mutations = {
  SET_MESSAGES (state, messages) {
    state.messages = messages
  },
  ADD_MESSAGE (state, message) {
    state.messages.push(message)
  },
  SET_MESSAGES_READ (state, { num }) {
    for (let i = 0; i < state.messages.length; i += 1) {
      if (state.messages[i].transmitter === num && state.messages[i].isRead !== 1) {
        state.messages[i].isRead = 1
      }
    }
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}

if (process.env.NODE_ENV !== 'production') {
  const time = new Date().getTime()
  const numRandom = '' + Math.floor(Math.random() * 10000000)
  state.messages = [
    {id: 0, transmitter: '0000', receiver: '06', time: time - 160, message: '#666-123', isRead: 1, owner: 0},
    {id: 2, transmitter: numRandom, time, message: 'Join our Patreon', isRead: 1, owner: 0},
    {id: 3, transmitter: numRandom, time, message: 'Where at?', isRead: 1, owner: 1},
    {id: 3, transmitter: numRandom, time, message: 'https://patreon.com/reignited', isRead: 1, owner: 0},
    {id: 2, transmitter: numRandom, time, message: 'This looks good!', isRead: 1, owner: 1},
    {id: 2, transmitter: numRandom, time, message: 'Thank you!', isRead: 1, owner: 0},
    {id: 2, transmitter: numRandom, time, message: 'No problem, I will join right now!', isRead: 1, owner: 1},
    {id: 3, transmitter: numRandom, time, message: 'Thank you so much', isRead: 1, owner: 0},
    {id: 2, transmitter: numRandom, time, message: 'No problem, Keep up the good work!', isRead: 1, owner: 1},
    {id: 2, transmitter: numRandom, time, message: 'We will, Thank you for supporting our continued efforts!', isRead: 1, owner: 0},
    {id: 1, transmitter: numRandom, time, message: 'Our server makes money because of you guys, So you should also be supported!', isRead: 1, owner: 1},
    {id: 1, transmitter: numRandom, time, message: 'GPS: 244.21, -123.15', isRead: 1, owner: 0},
    {id: 5, transmitter: 'police', time, message: 'How is this??', isRead: 1, owner: 1},
    {id: 6, transmitter: 'ambulance', time, message: 'This looks good!', isRead: 1, owner: 1},
    {id: 7, transmitter: '01', time, message: 'Salut sa va ?', isRead: 1, owner: 0},
    {id: 8, transmitter: '01', time, message: 'fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff', isRead: 0, owner: 1},
    {id: 9, transmitter: '01', time, message: 'GPS: -1034.5810546875, -2734.1027832031', isRead: 1, owner: 0},
    {id: 44, transmitter: '01', time, message: 'https://i.imgur.com/gthahbs.png', isRead: 1, owner: 0},
    {id: 10, transmitter: '02', time, message: 'Patreon Support?', isRead: 1, owner: 0},
    {id: 11, transmitter: '04', time, message: 'Salut sa va ?', isRead: 1, owner: 0},
    {id: 12, transmitter: '04', time, message: 'Salut sa va ?', isRead: 1, owner: 0},
    {id: 13, transmitter: '09', time, message: 'Tu sais pas !', isRead: 1, owner: 0},
    {id: 14, transmitter: 'police', time, message: 'GPS: Live position', isRead: 1, owner: 1}
  ]
}
