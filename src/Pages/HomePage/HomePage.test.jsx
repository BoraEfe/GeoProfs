import React from 'react';
import {configure, render, screen } from '@testing-library/react';
import HomePage from './HomePage';

configure({
    react: React,
  });
jest.mock('../../functions/context/User', () => ({
  useUser: jest.fn(() => ({ user: { uid: 'test-user' } }))
}));


describe('HomePage Component', () => {
  it('renders the component correctly', () => {
    render(<HomePage />);

    expect(screen.getByText(/Verlof aanvragen/i)).toBeInTheDocument();
    expect(screen.getByText(/Aantal vakantiedagen:/i)).toBeInTheDocument();
    expect(screen.getByText(/Alle aanvragen/i)).toBeInTheDocument();
    expect(screen.getByText(/Welkom/i)).toBeInTheDocument();
    expect(screen.getByText('test-user')).toBeInTheDocument();
  });
});