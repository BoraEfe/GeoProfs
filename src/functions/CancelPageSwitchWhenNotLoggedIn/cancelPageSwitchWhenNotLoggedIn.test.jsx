import cancelPageSwitchWhenNotLoggedIn from "./cancelPageSwitchWhenNotLoggedIn";

describe('cancelPageSwitchWhenNotLoggedIn', () => {
  beforeEach(() => {
    // Reset sessionStorage before each test
    sessionStorage.clear();
  });

  test('should return true when user is logged in', () => {
    // Mock sessionStorage to simulate a logged-in user
    sessionStorage.setItem('isLoggedIn', 'true');
    
    // Mock window.location.href to track changes
    const originalLocation = window.location.href;
    delete window.location;
    window.location = { href: '' };

    // Call the function and assert the result
    expect(cancelPageSwitchWhenNotLoggedIn()).toBe(true);

    // Restore original window.location
    window.location.href = originalLocation;
  });

  test('should redirect to login when user is not logged in', () => {
    // Mock sessionStorage to simulate a logged-out user
    sessionStorage.setItem('isLoggedIn', 'false');
    
    // Mock window.location.href to track changes
    const originalLocation = window.location.href;
    delete window.location;
    window.location = { href: '' };

    // Call the function and assert the result
    expect(cancelPageSwitchWhenNotLoggedIn()).toBe(false);

    // Check if the page was redirected to '/Login'
    expect(window.location.href).toBe('/Login');

    // Restore original window.location
    window.location.href = originalLocation;
  });
});
