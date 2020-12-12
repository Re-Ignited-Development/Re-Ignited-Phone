import PhoneAPI from './../../PhoneAPI'
import Vue from 'vue'

const state = {
  twitterUsername: localStorage['gcphone_twitter_username'],
  twitterPassword: localStorage['gcphone_twitter_password'],
  twitterAvatarUrl: localStorage['gcphone_twitter_avatarUrl'],
  twitterNotification: localStorage['gcphone_twitter_notif'] ? parseInt(localStorage['gcphone_twitter_notif']) : 1,
  twitterNotificationSound: localStorage['gcphone_twitter_notif_sound'] !== 'false',
  tweets: [],
  favoriteTweets: []
}

const getters = {
  twitterUsername: ({ twitterUsername }) => twitterUsername,
  twitterPassword: ({ twitterPassword }) => twitterPassword,
  twitterAvatarUrl: ({ twitterAvatarUrl }) => twitterAvatarUrl,
  twitterNotification: ({ twitterNotification }) => twitterNotification,
  twitterNotificationSound: ({ twitterNotificationSound }) => twitterNotificationSound,
  tweets: ({ tweets }) => tweets,
  favoriteTweets: ({ favoriteTweets }) => favoriteTweets
}

const actions = {
  twitterCreateNewAccount (_, {username, password, avatarUrl}) {
    PhoneAPI.twitter_createAccount(username, password, avatarUrl)
  },
  twitterLogin ({ commit }, { username, password }) {
    PhoneAPI.twitter_login(username, password)
  },
  twitterChangePassword ({ state }, newPassword) {
    PhoneAPI.twitter_changePassword(state.twitterUsername, state.twitterPassword, newPassword)
  },
  twitterLogout ({ commit }) {
    localStorage.removeItem('gcphone_twitter_username')
    localStorage.removeItem('gcphone_twitter_password')
    localStorage.removeItem('gcphone_twitter_avatarUrl')
    commit('UPDATE_ACCOUNT', {
      username: undefined,
      password: undefined,
      avatarUrl: undefined
    })
  },
  twitterSetAvatar ({ state }, { avatarUrl }) {
    PhoneAPI.twitter_setAvatar(state.twitterUsername, state.twitterPassword, avatarUrl)
  },
  twitterPostTweet ({ state, commit }, { message }) {
    if (/^https?:\/\/.*\.(png|jpg|jpeg|gif)$/.test(message)) {
      PhoneAPI.twitter_postTweetImg(state.twitterUsername, state.twitterPassword, message)
    } else {
      PhoneAPI.twitter_postTweet(state.twitterUsername, state.twitterPassword, PhoneAPI.convertEmoji(message))
    }
  },
  twitterToogleLike ({ state }, { tweetId }) {
    PhoneAPI.twitter_toggleLikeTweet(state.twitterUsername, state.twitterPassword, tweetId)
  },
  setAccount ({ commit }, data) {
    localStorage['gcphone_twitter_username'] = data.username
    localStorage['gcphone_twitter_password'] = data.password
    localStorage['gcphone_twitter_avatarUrl'] = data.avatarUrl
    commit('UPDATE_ACCOUNT', data)
  },
  addTweet ({ commit, state }, tweet) {
    let notif = state.twitterNotification === 2
    if (state.twitterNotification === 1) {
      notif = tweet.message && tweet.message.toLowerCase().indexOf(state.twitterUsername.toLowerCase()) !== -1
    }
    if (notif === true) {
      Vue.notify({
        message: tweet.message,
        title: tweet.author + ' :',
        icon: 'twitter',
        sound: state.twitterNotificationSound ? 'Twitter_Sound_Effect.ogg' : undefined
      })
    }
    commit('ADD_TWEET', { tweet })
  },
  fetchTweets ({ state }) {
    PhoneAPI.twitter_getTweets(state.twitterUsername, state.twitterPassword)
  },
  fetchFavoriteTweets ({ state }) {
    PhoneAPI.twitter_getFavoriteTweets(state.twitterUsername, state.twitterPassword)
  },
  setTwitterNotification ({ commit }, value) {
    localStorage['gcphone_twitter_notif'] = value
    commit('SET_TWITTER_NOTIFICATION', { notification: value })
  },
  setTwitterNotificationSound ({ commit }, value) {
    localStorage['gcphone_twitter_notif_sound'] = value
    commit('SET_TWITTER_NOTIFICATION_SOUND', { notificationSound: value })
  }
}

