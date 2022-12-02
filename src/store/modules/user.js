export default {
  namespaced: true,
  state: {
    id: 0,
    name: '',
    studentID: ''
  },
  mutations: {
    updateId (state, id) {
      state.id = id
    },
    updateName (state, name) {
      state.name = name
    },
    updateStudentId (state, id) {
      state.studentID = id
    }
  }
}
