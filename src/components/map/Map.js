import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Heatmap } from 'react-native-maps'
import * as Location from 'expo-location'
import { useFocusEffect } from '@react-navigation/native'
import { onValue, query, ref, set, orderByKey, limitToLast } from 'firebase/database'
import { db } from '../../../firebaseConfig'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { Slider } from '@miblanchard/react-native-slider'

export default function Map({ hasLocationPermission, setHasLocationPermission }) {
  const defaultTimeValue = 1

  const [coordinates, setCoordinates] = useState([{ latitude: 0, longitude: 0 }])
  const [timeSliderValue, setTimeSliderValue] = useState(defaultTimeValue) //set when slider is released
  const [slidingValue, setSlidingValue] = useState(defaultTimeValue) //set as slider is being moved
  const [heatmapDisplay, setHeatmapDisplay] = useState(false)

  const timeRangeTextOptions = [
    'hour',
    '2 hours',
    '3 hours',
    '4 hours',
    '8 hours',
    '12 hours',
    'day',
    '2 days',
    '4 days',
    'week',
  ]

  //useEffect(()=>{
  //    onValue(queriedPoints, (snapshot) => {
  //        const coordinates = []
  //        snapshot.forEach((child)=>{
  //            const timeBlockCoordinates = child.val()
  //            timeBlockCoordinates.forEach((coordinate) => {
  //                coordinates.push(coordinate);
  //            });
  //        })
  //        setRawCoordinates(coordinates)
  //        setHeatmapDisplay(true)
  //    })
  //}, [])

  useEffect(() => {
    setHeatmapDisplay(false)
    const startHours = [1, 2, 3, 4, 8, 12, 24, 48, 96, 168]
    const startHour = startHours[timeSliderValue - 1]

    onValue(query(ref(db, 'timestampedLocations'), orderByKey(), limitToLast(startHour)), (snapshot) => {
      const coordinatesArray = []
      snapshot.forEach((timeBlock) => {
        if (Array.isArray(timeBlock.val())) {
          coordinatesArray.push(timeBlock.val())
        } else {
          coordinatesArray.push(Object.values(timeBlock.val()))
        }

      })
      setCoordinates(coordinatesArray.flat())
    })
    setHeatmapDisplay(true)
  }, [timeSliderValue])

  useFocusEffect(() => {
    ; async () => {
      let { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        return
      } else {
        setHasLocationPermission(true)
      }
    }
  })

  const renderThumb = () => {
    return (
      <View style={styles.thumb}>
        {/* <Text style={styles.thumbText}>{timeSliderValue}</Text> */}
      </View>
    )
  }

  return (
    <View style={styles.pageContainer}>
      <View style={styles.sliderContainer}>
        <Text style={styles.text}>Litter picked up in the last {timeRangeTextOptions[slidingValue - 1]}</Text>
        <Text style={styles.text}>Litter picked up in the last {timeRangeTextOptions[slidingValue - 1]}</Text>
        <Text style={styles.text}>Litter picked up in the last {timeRangeTextOptions[slidingValue - 1]}</Text>
        <Text style={styles.text}>Litter picked up in the last {timeRangeTextOptions[slidingValue - 1]}</Text>
        <Text style={styles.text}>Litter picked up in the last {timeRangeTextOptions[slidingValue - 1]}</Text>
        <Text style={styles.text}>Litter picked up in the last {timeRangeTextOptions[slidingValue - 1]}</Text>
        <Text style={styles.text}>Litter picked up in the last {timeRangeTextOptions[slidingValue - 1]}</Text>
        <Slider
          renderThumbComponent={renderThumb}
          thumbStyle={styles.sliderThumb}
          minimumValue={1}
          maximumValue={10}
          step={1}
          style={styles.slider}
          value={slidingValue}
          onSlidingComplete={(value) => setTimeSliderValue(value)}
          onValueChange={(value) => setSlidingValue(value)}
        />
      </View>

      <View style={styles.mapContainer}>
        <MapView
          // for adding points when clicking on map
          //onPress={handlePress}
          style={styles.map}
          provider={PROVIDER_GOOGLE}
          showsUserLocation={hasLocationPermission}
          showsMyLocationButton
        >
          {heatmapDisplay ? <Heatmap points={coordinates} radius={20} opacity={0.6} /> : null}
        </MapView>
      </View>
    </View >
  )
}

const styles = StyleSheet.create({
  pageContainer: {
    flex: 1,
    justifyContent: "flex-end",
  },
  sliderContainer: {
    flex: 1,
    position: 'absolute',
    padding: 30,
    zIndex: 3,
    width: '100%',
    justifyContent: "center",
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  text: {
    position: "absolute",
    height: 50,
    width: 400,
    textAlign: "center",
    flex: 1,
    fontSize: 22,
    fontWeight: "500",
    color: 'powderblue',
    bottom: 75,
    padding: 10,
    zIndex: 2,
    margin: "auto",
    textShadowColor: "black",
    textShadowOffset: { width: 0, height: 0 },
    textShadowRadius: 10,
  },

  slider: {
    flex: 1,
    zIndex: 1,
  },
  thumb: {
    height: 45,
    width: 45,
    backgroundColor: 'powderblue',
    borderStyle: 'solid',
    borderWidth: 4,
    borderColor: 'black',
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 2,
  },
  thumbText: {
    fontSize: 30,
    margin: 'auto',
    color: 'black',
    zIndex: 2,
  },
})
