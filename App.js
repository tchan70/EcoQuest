import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, Button } from 'react-native';
import { useEffect, useState } from 'react';
import { updatePoints, getPoints } from './src/db-test'
import { db } from './firebaseConfig';
import { ref, onValue, set } from 'firebase/database'

export default function App() {
  const [data, setData] = useState(0)
  const [user, setUser] = useState('bugslayer123')

  useEffect(() => {
    getPoints(user, setData)
  }, [])

  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />
      <Button title="fetch Data" onPress={() => { updatePoints('bugslayer123', 300) }} />
      <Text>{data}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
