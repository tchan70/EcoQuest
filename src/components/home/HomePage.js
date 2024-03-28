import { StyleSheet, Text, View } from "react-native";
import LogLitter from "./LogLitter";
import DailyQuest from "./DailyQuest";
import * as Location from 'expo-location';
import { useFocusEffect } from '@react-navigation/native';
import React from "react";

export default function HomePage({hasLocationPermission,setHasLocationPermission}) {
    
    useFocusEffect(
        React.useCallback(()=>{
        (async () => {
          
          let { status } = await Location.requestForegroundPermissionsAsync();
          if (status !== 'granted') {
            console.log('Permission to access location was denied');
            return;
          } else {
            console.log('Permission to access location authorized')
          setHasLocationPermission(true);
        }
        })();
    },[])
    );
      
        
    return (
        <View style={styles.view}>
            <Text>Home Page!!</Text>
            <DailyQuest style={styles.daily_quest} />
            <LogLitter style={styles.log_litter} hasLocationPermission={hasLocationPermission}/>
        </View>
    );
}

const styles = StyleSheet.create({
    view: {
        alignItems: "center",
    },
});
