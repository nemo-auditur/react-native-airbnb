import React, { useState, useEffect } from "react";
import { useRoute } from "@react-navigation/core";

import { Image, Text, View } from "react-native";

import axios from "axios";

export default function RoomScreen() {
  const { params } = useRoute();
  const [room, setRoom] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://airbnb-api.now.sh/api/room/" + params._id
      );
      setRoom(response.data);
      setIsLoading(false);
    } catch (e) {
      alert(e.message);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  return isLoading === true ? (
    <View>
      <Text>test</Text>
    </View>
  ) : (
    <View>
      <Text>{room.title}</Text>
      <Image
        style={{ width: 350, height: 200 }}
        source={{ uri: room.photos[0] }}
      />
    </View>
  );
}
