import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { PROVIDER_GOOGLE } from 'react-native-maps';

export default function Map() {

// const [hasLocationPermission, setHasLocationPermission] = useState(false);

// const requestLocationPermission = async () => {
//   try {
//     const granted = await PermissionsAndroid.check(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);
    
//     if (granted === PermissionsAndroid.RESULTS.GRANTED) {
//       setHasLocationPermission(true);
//       console.log('Location permission already granted');
//     } else {
//       const requestResult = await PermissionsAndroid.request(
//         PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
//         {
//           title: 'Location Permission Required',
//           message: 'EcoQuest needs access to your location',
//           buttonNegative: 'Cancel',
//           buttonPositive: 'OK',
//         },
//       );

//       if (requestResult === PermissionsAndroid.RESULTS.GRANTED) {
//         setHasLocationPermission(true);
//         console.log('Location permission granted');
//       } else {
//         setHasLocationPermission(false);
//         console.log('Location permission denied');
//       }
//     }
//   } catch (err) {
//     console.warn(err);
//   }
// };

//   useEffect(() => {
//     requestLocationPermission(); 
//   }, []);

    return (
          <MapView
          style={styles.map}
          provider={ PROVIDER_GOOGLE }
          // showsUserLocation
          // showsMyLocationButton
          />
      );
}

const styles = StyleSheet.create({
    map: {
        ...StyleSheet.absoluteFillObject,
    }
})
