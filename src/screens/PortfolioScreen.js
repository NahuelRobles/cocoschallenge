import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { fetchPortfolio } from '../services/api';

const PortfolioScreen = () => {
    const [portfolio, setPortfolio] = useState([]);

    useEffect(() => {
        fetchPortfolio()
            .then(response => setPortfolio(response.data))
            .catch(error => console.log(error));
    }, []);

    const calculateMarketValue = (quantity, lastPrice) => quantity * lastPrice;
    const calculateProfit = (marketValue, avgCostPrice, quantity) =>
        marketValue - avgCostPrice * quantity;
    const calculateReturn = (profit, avgCostPrice, quantity) =>
        (profit / (avgCostPrice * quantity)) * 100;

    return (
        <View style={styles.container}>
            <FlatList
                data={portfolio}
                keyExtractor={(item) => item.ticker}
                renderItem={({ item }) => {
                    const marketValue = calculateMarketValue(item.quantity, item.last_price);
                    const profit = calculateProfit(marketValue, item.avg_cost_price, item.quantity);
                    const returnPercentage = calculateReturn(profit, item.avg_cost_price, item.quantity);

                    return (
                        <View style={styles.item}>
                            <Text style={styles.text}>Ticker: {item.ticker}</Text>
                            <Text style={styles.text}>Cantidad: {item.quantity}</Text>
                            <Text style={styles.text}>Valor de Mercado: ${marketValue.toFixed(2)}</Text>
                            <Text style={styles.text}>Ganancia: ${profit.toFixed(2)}</Text>
                            <Text style={styles.text}>Rendimiento: {returnPercentage.toFixed(2)}%</Text>
                        </View>
                    );
                }}
            />
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    item: {
        marginBottom: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        paddingBottom: 8,
    },
    text: {
        fontSize: 16,
    },
});

export default PortfolioScreen;
