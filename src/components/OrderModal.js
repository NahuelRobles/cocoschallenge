import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Modal, Alert } from 'react-native';
import { placeOrder } from '../services/api';

const OrderModal = ({ instrumentId, visible, closeModal }) => {
    const [side, setSide] = useState('BUY');
    const [type, setType] = useState('MARKET');
    const [quantity, setQuantity] = useState('');
    const [price, setPrice] = useState('');

    const handleSubmit = () => {
        if (!quantity || (type === 'LIMIT' && !price)) {
            Alert.alert('Error', 'Por favor completa todos los campos requeridos.');
            return;
        }

        const order = {
            instrument_id: instrumentId,
            side,
            type,
            quantity: parseInt(quantity, 10),
            ...(type === 'LIMIT' && { price: parseFloat(price) }),
        };

        placeOrder(order)
            .then(response => {
                Alert.alert('Orden Enviada', `ID: ${response.data.id}\nEstado: ${response.data.status}`);
                closeModal();
            })
            .catch(error => {
                Alert.alert('Error', 'No se pudo enviar la orden.');
                console.error(error);
            });
    };

    return (
        <Modal visible={visible} transparent={true} animationType="slide" onRequestClose={closeModal}>
            <View style={styles.overlay}>
                <View style={styles.container}>
                    <Text style={styles.title}>Orden para Instrumento {instrumentId}</Text>
                    <View style={styles.inputGroup}>
                        <Text>Tipo de Orden:</Text>
                        <View style={styles.buttonGroup}>
                            <Button
                                title="MARKET"
                                onPress={() => setType('MARKET')}
                                color={type === 'MARKET' ? 'blue' : 'gray'}
                            />
                            <Button
                                title="LIMIT"
                                onPress={() => setType('LIMIT')}
                                color={type === 'LIMIT' ? 'blue' : 'gray'}
                            />
                        </View>
                    </View>
                    <View style={styles.inputGroup}>
                        <Text>Operación:</Text>
                        <View style={styles.buttonGroup}>
                            <Button
                                title="BUY"
                                onPress={() => setSide('BUY')}
                                color={side === 'BUY' ? 'blue' : 'gray'}
                            />
                            <Button
                                title="SELL"
                                onPress={() => setSide('SELL')}
                                color={side === 'SELL' ? 'blue' : 'gray'}
                            />
                        </View>
                    </View>
                    <TextInput
                        style={styles.input}
                        placeholder="Cantidad"
                        keyboardType="numeric"
                        value={quantity}
                        onChangeText={setQuantity}
                    />
                    {type === 'LIMIT' && (
                        <TextInput
                            style={styles.input}
                            placeholder="Precio"
                            keyboardType="numeric"
                            value={price}
                            onChangeText={setPrice}
                        />
                    )}
                    <Button title="Enviar Orden" onPress={handleSubmit} />
                    <Button title="Cerrar" onPress={closeModal} color="red" />
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    overlay: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    container: {
        width: '90%',
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 16,
    },
    inputGroup: {
        marginBottom: 16,
    },
    buttonGroup: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 8,
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
});

export default OrderModal;
