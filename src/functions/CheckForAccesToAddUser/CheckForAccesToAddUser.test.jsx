import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import CheckForAccesToAddUser from './CheckForAccesToAddUser';

describe('CheckForAccesToAddUser', () => {
  beforeEach(() => {
    // Zorg dat sessionStorage schoon is voor elke test
    sessionStorage.clear();
  });

  test('renders link if role is allowed', () => {
    // Stel een toegestane rol in
    sessionStorage.setItem('role', '1');

    render(<CheckForAccesToAddUser />);

    // Controleer of de link correct wordt weergegeven
    const linkElement = screen.getByRole('link', { name: /gebruiker toevoegen/i });
    expect(linkElement).toBeInTheDocument();
    expect(linkElement).toHaveAttribute('href', '/adduser');
  });

  test('does not render link if role is not allowed', () => {
    // Stel een niet-toegestane rol in
    sessionStorage.setItem('role', '3');

    render(<CheckForAccesToAddUser />);

    // Controleer dat de link niet wordt weergegeven
    const linkElement = screen.queryByRole('link', { name: /gebruiker toevoegen/i });
    expect(linkElement).not.toBeInTheDocument();
  });

  test('does not render link if role is missing', () => {
    // Geen rol instellen

    render(<CheckForAccesToAddUser />);

    // Controleer dat de link niet wordt weergegeven
    const linkElement = screen.queryByRole('link', { name: /gebruiker toevoegen/i });
    expect(linkElement).not.toBeInTheDocument();
  });
});
