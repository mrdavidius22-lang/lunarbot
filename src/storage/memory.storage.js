const users = new Map();

const memoryStorage = {
  async setUser(user) {
    users.set(user.id, user);
    return user;
  },

  async getUserById(id) {
    return users.get(id) || null;
  }
};

module.exports = {
  memoryStorage
};
