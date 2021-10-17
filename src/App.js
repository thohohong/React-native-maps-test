import React, { useState, useEffect } from "react";
import { View, Text, PermissionsAndroid } from 'react-native';
import MapView, {PROVIDER_GOOGLE} from 'react-native-maps';
import Geolocation from 'react-native-geolocation-service';

const requestPermission = async () => {
  try {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log("granted!");
    }
  } catch (err) {
    console.warn(err);
  }
};

const App = () => {
  const [latitude, setLatitude] = useState(37.86659277486573);
  const [longitude, setLongitude] = useState(126.7851252841737);
  
  requestPermission();

  useEffect(() => {
    Geolocation.getCurrentPosition(
      position => {
        setLatitude(Number(position.coords.latitude + 10));
        setLongitude(Number(position.coords.longitude + 10));
      },
      error => {
        console.warn(err);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  }, []);
  
  
  return (
    <View style={{flex: 1}}>
      <MapView
        style={{ flex: 1 }}
        provider={PROVIDER_GOOGLE}
        initialRegion={{
          latitude: latitude,
          longitude: longitude,
          latitudeDelta: 0.0922,
          longitudeDelta: 0.0421,
        }}
      />

    </View>
  );
};

export default App;