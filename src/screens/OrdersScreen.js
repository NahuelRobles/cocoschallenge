
import React, { useState, useCallback } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { fetchOrders } from '../services/api';

const OrdersScreen = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);

    const loadOrders = async () => {
        try {
            setLoading(true);
            const response = await fetchOrders();
            setOrders(response.data || []);
        } catch (error) {
            console.log('Error al cargar órdenes:', error);
            setOrders([]);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        useCallback(() => {
            loadOrders();
        }, [])
    );

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Listado de Órdenes</Text>
            {loading ? (
                <Text style={styles.loading}>Cargando órdenes...</Text>
            ) : orders.length === 0 ? (
                <Text style={styles.noOrders}>No hay órdenes disponibles.</Text>
            ) : (
                <FlatList
                    data={orders}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.orderItem}>
                            <Text style={styles.text}>ID: {item.id}</Text>
                            <Text style={styles.text}>Estado: {item.status}</Text>
                            <Text style={styles.text}>Tipo: {item.type}</Text>
                            <Text style={styles.text}>Cantidad: {item.quantity}</Text>
                            {item.type === 'LIMIT' && (
                                <Text style={styles.text}>Precio: ${item.price}</Text>
                            )}
                        </View>
                    )}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    loading: {
        fontSize: 16,
        textAlign: 'center',
        color: 'blue',
    },
    noOrders: {
        fontSize: 16,
        textAlign: 'center',
        color: 'gray',
    },
    orderItem: {
        padding: 16,
        marginBottom: 8,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 8,
    },
    text: {
        fontSize: 16,
    },
});

export default OrdersScreen;
