
export const calculateReturn = (lastPrice, closePrice) => {
    return ((lastPrice - closePrice) / closePrice) * 100;
};

export const calculateMarketValue = (quantity, lastPrice) => {
    return quantity * lastPrice;
};

export const calculateProfit = (marketValue, avgCostPrice, quantity) => {
    return marketValue - (avgCostPrice * quantity);
};

export const calculateReturnPercentage = (profit, avgCostPrice, quantity) => {
    return (profit / (avgCostPrice * quantity)) * 100;
};