const mutations = {
  SET_TWITTER_NOTIFICATION (state, { notification }) {
    state.twitterNotification = notification
  },
  SET_TWITTER_NOTIFICATION_SOUND (state, { notificationSound }) {
    state.twitterNotificationSound = notificationSound
  },
  UPDATE_ACCOUNT (state, { username, password, avatarUrl }) {
    state.twitterUsername = username
    state.twitterPassword = password
    state.twitterAvatarUrl = avatarUrl
  },
  SET_TWEETS (state, { tweets }) {
    state.tweets = tweets
  },
  SET_FAVORITE_TWEETS (state, { tweets }) {
    state.favoriteTweets = tweets
  },
  ADD_TWEET (state, { tweet }) {
    state.tweets = [tweet, ...state.tweets]
  },
  UPDATE_TWEET_LIKE (state, { tweetId, likes }) {
    const tweetIndex = state.tweets.findIndex(t => t.id === tweetId)
    if (tweetIndex !== -1) {
      state.tweets[tweetIndex].likes = likes
    }
    const tweetIndexFav = state.favoriteTweets.findIndex(t => t.id === tweetId)
    if (tweetIndexFav !== -1) {
      state.favoriteTweets[tweetIndexFav].likes = likes
    }
  },
  UPDATE_TWEET_ISLIKE (state, { tweetId, isLikes }) {
    const tweetIndex = state.tweets.findIndex(t => t.id === tweetId)
    if (tweetIndex !== -1) {
      Vue.set(state.tweets[tweetIndex], 'isLikes', isLikes)
    }
    const tweetIndexFav = state.favoriteTweets.findIndex(t => t.id === tweetId)
    if (tweetIndexFav !== -1) {
      Vue.set(state.favoriteTweets[tweetIndexFav], 'isLikes', isLikes)
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
  state.favoriteTweets = [{
    id: 1,
    message: 'https://pbs.twimg.com/profile_images/702982240184107008/tUKxvkcs_400x400.jpg',
    author: 'BTNGaming',
    time: new Date(),
    likes: 3,
    isLikes: 60
  }, {
    id: 2,
    message: 'Re-Ignited Roleplay finally in development, Something that needed to be done AGES ago is finally happening, Check out the updates as they exceed expectations ➜ https://discord.gg/K2pR3UC  ',
    author: 'Re-Ignited Developers',
    authorIcon: 'https://i.imgur.com/Ms2M5g4.png',
    time: new Date(),
    likes: 65
  }, {
    id: 3,
    message: '',
    img: 'https://cdn.discordapp.com/attachments/563443658192322576/563473765569396746/samurai-background-hd-1920x1200-45462.jpg',
    author: 'BTNGaming',
    time: new Date()
  }, {
    id: 4,
    message: 'Superior Message',
    author: 'BTNGaming',
    authorIcon: 'https://pbs.twimg.com/profile_images/986085090684960768/AcD9lOLw_bigger.jpg',
    likes: 0,
    time: new Date()
  },
  {
    id: 5,
    message: 'Superior Message',
    author: 'BTNGaming',
    authorIcon: 'https://pbs.twimg.com/profile_images/986085090684960768/AcD9lOLw_bigger.jpg',
    likes: 0,
    time: new Date()
  },
  {
    id: 6,
    message: 'Superior Message',
    author: 'BTNGaming',
    authorIcon: 'https://pbs.twimg.com/profile_images/986085090684960768/AcD9lOLw_bigger.jpg',
    likes: 0,
    time: new Date()
  },
  {
    id: 7,
    message: 'Superior Message',
    author: 'BTNGaming',
    authorIcon: 'https://pbs.twimg.com/profile_images/986085090684960768/AcD9lOLw_bigger.jpg',
    likes: 0,
    time: new Date()
  },
  {
    id: 8,
    message: 'Superior Message',
    author: 'BTNGaming',
    authorIcon: 'https://pbs.twimg.com/profile_images/986085090684960768/AcD9lOLw_bigger.jpg',
    likes: 0,
    time: new Date()
  }]
  state.tweets = [{
    id: 1,
    message: 'https://pbs.twimg.com/profile_images/702982240184107008/tUKxvkcs_400x400.jpg',
    author: 'BTNGaming',
    time: new Date(),
    likes: 3,
    isLikes: 60
  }, {
    id: 2,
    message: 'Re-Ignited Roleplay finally in development, Something that needed to be done AGES ago is finally happening, Check out the updates as they exceed expectations ➜ https://discord.gg/K2pR3UC  ',
    author: 'Re-Ignited Developers',
    authorIcon: 'https://i.imgur.com/Ms2M5g4.png',
    time: new Date(),
    likes: 65
  }, {
    id: 3,
    message: '',
    img: 'https://cdn.discordapp.com/attachments/563443658192322576/563473765569396746/samurai-background-hd-1920x1200-45462.jpg',
    author: 'BTNGaming',
    time: new Date()
  }, {
    id: 4,
    message: 'Superior Message',
    author: 'BTNGaming',
    authorIcon: 'https://pbs.twimg.com/profile_images/986085090684960768/AcD9lOLw_bigger.jpg',
    likes: 0,
    time: new Date()
  },
  {
    id: 5,
    message: 'Superior Message',
    author: 'BTNGaming',
    authorIcon: 'https://pbs.twimg.com/profile_images/986085090684960768/AcD9lOLw_bigger.jpg',
    likes: 0,
    time: new Date()
  },
  {
    id: 6,
    message: 'Superior Message',
    author: 'BTNGaming',
    authorIcon: 'https://pbs.twimg.com/profile_images/986085090684960768/AcD9lOLw_bigger.jpg',
    likes: 0,
    time: new Date()
  },
  {
    id: 7,
    message: 'Superior Message',
    author: 'BTNGaming',
    authorIcon: 'https://pbs.twimg.com/profile_images/986085090684960768/AcD9lOLw_bigger.jpg',
    likes: 0,
    time: new Date()
  },
  {
    id: 8,
    message: 'Superior Message',
    author: 'BTNGaming',
    authorIcon: 'https://pbs.twimg.com/profile_images/986085090684960768/AcD9lOLw_bigger.jpg',
    likes: 0,
    time: new Date()
  }]
}
