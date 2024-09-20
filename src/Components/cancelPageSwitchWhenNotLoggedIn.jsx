const cancelPageSwitchWhenNotLoggedIn = () => {
  const loggedIn = localStorage.getItem('isLoggedIn');
  if (!loggedIn){
      window.location.href= '/Login'
  }
}

export default cancelPageSwitchWhenNotLoggedIn;