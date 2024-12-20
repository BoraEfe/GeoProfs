const cancelPageSwitchWhenNotLoggedIn = () => {
  const isloggedIn = sessionStorage.getItem('isLoggedIn') === 'true';
  console.log("loggedIn: " + isloggedIn);

  if (!isloggedIn){
      window.location.href= '/Login'
      console.log('You are not logged in')
      return false;
  }
  return true;
} 

export default cancelPageSwitchWhenNotLoggedIn;