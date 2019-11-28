import React, { useEffect, useState } from "react";

import axios from "axios";

import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import MapView from "react-native-maps";

export default function FullMap(props) {
  const [flats, setFlats] = useState({});

  useEffect(() => {
    const askPermission = async () => {
      // Va afficher une alerte pour demander la permission (seulement la premiere fois où on demande)
      const obj = await Permissions.askAsync(Permissions.LOCATION);

      if (obj.status === "granted") {
        // Va obtenir les coordonnees GPS
        const location = await Location.getCurrentPositionAsync({});

        // alert(JSON.stringify(location));
        setLocation(location);
      }

      const fetchData = async () => {
        try {
          const response = await axios.get(
            "https://airbnb-api.now.sh/api/room?city=paris"
          );
          setFlats(response.data.rooms);
          setIsLoading(false);
        } catch (e) {
          alert(e.message);
        }
      };
    };
    askPermission();
    fetchData();
  }, []);

  return (
    <>
      {loc && (
        <MapView
          showsUserLocation={true}
          // showsMyLocationButton={true}
          // provider="google"
          style={{ height: 300, width: 300 }}
          initialRegion={{
            latitude: loc[1],
            longitude: loc[0],
            latitudeDelta: 0.03,
            longitudeDelta: 0.03
          }}
        >
          flats.map
          <MapView.Marker
            coordinate={{
              latitude: loc[1],
              longitude: loc[0]
            }}
          />
        </MapView>
      )}
    </>
  );
}
