import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView, { PROVIDER_GOOGLE, Heatmap } from 'react-native-maps'
import * as Location from 'expo-location'
import { useFocusEffect } from '@react-navigation/native'
import { onValue, query, ref, set, orderByKey, limitToLast } from 'firebase/database'
import { db } from '../../../firebaseConfig'
import { Colors } from 'react-native/Libraries/NewAppScreen'
import { Slider } from '@miblanchard/react-native-slider'

export default function Map({hasLocationPermission,setHasLocationPermission}) {
    const [coordinates, setCoordinates] = useState([{ latitude: 0, longitude: 0 }]);
    const [timeSliderValue, setTimeSliderValue] = useState(2);
    const [heatmapDisplay, setHeatmapDisplay] =useState(false)


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

    useEffect(()=>{
        setHeatmapDisplay(false);
        const startHours = [1, 2, 3, 4, 8, 12, 24, 48, 96, 168];
        const startHour = startHours[timeSliderValue - 1];
        
        onValue(query(ref(db, 'timestampedLocations'), orderByKey(), limitToLast(startHour)), (snapshot) => {
            const coordinatesArray = [];
            snapshot.forEach((timeBlock) => {
                coordinatesArray.push(timeBlock.val());
            });
            setCoordinates(coordinatesArray.flat());
        })
        setHeatmapDisplay(true);
    }, [timeSliderValue])

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
        })
    })

    const renderThumb = ()=>{
        return ( 
            <View style={styles.thumb}>
            <Text style={styles.thumbText}>{timeSliderValue}</Text>
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
        value={timeSliderValue}
        onValueChange={value => setTimeSliderValue(value)}
        />
        <Text style={styles.text}>{timeSliderValue}</Text>
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
        {heatmapDisplay ? <Heatmap points={coordinates} radius={20} opacity={0.5} /> : null}
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
        zIndex: 2,
    },
    thumbText: {
        fontSize: 30,
        margin: "auto",
        color: "black",
        zIndex: 2,
    }
})
