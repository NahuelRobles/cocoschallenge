import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { fetchInstruments } from '../services/api';
import OrderModal from '../components/OrderModal';

const InstrumentsScreen = () => {
    const [instruments, setInstruments] = useState([]);
    const [selectedInstrument, setSelectedInstrument] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    React.useEffect(() => {
        fetchInstruments()
            .then(response => setInstruments(response.data))
            .catch(error => console.error('Error al cargar instrumentos:', error));
    }, []);

    const calculateReturn = (lastPrice, closePrice) => {
        return ((lastPrice - closePrice) / closePrice) * 100;
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={instruments}
                keyExtractor={(item) => item.id.toString()}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.item}
                        onPress={() => {
                            setSelectedInstrument(item.id);
                            setModalVisible(true);
                        }}
                    >
                        <Text style={styles.text}>{item.ticker}</Text>
                        <Text style={styles.text}>{item.name}</Text>
                        <Text style={styles.text}>${item.last_price}</Text>
                        <Text style={styles.text}>
                            Retorno: {calculateReturn(item.last_price, item.close_price).toFixed(2)}%
                        </Text>
                    </TouchableOpacity>
                )}
            />
            {selectedInstrument && (
                <OrderModal
                    instrumentId={selectedInstrument}
                    visible={modalVisible}
                    closeModal={() => {
                        setModalVisible(false);
                        setSelectedInstrument(null);
                    }}
                />
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    item: {
        padding: 16,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    text: {
        fontSize: 16,
    },
});

export default InstrumentsScreen;
