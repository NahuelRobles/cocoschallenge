import React, { useState } from 'react';
import { View, TextInput, Button, FlatList, Text, StyleSheet } from 'react-native';
import { searchAssets } from '../services/api';

const SearchScreen = () => {
    const [query, setQuery] = useState('');
    const [results, setResults] = useState([]);
    const [searchPerformed, setSearchPerformed] = useState(false);

    const handleSearch = () => {
        if (!query.trim()) {
            setResults([]);
            setSearchPerformed(true);
            return;
        }
        searchAssets(query.trim())
            .then(response => {
                const filteredResults = response.data.filter(item =>
                    item.ticker.toLowerCase().includes(query.toLowerCase())
                );
                setResults(filteredResults);
                setSearchPerformed(true);
            })
            .catch(error => {
                console.log('Error durante la búsqueda:', error);
                setResults([]);
                setSearchPerformed(true);
            });
    };

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Buscar por ticker"
                value={query}
                onChangeText={setQuery}
            />
            <Button title="Buscar" onPress={handleSearch} />
            {searchPerformed && results.length === 0 ? (
                <Text style={styles.noResults}>No se encontró el producto</Text>
            ) : (
                <FlatList
                    data={results}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={styles.item}>
                            <Text style={styles.text}>{item.ticker}</Text>
                            <Text style={styles.text}>{item.name}</Text>
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
    },
    input: {
        height: 40,
        borderColor: '#ccc',
        borderWidth: 1,
        paddingHorizontal: 8,
        marginBottom: 16,
    },
    item: {
        padding: 8,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    text: {
        fontSize: 16,
    },
    noResults: {
        marginTop: 20,
        fontSize: 18,
        textAlign: 'center',
        color: 'gray',
    },
});

export default SearchScreen;
