import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react-native';
import SearchScreen from '../screens/SearchScreen';
import { searchAssets } from '../services/api';

jest.mock('../services/api', () => ({
    searchAssets: jest.fn(),
}));

describe('SearchScreen', () => {
    const mockSearchResults = [
        { id: 1, ticker: 'AAPL', name: 'Apple Inc.' },
        { id: 2, ticker: 'TSLA', name: 'Tesla Motors' },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('muestra resultados de búsqueda correctamente', async () => {
        searchAssets.mockResolvedValue({ data: mockSearchResults });

        render(<SearchScreen />);

        fireEvent.changeText(screen.getByPlaceholderText('Buscar por ticker'), 'AAPL');
        fireEvent.press(screen.getByText('Buscar'));

        await waitFor(() => {
            expect(screen.getByText('AAPL')).toBeTruthy();
            expect(screen.getByText('Apple Inc.')).toBeTruthy();
        });
    });

    it('muestra "No se encontró el producto" si no hay resultados', async () => {
        searchAssets.mockResolvedValue({ data: [] });

        render(<SearchScreen />);

        fireEvent.changeText(screen.getByPlaceholderText('Buscar por ticker'), 'XYZ');
        fireEvent.press(screen.getByText('Buscar'));

        await waitFor(() => {
            expect(screen.getByText('No se encontró el producto')).toBeTruthy();
        });
    });

    it('maneja correctamente una búsqueda vacía', async () => {
        render(<SearchScreen />);

        fireEvent.press(screen.getByText('Buscar'));

        await waitFor(() => {
            expect(screen.getByText('No se encontró el producto')).toBeTruthy();
        });
    });

    it('maneja errores del API durante la búsqueda', async () => {
        searchAssets.mockRejectedValue(new Error('Error en el servidor'));

        render(<SearchScreen />);

        fireEvent.changeText(screen.getByPlaceholderText('Buscar por ticker'), 'AAPL');
        fireEvent.press(screen.getByText('Buscar'));

        await waitFor(() => {
            expect(screen.getByText('No se encontró el producto')).toBeTruthy();
        });
    });

    it('filtra los resultados de búsqueda por el ticker ingresado', async () => {
        searchAssets.mockResolvedValue({ data: mockSearchResults });

        render(<SearchScreen />);

        fireEvent.changeText(screen.getByPlaceholderText('Buscar por ticker'), 'TSLA');
        fireEvent.press(screen.getByText('Buscar'));

        await waitFor(() => {
            expect(screen.getByText('TSLA')).toBeTruthy();
            expect(screen.getByText('Tesla Motors')).toBeTruthy();
            expect(screen.queryByText('AAPL')).toBeNull(); // No debería aparecer
        });
    });
});
