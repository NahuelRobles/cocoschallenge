import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import InstrumentsScreen from '../screens/InstrumentsScreen';
import { fetchInstruments } from '../services/api';

jest.mock('../services/api', () => ({
    fetchInstruments: jest.fn(),
}));

describe('InstrumentsScreen', () => {
    const mockInstruments = [
        { id: 1, ticker: 'AAPL', name: 'Apple', last_price: 150, close_price: 145 },
        { id: 2, ticker: 'TSLA', name: 'Tesla', last_price: 750, close_price: 740 },
    ];

    beforeEach(() => {
        fetchInstruments.mockResolvedValue({ data: mockInstruments });
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('muestra la lista de instrumentos después de cargar', async () => {
        render(<InstrumentsScreen />);

        await waitFor(() => {
            expect(screen.getByText('AAPL')).toBeTruthy();
            expect(screen.getByText('Tesla')).toBeTruthy();
        });
    });

    it('calcula correctamente el retorno para cada instrumento', async () => {
        render(<InstrumentsScreen />);

        await waitFor(() => {
            const appleReturn = screen.getByText('Retorno: 3.45%');
            const teslaReturn = screen.getByText('Retorno: 1.35%');

            expect(appleReturn).toBeTruthy();
            expect(teslaReturn).toBeTruthy();
        });
    });

    it('muestra el modal de orden cuando se selecciona un instrumento', async () => {
        render(<InstrumentsScreen />);

        await waitFor(() => {
            const appleItem = screen.getByText('AAPL');
            fireEvent.press(appleItem);
        });

        const modalTitle = screen.getByText('Orden para Instrumento 1');
        expect(modalTitle).toBeTruthy();
    });

    it('cierra el modal correctamente', async () => {
        render(<InstrumentsScreen />);

        await waitFor(() => {
            const appleItem = screen.getByText('AAPL');
            fireEvent.press(appleItem);
        });

        const closeButton = screen.getByText('Cerrar');
        fireEvent.press(closeButton);

        await waitFor(() => {
            expect(screen.queryByText('Orden para Instrumento 1')).toBeNull();
        });
    });

    it('maneja errores al cargar instrumentos', async () => {
        fetchInstruments.mockRejectedValueOnce(new Error('Error al cargar datos'));

        render(<InstrumentsScreen />);

        await waitFor(() => {
            expect(screen.queryByText('AAPL')).toBeNull();
            expect(screen.queryByText('Tesla')).toBeNull();
        });
    });
});
