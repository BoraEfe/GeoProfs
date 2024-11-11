import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Vakantiedagen from './Vakantiedagen';

jest.mock('../../context/User', () => ({
    useUser: () => ({
      user: { uuid: '12345', firstname: 'John', lastname: 'Doe' } // Voorbeeld van een mock-gebruiker
    })
  }));
  jest.mock('firebase/firestore', () => ({
    addDoc: jest.fn(() => Promise.resolve()),
    collection: jest.fn(),
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