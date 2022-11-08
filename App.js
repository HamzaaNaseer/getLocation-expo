import { StatusBar } from "expo-status-bar";
import { useEffect, useState } from "react";
import { StyleSheet, Text, View, Image } from "react-native";

//location package
import * as Location from "expo-location";
import MapView, { Marker } from "react-native-maps";

//maps import

export default function App() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync(); // this asks for permission
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      setLocation(location);
    })();
  }, []);

  return (
    <View style={styles.container}>
      {location && (
        <MapView
          style={{ width: "100%", height: "80%" }}
          initialRegion={{
            latitude: location.coords.latitude,
            longitude: location.coords.longitude,
            latitudeDelta: 0.04,
            longitudeDelta: 0.05,
          }}
        >
          {<Marker coordinate={location.coords} />}
        </MapView>
      )}

      {location && (
        <View style={styles.locationTextContainer}>
          <Text style={styles.locationText}>
            Your Latitude {location.coords.latitude}
          </Text>
          <Text style={styles.locationText}>
            Your longitude {location.coords.longitude}
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  locationTextContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  locationText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#f6cd61",
  },
});
