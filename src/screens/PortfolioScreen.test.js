import React from 'react';
import { render, screen, waitFor } from '@testing-library/react-native';
import PortfolioScreen from '../screens/PortfolioScreen';
import { fetchPortfolio } from '../services/api';

jest.mock('../services/api', () => ({
    fetchPortfolio: jest.fn(),
}));

describe('PortfolioScreen', () => {
    const mockPortfolio = [
        {
            ticker: 'AAPL',
            quantity: 10,
            last_price: 150,
            avg_cost_price: 100,
        },
        {
            ticker: 'TSLA',
            quantity: 5,
            last_price: 200,
            avg_cost_price: 220,
        },
    ];

    beforeEach(() => {
        jest.clearAllMocks();
    });

    it('muestra correctamente los datos del portafolio', async () => {
        fetchPortfolio.mockResolvedValue({ data: mockPortfolio });

        render(<PortfolioScreen />);

        await waitFor(() => {
            expect(screen.getByText('Ticker: AAPL')).toBeTruthy();
            expect(screen.getByText('Cantidad: 10')).toBeTruthy();
            expect(screen.getByText('Valor de Mercado: $1500.00')).toBeTruthy();
            expect(screen.getByText('Ganancia: $500.00')).toBeTruthy();
            expect(screen.getByText('Rendimiento: 50.00%')).toBeTruthy();
        });
    });

    it('muestra mensaje de error si ocurre un fallo en la API', async () => {
        fetchPortfolio.mockRejectedValue(new Error('Error al cargar el portafolio'));

        render(<PortfolioScreen />);

        await waitFor(() => {
            expect(screen.queryByText('Ticker:')).toBeNull();
        });
    });

    it('muestra correctamente cuando no hay datos en el portafolio', async () => {
        fetchPortfolio.mockResolvedValue({ data: [] });

        render(<PortfolioScreen />);

        await waitFor(() => {
            expect(screen.queryByText('Ticker:')).toBeNull();
        });
    });
});
