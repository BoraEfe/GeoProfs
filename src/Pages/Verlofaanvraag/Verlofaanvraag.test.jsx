import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';  // Importeren van jest-dom matchers
import Verlofaanvraag from './Verlofaanvraag';


describe('Verlofaanvraag Component', () => {
  it('renders the component correctly', () => {
    render(<Verlofaanvraag />);

    expect(screen.getByText(/verlofaanvraag/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Reden van verlof/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Reden van verlof/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Verstuur/i })).toBeInTheDocument();
  });
});