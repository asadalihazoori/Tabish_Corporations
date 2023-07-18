import { View, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import COLORS from '../conts/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
const Search = ({ onSearch, searchValue }) => {
    return (
        <View style={styles.search}>
            <Icon name={'magnify'} size={30} color={COLORS.grey} />
            <TextInput
                onChangeText={onSearch}
                value={searchValue}
                placeholder="Search"
                placeholderTextColor={COLORS.grey}
                style={styles.input}
            />
        </View>
    )
}

export default Search;

const styles = StyleSheet.create({
    search: {
        // height: moderateScale(50),
        height: 50,
        width: '100%',
        backgroundColor: '#fff',
        borderRadius: 20,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
        borderWidth: 0.5,
        borderColor: COLORS.grey,
    },
    input: {
        height: '100%',
        width: '80%',
        color: COLORS.black,
    },
})
