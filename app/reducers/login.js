const login = (state = { isLoggedIn: false }, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, isLoggedIn: true, token: action.token };
    case 'LOGOUT':
      return { ...state, isLoggedIn: false, token: null };
    default:
      return state;
  }
};

export default login;
