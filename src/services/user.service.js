const { userRepository } = require("../storage/user.repository");

const userService = {
  async upsertUser(user) {
    if (!user?.id) {
      return null;
    }

    return userRepository.save({
      id: user.id,
      firstName: user.first_name || "",
      username: user.username || "",
      languageCode: user.language_code || ""
    });
  },

  async getUserById(id) {
    return userRepository.findById(id);
  }
};

module.exports = {
  userService
};
