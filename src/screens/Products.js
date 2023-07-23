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
      getProducts();
    });

    return unsubscribe;
  }, [navigation]);

  const incrementCount = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.product_id === productId
          ? { ...product, quantity: product.quantity + 1 }
          : product
      )
    );

  }
  const decrementCount = (productId) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.product_id === productId && product.quantity > 0
          ? { ...product, quantity: product.quantity - 1 }
          : product
      )
    );
  }

  const renderProductItem = ({ item }) => (
    <TouchableOpacity style={styles.container}>
      <Image source={require('../assets/product.png')} style={styles.image}></Image>
      <Text style={styles.name}>{item.products_name}</Text>
      <View style={styles.infoRow}>
        <Icon name="currency-usd" color={COLORS.red} size={16} style={styles.infoIcon} />
        <Text style={styles.infoText}>{item.product_price} </Text>
      </View>
      <View style={styles.cardview2}>
        <View style={styles.view6}>
          <TouchableOpacity
            style={[styles.btn1, { marginLeft: 5 }]}
            onPress={() => incrementCount(item.product_id)}
          >
            <Icon
              name={'plus'}
              size={15}
              color={COLORS.black}
            />
          </TouchableOpacity>
          <Text style={styles.btn2}>{item.quantity}</Text>
          <TouchableOpacity
            style={[styles.btn1, { marginRight: 5 }]}
            onPress={() => decrementCount(item.product_id)}
          >
            <Icon
              name={'minus'}
              size={15}
              color={COLORS.black}
            />
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );


  function getProducts() {
    ProductsAPI.getproducts().then((data) => {
      if (data) {
        const updatedProducts = data.result.map((product) => ({
          ...product,
          quantity: 0
        }));
        // setProducts(data.result);
        setProducts(updatedProducts);
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
    paddingHorizontal: '2.5%',
  },
  btn1: {
    height: 18,
    width: 18,
    borderRadius: 50,
    backgroundColor: COLORS.darkBlue,
    alignItems: 'center',
    justifyContent: 'center',
  },
  view6: {
    height: 30,
    width: 80,
    backgroundColor: COLORS.grey,
    borderRadius: 70,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardview2: {
    height: 50,
    width: '50%',
    justifyContent: 'center',
  },
});
