const { memoryStorage } = require("./memory.storage");

const userRepository = {
  async save(user) {
    return memoryStorage.setUser(user);
  },

  async findById(id) {
    return memoryStorage.getUserById(id);
  }
};

module.exports = {
  userRepository
};
