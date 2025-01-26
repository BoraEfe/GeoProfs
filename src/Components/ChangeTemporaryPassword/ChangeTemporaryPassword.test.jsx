import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import ChangeTemporaryPassword from './ChangeTemporaryPassword.jsx';
import '@testing-library/jest-dom';

describe('ChangeTemporaryPassword', () => {
    
    test('Show error if password is shorter dan 8 characters', async () => {
        render(
            <MemoryRouter>
                <ChangeTemporaryPassword />
            </MemoryRouter>
        )

        const passwordInput = screen.getByLabelText(/Nieuw wachtwoord/i);
        const submitButton = screen.getByRole('button', {name: /Wijzig wachtwoord/i});

        fireEvent.change(passwordInput, {target: {value: '1234567'}});
        fireEvent.click(submitButton);

        const error = await screen.findByText(/Wachtwoord moet minimaal 8 tekens bevatten/i);
        expect(error).toBeInTheDocument();
    });
})