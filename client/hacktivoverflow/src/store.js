import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    questions: [],
    question: {},
  },
  mutations: {
    loadQuestions(state, payload) {
      state.questions = payload;
    },
    loadQuestion(state, payload) {
      state.question = payload;
    },
  },
  actions: {
    getQuestions({ commit }) {
      axios.get(`${window.serverUrl}/api/questions`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        commit('loadQuestions', response.data);
      })
      .catch((error) => {
        console.log(error);
      });
    },
    getQuestion({ commit }, payload) {
      axios.get(`${window.serverUrl}/api/questions/${payload.questionId}`, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
      .then((response) => {
        commit('loadQuestion', response.data);
      })
      .catch((error) => {
        throw error;
        // console.log(error);
      });
    },
    createQuestion({ dispatch, commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.post(`${window.serverUrl}/api/questions`, payload, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        })
        .then(() => {
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
      });
    },
    deleteQuestion({ dispatch, commit }, payload) {
      return new Promise((resolve, reject) => {
        axios.delete(`${window.serverUrl}/api/questions/${payload.id}`, {
          headers: {
            Authorization: `Bearer ${sessionStorage.getItem('token')}`,
          },
        })
        .then(() => {
          dispatch('getQuestions');
          resolve();
        })
        .catch((err) => {
          reject(err);
        });
      });
    },
    giveAnswer({ dispatch, commit }, payload) {
      axios.post(`${window.serverUrl}/api/questions/${payload.question}/answer`, { content: payload.content }, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
      .then(() => {
        dispatch('getQuestion', { questionId: payload.question });
      })
      .catch((err) => {
        console.log(err);
      });
    },
    giveVote({ dispatch, commit }, payload) {
      axios.post(`${window.serverUrl}/api/questions/${payload.question}/vote`, { score: payload.score }, {
        headers: {
          Authorization: `Bearer ${sessionStorage.getItem('token')}`,
        },
      })
      .then(() => {
        dispatch('getQuestion', { questionId: payload.question });
      })
      .catch((err) => {
        console.log(err);
      });
    },
  },
});
