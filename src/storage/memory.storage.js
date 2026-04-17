const users = new Map();

const memoryStorage = {
  async setUser(user) {
    const nextUser = {
      ...(users.get(user.id) || {}),
      ...user
    };

    users.set(user.id, nextUser);
    return nextUser;
  },

  async getUserById(id) {
    return users.get(id) || null;
  }
};

module.exports = {
  memoryStorage
};
