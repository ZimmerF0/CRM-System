let accessToken: string | null = null;

export const tokenService = {
  set(token: string) {
    accessToken = token;
  },

  get() {
    return accessToken;
  },

  clear() {
    accessToken = null;
  },
};
