const { memoryStorage } = require("./memory.storage");

const userRepository = {
  async save(user) {
    return memoryStorage.setUser(user);
  },

  async findById(id) {
    return memoryStorage.getUserById(id);
  },

  async updateLocale(id, preferredLocale) {
    return memoryStorage.setUser({
      ...(await memoryStorage.getUserById(id)),
      id,
      preferredLocale
    });
  }
};

module.exports = {
  userRepository
};
