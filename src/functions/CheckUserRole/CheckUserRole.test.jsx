import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Voor extra matchers zoals toBeInTheDocument
import CheckUserRole from './CheckUserRole';

describe('CheckUserRole', () => {
  beforeEach(() => {
    // Zorg dat sessionStorage schoon is voor elke test
    sessionStorage.clear();
  });

  test('renders error message if role is null', () => {
    // Geen rol instellen
    render(<CheckUserRole />);

    // Controleer of de foutmelding wordt weergegeven
    const errorMessage = screen.getByText(/error/i);
    expect(errorMessage).toBeInTheDocument();
  });

  test('renders job function and department if role is present', () => {
    // Stel waarden in voor sessionStorage
    sessionStorage.setItem('department', 'Engineering');
    sessionStorage.setItem('role', '1');
    sessionStorage.setItem('function', 'Developer');

    render(<CheckUserRole />);

    // Controleer of de juiste tekst wordt weergegeven
    const displayText = screen.getByText(/Developer Engineering/i);
    expect(displayText).toBeInTheDocument();
  });

  test('renders job function and empty department if department is missing', () => {
    // Stel waarden in voor sessionStorage
    sessionStorage.setItem('role', '1');
    sessionStorage.setItem('function', 'Manager');

    render(<CheckUserRole />);

    // Controleer of de juiste tekst wordt weergegeven (lege department)
    const displayText = screen.getByText(/Manager /i); // Let op de spatie
    expect(displayText).toBeInTheDocument();
  });

  test('renders empty job function and department if both are missing', () => {
    // Stel alleen role in
    sessionStorage.setItem('role', '1');

    render(<CheckUserRole />);

    // Controleer of een lege string wordt weergegeven
    const displayText = screen.getByText(/ /i); // Lege string met een spatie
    expect(displayText).toBeInTheDocument();
  });
});
