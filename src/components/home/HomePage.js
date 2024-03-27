import { StyleSheet, Text, View } from "react-native";
import LogLitter from "./LogLitter";
import DailyQuest from "./DailyQuest";
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native';
import React, { useCallback, useState } from "react";

export default function HomePage({location, setLocation}) {
    const [hasLocationPermission, setHasLocationPermission] = useState(false);
    
    useFocusEffect(
        React.useCallback(()=>{
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
          } else {
            console.log('Permission to access location authorized')
             currentLocation = await Location.getCurrentPositionAsync({});
          setHasLocationPermission(true);
          setLocation({latitude: currentLocation.coords.latitude, longitude: currentLocation.coords.longitude});
        }
        })();
    },[])
    );
      
        
    return (
        <View style={styles.view}>
            <Text>Home Page!!</Text>
            <DailyQuest style={styles.daily_quest} />
            <LogLitter style={styles.log_litter} location={location}/>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
    },
});
