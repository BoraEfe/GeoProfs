import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom'; // Voor extra matchers zoals toBeInTheDocument
import CheckForAccesToLeavePage from './CheckForAccesToLeavePage';

describe('CheckForAccesToLeavePage', () => {
  beforeEach(() => {
    // Zorg dat sessionStorage schoon is voor elke test
    sessionStorage.clear();
  });

  test('renders link if role is allowed', () => {
    // Stel een toegestane rol in
    sessionStorage.setItem('role', '1');

    render(<CheckForAccesToLeavePage />);

    // Controleer of de link correct wordt weergegeven
    const linkElement = screen.getByRole('link', { name: /verlofbeheer/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/admin');
  });

  test('does not render link if role is not allowed', () => {
    // Stel een niet-toegestane rol in
    sessionStorage.setItem('role', '4');

    render(<CheckForAccesToLeavePage />);

    // Controleer dat de link niet wordt weergegeven
    const linkElement = screen.queryByRole('link', { name: /verlofbeheer/i });
    expect(linkElement).not.toBeInTheDocument();
  });

  test('does not render link if role is missing', () => {
    // Geen rol instellen

    render(<CheckForAccesToLeavePage />);

    // Controleer dat de link niet wordt weergegeven
    const linkElement = screen.queryByRole('link', { name: /verlofbeheer/i });
    expect(linkElement).not.toBeInTheDocument();
  });
});
