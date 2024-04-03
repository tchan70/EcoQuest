import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { db } from "../../../firebaseConfig";
import { ref, set } from "firebase/database";
import { useEffect, useState } from "react";
import * as Location from "expo-location";
import { useGameContext } from "../../../hooks/useGameContext";

export default function LogLitter({ hasLocationPermission }) {
  const {
    updateUserPoints, decrementLitterCount, 
    completedQuestReward, rewardDistributed, setRewardDistributed
  } = useGameContext();
  const [updateQueue, setUpdateQueue] = useState([]);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [thankYouVisible, setThankYouVisible] = useState(false);

  useEffect(() => {
    if (updateQueue.length > 0) {
      const nextUpdate = updateQueue[0];
      nextUpdate(); 
      setUpdateQueue(currentQueue => currentQueue.slice(1)); 
    }
  }, [updateQueue]); 

  const addToQueue = (updateFunction) => {
    setUpdateQueue(currentQueue => [...currentQueue, updateFunction]);
  };

  const postLitterLocation = async () => {
    setThankYouVisible(true);
    setButtonDisabled(true);

    const questJustCompleted = await decrementLitterCount();
    addToQueue(() => updateUserPoints(1)); 

    if (questJustCompleted && !rewardDistributed) {
        addToQueue(() => {
            updateUserPoints(completedQuestReward + 1);
            setRewardDistributed(true);
        });
    }

    if (hasLocationPermission) {
        let currentLocation = await Location.getCurrentPositionAsync({});
        try {
            await set(ref(db, `locations/${Date.now()}`), {
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
            });
        } catch (error) {
            console.error(error);
        }
    }

    setTimeout(() => {
        setThankYouVisible(false);
        setButtonDisabled(false);
    }, 2500);
  };

  return (
    <View>
      <TouchableOpacity
        onPress={postLitterLocation}
        disabled={buttonDisabled}
        style={[
          styles.buttonCommon,
          buttonDisabled ? styles.disabledButton : styles.button,
        ]}>
        <Text style={styles.text}>LOG LITTER</Text>
      </TouchableOpacity>
      <Modal
        animationType="slide"
        transparent={true}
        visible={thankYouVisible}
        onRequestClose={() => setThankYouVisible(false)}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>
              You've earned a point! Thank you for keeping our earth clean! :)
            </Text>
          </View>
        </View>
      </Modal>
    </View>
  );
}


const styles = StyleSheet.create({
  buttonCommon: {
    borderWidth: 2,
    borderRadius: 30,
    width: 250,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
    elevation: 4,
  },

  button: {
    backgroundColor: "#228B22",
  },
  disabledButton: {
    backgroundColor: "#A9A9A9",
  },
  text: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  outerModalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    color: "#228B22",
  },
});
