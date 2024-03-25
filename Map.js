import React, { useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Heatmap } from 'react-native-maps';
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native';

export default function Map() {

const [hasLocationPermission, setHasLocationPermission] = useState(false);
// const [location, setLocation] = useState(null);

const data = [
  {
    latitude: 51.509865,
    longitude: -0.118092
  },
  {
    latitude: 51.528308,
    longitude: -0.128299
  },
  {
    latitude: 51.503364,
    longitude: -0.127625
  }
]


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
      <View style={styles.map}>
          <MapView
          style={styles.map}
          provider={ PROVIDER_GOOGLE }
          showsUserLocation={hasLocationPermission}
          showsMyLocationButton
          >
          <Heatmap points={data}/>
          </MapView>
      </View>
      );
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    }
})
