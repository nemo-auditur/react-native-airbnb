import React, { useEffect, useState } from "react";
import { ActivityIndicator, Dimensions, Text, View } from "react-native";
import axios from "axios";
import { useNavigation } from "@react-navigation/core";

import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import MapView from "react-native-maps";

export default function FullMap(props) {
  const navigation = useNavigation();

  const [flats, setFlats] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [location, setLocation] = useState(null);

  const width = Dimensions.get("window").width;
  const height = Dimensions.get("window").height;

  const askPermission = async () => {
    // Va afficher une alerte pour demander la permission (seulement la premiere fois où on demande)
    const obj = await Permissions.askAsync(Permissions.LOCATION);

    if (obj.status === "granted") {
      // Va obtenir les coordonnees GPS
      const location = await Location.getCurrentPositionAsync({});

      // alert(JSON.stringify(location));
      setLocation(location);
    }
  };
  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://airbnb-api.herokuapp.com/api/room?city=paris"
      );
      setFlats(response.data.rooms);

      setIsLoading(false);
    } catch (e) {
      alert(e.message);
    }
  };

  // Pour savoir ce qui a été stocké dans un state.
  // useEffect(() => {
  //   console.log(flats);
  // }, [flats]);

  useEffect(() => {
    askPermission();
    fetchData();
  }, []);

  return (
    <>
      {isLoading === true ? (
        <View>
          <ActivityIndicator size="large" color="#FF5A5F"></ActivityIndicator>
        </View>
      ) : (
        <View>
          <MapView
            showsUserLocation={true}
            // showsMyLocationButton={true}
            // provider="google"
            style={{ height: 720, width: width }}
            initialRegion={{
              latitude: 48.866667,
              longitude: 2.333333,
              latitudeDelta: 0.11,
              longitudeDelta: 0.11
            }}
          >
            {flats.map((flat, index) => {
              return (
                <MapView.Marker
                  key={index}
                  coordinate={{
                    latitude: flat.loc[1],
                    longitude: flat.loc[0]
                  }}
                  title={flat.title}
                  description={flat.description}
                  onPress={() => {
                    navigation.navigate("Room", {
                      _id: flat._id
                    });
                  }}
                >
                  {/* <MedalAppartement [...MapView.Marker]/> */}
                </MapView.Marker>
              );
            })}
          </MapView>
        </View>
      )}
    </>
  );
}
