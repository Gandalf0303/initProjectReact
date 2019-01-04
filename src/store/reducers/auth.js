const initState = {
  isLogged: false,
  profile: null
};

export default (state = initState, { type, payload }) => {
  switch (type) {
    case 'auth/markLogin':
      return { ...state, isLogged: payload };

    default:
      return state;
  }
};
