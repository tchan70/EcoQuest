import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, PermissionsAndroid, Button } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default function Map() {

const [hasLocationPermission, setHasLocationPermission] = useState(false);

  const requestLocationPermission = async () => {
    if (PermissionsAndroid.RESULTS.DENIED) {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Location Permission Required',
          message:
            'EcoQuest App needs access to your location',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        setHasLocationPermission(true);
        console.log('You can see your location');
      } else if (granted === PermissionsAndroid.RESULTS.DENIED) {
        setHasLocationPermission(false);
        console.log('Location access denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }
  };

  useEffect(() => {
    requestLocationPermission(); 
  }, []);

    return (
          <MapView
          style={styles.map}
          provider={ PROVIDER_GOOGLE }
          showsUserLocation={hasLocationPermission}
          />
      );
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
        top: '10%',
        bottom: '10%',
    }
})
