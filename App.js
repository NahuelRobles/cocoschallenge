
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import InstrumentsScreen from './src/screens/InstrumentsScreen';
import PortfolioScreen from './src/screens/PortfolioScreen';
import SearchScreen from './src/screens/SearchScreen';
import OrdersScreen from './src/screens/OrdersScreen';
import { AppProvider } from './src/context/AppContext';

const Tab = createBottomTabNavigator();

export default function App() {
    return (
        <AppProvider>
            <NavigationContainer>
                <Tab.Navigator>
                    <Tab.Screen name="Instruments" component={InstrumentsScreen} />
                    <Tab.Screen name="Portfolio" component={PortfolioScreen} />
                    <Tab.Screen name="Search" component={SearchScreen} />
                    <Tab.Screen name="Orders" component={OrdersScreen} />
                </Tab.Navigator>
            </NavigationContainer>
        </AppProvider>
    );
}
