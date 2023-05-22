import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import axios from 'axios';
import Ionicons from '@expo/vector-icons/Ionicons';
import { useRouter } from 'expo-router';
import { Product } from '../types';
import { useAuthentication } from '../hooks';


function MembershipScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product>();
  const [productId, setProductId] = useState<number>();

  const { user } = useAuthentication();
  

  const router = useRouter(); 

  useEffect(() => {
    const fetchProducts = async () => {
      const response = await axios.get('http://api.web.biso.no/api/products');
      setProducts(response.data as Product[]);
    };
    fetchProducts();
  }, []);

  const handleProductSelect = (product: Product) => {
    setSelectedProduct(product);
    setProductId(product.id);
  };

  //Alert for missing Vipps implementation
  const handleVippsAlert = () => {
    Alert.alert(
      'Vipps not yet implemented',
      'Vipps is not yet implemented in this app. Please use credit card.',
      [
        { text: 'OK', onPress: () => console.log('OK Pressed') },
      ],
      { cancelable: false }
    );
  };

  const routeToPaymentWithLogs = () => {
    console.log('selectedProduct', selectedProduct);
    router.push({ 
        pathname: '/PaymentScreen', 
        params: { 
            selectedProduct: JSON.stringify(productId),
            userId: user?.uid
        } 
    });
};

  const routeToVippsPaymentWithLogs = () => {
    console.log('selectedProduct', selectedProduct);
    router.push({
      pathname: '/VippsPaymentScreen',
      params: {
        productId: JSON.stringify(productId),
        name: JSON.stringify(selectedProduct?.name),
        price: JSON.stringify(selectedProduct?.price),
      }
    });
  };


  return (
    <View style={styles.container}>
      <Text style={styles.selectPaymentText}>Select membership</Text>
      <View style={styles.productsContainer}>
        {products.map((product) => (
          <TouchableOpacity
            style={[
              styles.productBox,
              selectedProduct && selectedProduct.id === product.id && styles.selectedProductBox,
            ]}
            key={product.id}
            onPress={() => handleProductSelect(product)}
          >
            {product.discount > 17 && (
              <View style={styles.saveAmountBox}>
                <Text style={styles.saveAmountText}> Save {((product.price / 300) * 100).toFixed(0)},-</Text>
              </View>
            )}
            <Text style={[styles.productName, selectedProduct && selectedProduct.id === product.id && styles.selectedProductName]}>{product.name}</Text>
            <Text style={[styles.productPrice, selectedProduct && selectedProduct.id === product.id && styles.selectedProductPrice]}>{product.price},-</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.infoContainer}>
        <Ionicons name="ios-information-circle-outline" size={24} color="black" />
        <Text style={styles.infoText}>
          Membership lasts until {
            //Date comes in format 2021-12-31
            selectedProduct && selectedProduct.expirationDate && selectedProduct.expirationDate.split('-').reverse().join('-')
          }.
          {selectedProduct && selectedProduct.discount > 0 && 
            <Text style={styles.infoText}>
              With this purchase, you save {(selectedProduct.discount.toFixed(0))}%.
            </Text>
          }
        </Text>
      </View>
      <View style={styles.buttonsContainer}>
        <TouchableOpacity disabled={!selectedProduct} onPress={routeToVippsPaymentWithLogs}>
          <Image source={require('../assets/vipps2.png')}  />
        </TouchableOpacity>
        <TouchableOpacity style={styles.payButton} disabled={!selectedProduct} onPress={routeToPaymentWithLogs}>
          <Text style={styles.payButtonText}>Pay with credit card</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    padding: 10,
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: 10,
  },
  logo: {
    width: 100,
    height: 100,
    resizeMode: 'contain',
  },
  selectPaymentText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 10,
    alignSelf: 'center',
  },
  productsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  productBox: {
    width: '30%',
    height: 150,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#fff',
    marginBottom: 10,
    padding: 10,
    justifyContent: 'space-between',
  },
  selectedProductBox: {
    borderColor: '#000',
    backgroundColor: 'black',
  },
  saveAmountBox: {
    backgroundColor: 'red',
    padding: 0,
    borderRadius: 5,
    marginTop: -11,

  },
  saveAmountText: {
    color: '#fff',
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  productName: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    position: 'absolute',
    top: 20,
    textTransform: 'uppercase',
  },
  selectedProductName: {
    color: 'white',
  },
  productPrice: {
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    position: 'absolute',
    bottom: 20,
  },
  selectedProductPrice: {
    color: 'white',
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
  },
  infoIcon: {
    width: 30,
    height: 30,
    backgroundColor: '#fff',
    borderRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },
  infoText: {
    fontSize: 16,
  },
  buttonsContainer: {
    flexDirection: 'column',
    alignItems: 'stretch',
    alignSelf: 'center',
    marginTop: 30,
  },
  dummyButton1: {
    width: '30%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  dummyButton2: {
    width: '30%',
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 2,
    borderColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButton: {
    width: '30%',
    height: 50,
    backgroundColor: '#000',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancelButtonText: {
    color: '#fff',
  },
  buttonText: {
    color: '#000',
  },
  payButton: {
    height: 50,
    backgroundColor: '#0a0a69',
    borderRadius: 40,
    marginTop: 30,
  },
  payButtonText: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    padding: 10,
  },
});

export default MembershipScreen;