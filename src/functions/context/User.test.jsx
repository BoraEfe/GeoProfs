import React from 'react';
import { render, screen, fireEvent, act } from '@testing-library/react';
import '@testing-library/jest-dom'; // Voor extra matchers zoals toBeInTheDocument
import { UserProvider, useUser } from '../context/User';

// Dummy component om het gebruik van de context te testen
const TestComponent = () => {
    const { user, setUser } = useUser();
  
    return (
      <div>
        <p data-testid="username">{user.username}</p>
        <button onClick={() => setUser({ ...user, username: 'newUser' })}>
          Update Username
        </button>
      </div>
    );
  };
  
  describe('UserContext', () => {
    test('updates user values correctly', async () => {
      render(
        <UserProvider>
          <TestComponent />
        </UserProvider>
      );
  
      // Gebruik act om de statusupdate te verpakken
      const button = screen.getByText(/update username/i);
      
      // Wacht op de statusupdate binnen act
      await act(async () => {
        fireEvent.click(button);
      });
  
      // Controleer of de gebruikersnaam is bijgewerkt
      const usernameElement = screen.getByTestId('username');
      expect(usernameElement).toHaveTextContent('newUser');
    });
  });