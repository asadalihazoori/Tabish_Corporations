// import { View, Text } from 'react-native'
// import React from 'react'

// export default function Products() {
//   return (
//     <View style={{ width: '100%' }}>
//       <Loader visible={loading} />

//       <View style={styles.mainContainer}>
//         <Search onSearch={handleSearch} searchValue={searchQuery} />

//         <FlatList
//           data={searchQuery ? filteredData : customers}
//           renderItem={renderCustomerItem}
//           keyExtractor={(item) => item.customer_id.toString()}
//         />
//       </View>
//     </View>
//   )
// }


import React, { useEffect, useState, PureComponent } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Loader from '../components/Loader';
import COLORS from '../conts/colors';
import Search from '../components/Search';
import ProductsAPI from '../ApiServices/ProductsAPI';

export default function Products({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      getProfile();
    });

    return unsubscribe;
  }, [navigation]);

  const renderProductItem = ({ item }) => (
        <TouchableOpacity style={styles.container}>
            <Image source={require('../assets/product.png')} style={styles.image}></Image>
          <Text style={styles.name}>{item.products_name}</Text>
         {/* {item.customer_address && */}
            <View style={styles.infoRow}>
              <Icon name="currency-usd" color={COLORS.red} size={16} style={styles.infoIcon} />
              <Text style={styles.infoText}>20 </Text>
            </View>
            {/* }  */}
        </TouchableOpacity>
      );


  function getProfile() {
    ProductsAPI.getproducts().then((data) => {
      if (data) {
        setProducts(data.result);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredData = products.filter((item) =>
      item.products_name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filteredData);
  };

//   const renderCustomerItem = ({ item }) => <CustomerItem item={item} navigation={navigation} />;

  return (
    <View style={{ width: '100%' }}>
      <Loader visible={loading} />

      <View style={styles.mainContainer}>
        <Search onSearch={handleSearch} searchValue={searchQuery} />

        <FlatList
          data={searchQuery ? filteredData : products}
          renderItem={renderProductItem}
          keyExtractor={(item) => item.product_id.toString()}
          numColumns={2} 
          contentContainerStyle={styles.flatListContentContainer}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    marginTop: '4%',
    padding: 17,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    marginHorizontal: 10,
  },
  container: {
    width: '45%',
    backgroundColor: COLORS.light,
    borderRadius: 10,
    padding: 14,
    marginTop: '5%',
    margin: '2.5%'
    // borderWidth: 1,
    // borderColor: COLORS.blue
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  infoIcon: {
    marginRight: '2%',
    color: COLORS.blue,
  },
  infoText: {
    color: '#000000',
    fontSize: 14,
  },
  image: {
    height: 50,
    width: 50,
    alignSelf: 'center',
   
  },
  flatListContentContainer: {
    paddingHorizontal: '2.5%', // Adjust horizontal padding to center items
  },
});
