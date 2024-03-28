import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Heatmap } from 'react-native-maps';
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native';
import { onValue, query, ref, set } from 'firebase/database';
import { db } from '../../../firebaseConfig';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function Map({hasLocationPermission,setHasLocationPermission}) {
  const [pointsData, setPointsData] = useState([])
  const [heatmapDisplay, setHeatmapDisplay] =useState(false)

  const queriedPoints = ref(db, 'locations')

  useEffect(()=>{
    onValue(queriedPoints, (snapshot) => {
      const coordinates = []
      snapshot.forEach((child)=>{
        const {latitude, longitude} = child.val()

        coordinates.push({latitude: latitude, longitude: longitude})
        
        
      })

      setPointsData(coordinates)
      setHeatmapDisplay(true)
    })
  }, [])

  useFocusEffect(() => {
    (async () => {
      
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        //console.log('Permission to access location was denied');
        return;
      } else {
        //console.log('Permission to access location authorized')
      setHasLocationPermission(true);

    }
    })();
  });

    const handlePress = (event)=>{
      const {coordinate} = event.nativeEvent
      {}
      set(ref(db, `locations/${Date.now()}/`), {latitude: coordinate.latitude, longitude: coordinate.longitude })
    }

    return (
      <View style={styles.map}>
          <MapView
          // for adding points when clicking on map
          //onPress={handlePress}
          style={styles.map}
          provider={ PROVIDER_GOOGLE }
          showsUserLocation={hasLocationPermission}
          showsMyLocationButton
          >
          {heatmapDisplay ? <Heatmap points={pointsData} radius={30} opacity={0.7}/> : null}
          </MapView>
      </View>
      );
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    }
})
