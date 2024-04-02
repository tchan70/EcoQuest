import React, { useEffect, useState } from 'react';
import { StyleSheet, View } from 'react-native';
import MapView, { PROVIDER_GOOGLE, Heatmap } from 'react-native-maps';
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native';
import { onValue, query, ref, set } from 'firebase/database';
import { db } from '../../../firebaseConfig';
import { Colors } from 'react-native/Libraries/NewAppScreen';

export default function Map({hasLocationPermission,setHasLocationPermission}) {
  const [rawCoordinates, setRawCoordinates] = useState([]);
  const [filteredCoordinates, setFilteredCoordinates] = useState([]);
  const [timeSliderValue, setTimeSliderValue] = useState();
  const [heatmapDisplay, setHeatmapDisplay] =useState(false)

  const queriedPoints = ref(db, 'timestampedLocations')

  useEffect(()=>{
    onValue(queriedPoints, (snapshot) => {
      const coordinates = []
      snapshot.forEach((child)=>{
        const timeBlockCoordinates = child.val()
          timeBlockCoordinates.forEach((coordinate) => {
              coordinates.push(coordinate);
          });
      })
      setRawCoordinates(coordinates)
      setHeatmapDisplay(true)
    })
  }, [])

  useEffect(()=>{
      const startTime = null;
      const startTimes = [-1, -2, -3, -4, -8, -12, -24, -48, -96, -168];
      const currentHour = Math.floor(Date.now()/3600000);
      switch (timeSliderValue) {
          case 1:
              startTime = startTimes[0];
              break;
          case 2:
              startTime = startTimes[1];
              break;
          case 3:
              startTime = startTimes[2];
              break;
          case 4:
              startTime = startTimes[3];
              break;
          case 5:
              startTime = startTimes[4];
              break;
          case 6:
              startTime = startTimes[5];
              break;
          case 7:
              startTime = startTimes[6];
              break;
          case 8:
              startTime = startTimes[7];
              break;
          case 9:
              startTime = startTimes[8];
              break;
          case 10:
              startTime = startTimes[9];
              break;
          default:
              break;
      };

  }, [coordinatesStartTimeNumber])

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
          {heatmapDisplay ? <Heatmap points={rawCoordinates} radius={30} opacity={0.7}/> : null}
          </MapView>
      </View>
      );
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    }
})
