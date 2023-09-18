const checkLogin = (): boolean => {
  if (localStorage.getItem("token")) {
    return true;
  } else {
    return false;
  }
};

export { checkLogin };
