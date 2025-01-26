import React from 'react';
import { render, screen } from '@testing-library/react';
import HomePage from './HomePage';
import { useUser } from '../../functions/context/User';
import { useNavigate } from 'react-router-dom';

jest.mock('../../functions/context/User', () => ({
  useUser: jest.fn(() => ({ user: { uid: 'test-user' } }))
}));

jest.mock('react-router-dom', () => ({
  useNavigate: jest.fn(() => jest.fn()),
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