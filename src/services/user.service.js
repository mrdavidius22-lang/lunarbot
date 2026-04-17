const { userRepository } = require("../storage/user.repository");
const { normalizeLocale } = require("../locales");

const userService = {
  async upsertUser(user) {
    if (!user?.id) {
      return null;
    }

    const existingUser = await userRepository.findById(user.id);

    return userRepository.save({
      id: user.id,
      firstName: user.first_name || "",
      username: user.username || "",
      languageCode: user.language_code || "",
      preferredLocale: existingUser?.preferredLocale || normalizeLocale(user.language_code || "ru")
    });
  },

  async getUserById(id) {
    return userRepository.findById(id);
  },

  async getLocale(ctx) {
    const savedUser = await userRepository.findById(ctx.from?.id);
    return normalizeLocale(savedUser?.preferredLocale || savedUser?.languageCode || ctx.from?.language_code || "ru");
  },

  async setLocale(ctx, locale) {
    const normalized = normalizeLocale(locale);
    await userRepository.updateLocale(ctx.from?.id, normalized);
    return normalized;
  }
};

module.exports = {
  userService
};
