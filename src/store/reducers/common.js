export const locale = (state = 'en', { type, payload }) => {
  switch (type) {
    case 'setting/changeLanguage':
      return payload;
    default:
      return state;
  }
};
