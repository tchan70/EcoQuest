import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Heatmap } from 'react-native-maps'
import * as Location from 'expo-location'
import { useFocusEffect } from '@react-navigation/native'
import { onValue, query, ref, set } from 'firebase/database'
import { db } from '../../../firebaseConfig'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { Slider } from '@miblanchard/react-native-slider'

export default function Map({ hasLocationPermission, setHasLocationPermission }) {
    const [pointsData, setPointsData] = useState([])
    const [heatmapDisplay, setHeatmapDisplay] = useState(false)
    const [sliderValue, setSliderValue] = useState(1)

    const queriedPoints = ref(db, 'locations')

    useEffect(() => {
        onValue(queriedPoints, (snapshot) => {
            const coordinates = []
            snapshot.forEach((child) => {
                const { latitude, longitude } = child.val()

                coordinates.push({ latitude: latitude, longitude: longitude })
            })

            setPointsData(coordinates)
            setHeatmapDisplay(true)
        })
    }, [])

    useFocusEffect(() => {
        ;(async () => {
            let { status } = await Location.requestForegroundPermissionsAsync()
            if (status !== 'granted') {
                //console.log('Permission to access location was denied');
                return
            } else {
                //console.log('Permission to access location authorized')
                setHasLocationPermission(true)
            }
        })()
    })

    const handlePress = (event) => {
        const { coordinate } = event.nativeEvent
        {
        }
        set(ref(db, `locations/${Date.now()}/`), { latitude: coordinate.latitude, longitude: coordinate.longitude })
    }

    const renderThumb = ()=>{
      return ( 
        <View style={styles.thumb}>
          <Text style={styles.thumbText}>{sliderValue}</Text>
        </View>
      )
    }

    return (
        <View style={styles.pageContainer}>
            <View style={styles.sliderContainer}>
                <Slider
                  renderThumbComponent={renderThumb}
                  thumbStyle={styles.sliderThumb}
                  minimumValue={1}
                  maximumValue={10}
                  step={1} 
                  style={styles.slider} 
                  value={sliderValue}
                  onValueChange={value => setSliderValue(value)}
                />
                <Text style={styles.text}>{sliderValue}</Text>
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
                    {heatmapDisplay ? <Heatmap points={pointsData} radius={30} opacity={0.7} /> : null}
                </MapView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    pageContainer:{
      flex: 1,
    },
    sliderContainer: {
      flex: 1,
      position: "absolute",
      padding: 30,
      zIndex: 3,
      width: "100%"
    },
    mapContainer: {
        flex: 1,
    },
    map: {
      ...StyleSheet.absoluteFillObject
    },
    text: {
        flex: 1,
    },
    slider: {
      flex: 1,
      zIndex: 1,
    },
    thumb: {
      height: 60,
      width: 60,
      backgroundColor: "powderblue",
      borderStyle: "solid",
      borderWidth: 4,
      borderColor: "black",
      borderRadius: 20,
      alignItems: "center",
      justifyContent: "center",
    },
    thumbText: {
      fontSize: 30,
      margin: "auto",
      color: "black",
    }
})
