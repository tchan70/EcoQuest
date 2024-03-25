import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native';

export default function Map() {

const [hasLocationPermission, setHasLocationPermission] = useState(false);
// const [location, setLocation] = useState(null);


  useFocusEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permission to access location was denied');
        return;
      } else {
        console.log('Permission to access location authorized')
        //  location = await Location.getCurrentPositionAsync({});
      setHasLocationPermission(true);
      // setLocation(location);
    }
    })();
  });

    return (
          <MapView
          style={styles.map}
          provider={ PROVIDER_GOOGLE }
          showsUserLocation={hasLocationPermission}
          showsMyLocationButton
          />
      );
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    }
})
