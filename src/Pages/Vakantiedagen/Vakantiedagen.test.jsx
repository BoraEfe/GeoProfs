import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Vakantiedagen from './Vakantiedagen';

// Mock de useUser hook en retourneer een mock user
jest.mock('../../context/User', () => ({
  useUser: () => ({
    user: { uuid: '12345', firstname: 'John', lastname: 'Doe' } // Voorbeeld van een mock-gebruiker
  })
}));

describe('Vakantiedagen Component', () => {
  test('renders form elements correctly', () => {
    render(<Vakantiedagen />);

    // Controleer of de belangrijkste formulier elementen aanwezig zijn
    expect(screen.getByText('Van datum')).toBeInTheDocument();
    expect(screen.getByText('Tot datum')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('opmerkingen')).toBeInTheDocument();
    expect(screen.getByText('Verstuur')).toBeInTheDocument();
  });
});
