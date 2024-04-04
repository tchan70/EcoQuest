import React, { useState, useEffect } from "react";
import { Dimensions, Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as Location from "expo-location";
import { ref, set } from "firebase/database";
import { db } from "../../../firebaseConfig";
import { useGameContext } from "../../../hooks/useGameContext";

const { width, height } = Dimensions.get("window");

const scaleText = (size) => {
  const scaleFactor = Math.min(width / 360, height / 640); 
  return size * scaleFactor;
};

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
            await set(ref(db, `timestampedLocations/${Math.floor(Date.now()/3600000)}/`), {
                latitude: currentLocation.coords.latitude,
                longitude: currentLocation.coords.longitude,
            });
        } catch (error) {
            console.error(error);
        }
    }

    setTimeout(() => {
      setThankYouVisible(false);
    }, 2500); 

    setButtonDisabled(false);
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
        <TouchableOpacity
          style={styles.outerModalView}
          activeOpacity={1}
          onPress={() => setThankYouVisible(false)} 
        >
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                You've earned a point! Thank you for keeping our earth clean! :)
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonCommon: {
    borderWidth: 2,
    borderRadius: 30,
    width: width * 0.8, 
    height: height * 0.08, 
    alignItems: "center",
    justifyContent: "center",
    marginTop: height * 0.02, 
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
    fontSize: scaleText(20), 
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.02, 
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    elevation: 5,
    width: width * 0.9, 
  },
  outerModalView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  modalText: {
    fontSize: scaleText(18), 
    fontWeight: "bold",
    textAlign: "center",
    color: "#228B22",
  },
});
