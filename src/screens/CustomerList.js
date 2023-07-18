// import { View, Text, Image, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
// import React, { useEffect, useState } from 'react'
// import Loader from '../components/Loader';
// import COLORS from '../conts/colors';
// import CustomerAPI from '../ApiServices/CustomerAPI';
// import Search from '../components/Search';
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

// export default function CustomerList() {
//   const [loading, setLoading] = React.useState(true);
//   const [customers, setCustomers] = React.useState([]);
//   const [searchQuery, setSearchQuery] = useState('');
//   const [filteredData, setFilteredData] = useState([]);
//   useEffect(() => {
//     getProfile();
//   }, []);

//   function getProfile() {
//     CustomerAPI.getCustomer()
//       .then((data) => {
//         if (data) {
//           setCustomers(data.result);
//           setLoading(false);
//         }
//         else {
//           setLoading(false);

//         }
//       });

//   }
//   const handleSearch = (text) => {
//     setSearchQuery(text);
//     const filteredData = customers.filter(item => item.customer_name.toLowerCase().includes(text.toLowerCase()));
//     setFilteredData(filteredData);
//   };

//   const renderCustomerItem = ({ item }) => (
//     <TouchableOpacity style={styles.container}>
//       <Text style={styles.name}>{item.customer_name}</Text>
//       {item.customer_address &&
//         <View style={styles.infoRow}>
//           <Icon name="map-marker-outline" color={COLORS.red} size={16} style={styles.infoIcon} />
//           <Text style={styles.infoText}>{item.customer_address}</Text>
//         </View>}
//     </TouchableOpacity>
//   );

//   return (
//     <View style={{ width: '100%', }}>
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

// const styles = StyleSheet.create({
//   mainContainer: {
//     backgroundColor: '#FFFFFF',
//     borderRadius: 10,
//     marginTop: "4%",
//     padding: 17,
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//     marginHorizontal: 10,
//     // borderWidth: 1,
//     // borderColor: "green"


//   },
//   container: {
//     width: '100%',
//     backgroundColor: COLORS.light,
//     borderRadius: 10,
//     padding: 14,
//     marginTop: "5%",
//     // borderWidth: 1,
//     // borderColor: "pink"
//   },
//   profileImage: {
//     width: 120,
//     height: 120,
//     borderRadius: 60,
//   },
//   name: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     color: "#000000",
//   },

//   infoRow: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginTop: 10,
//   },
//   infoIcon: {
//     marginRight: '2%',
//     color: COLORS.blue,
//   },
//   infoText: {
//     color: '#000000',
//     fontSize: 14,
//   },
// });


import React, { useEffect, useState, PureComponent } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

import Loader from '../components/Loader';
import COLORS from '../conts/colors';
import CustomerAPI from '../ApiServices/CustomerAPI';
import Search from '../components/Search';

class CustomerItem extends PureComponent {
  render() {
    const { item, navigation } = this.props;

    return (
      <TouchableOpacity style={styles.container}
        onPress={() => navigation.navigate('Update Customers', { customer: item })}>
        <Text style={styles.name}>{item.customer_name}</Text>
        {item.customer_address && (
          <View style={styles.infoRow}>
            <Icon name="map-marker-outline" color={COLORS.red} size={16} style={styles.infoIcon} />
            <Text style={styles.infoText}>{item.customer_address}</Text>
          </View>
        )}
      </TouchableOpacity>
    );
  }
}

export default function CustomerList({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [customers, setCustomers] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    getProfile();
  }, []);

  function getProfile() {
    CustomerAPI.getCustomer().then((data) => {
      if (data) {
        setCustomers(data.result);
        setLoading(false);
      } else {
        setLoading(false);
      }
    });
  }

  const handleSearch = (text) => {
    setSearchQuery(text);
    const filteredData = customers.filter((item) =>
      item.customer_name.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredData(filteredData);
  };

  const renderCustomerItem = ({ item }) => <CustomerItem item={item} navigation={navigation} />;

  return (
    <View style={{ width: '100%' }}>
      <Loader visible={loading} />

      <View style={styles.mainContainer}>
        <Search onSearch={handleSearch} searchValue={searchQuery} />

        <FlatList
          data={searchQuery ? filteredData : customers}
          renderItem={renderCustomerItem}
          keyExtractor={(item) => item.customer_id.toString()}
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
    width: '100%',
    backgroundColor: COLORS.light,
    borderRadius: 10,
    padding: 14,
    marginTop: '5%',
  },
  name: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000000',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  infoIcon: {
    marginRight: '2%',
    color: COLORS.blue,
  },
  infoText: {
    color: '#000000',
    fontSize: 14,
  },
});
