import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import { FlatList, Image, Text, StyleSheet, View } from "react-native";
import StarCard from "../components/StarCard";
// import axios
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function HomeScreen(props) {
  const navigation = useNavigation();

  const [rooms, setRooms] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://airbnb-api.now.sh/api/room?city=paris"
      );
      setRooms(response.data.rooms);
      setIsLoading(false);
    } catch (e) {
      alert(e.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <View>
      {isLoading ? (
        <Text>Chargement en cours</Text>
      ) : (
        <FlatList
          data={rooms}
          keyExtractor={item => String(item._id)}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => {
                console.log(item._id);
                navigation.navigate("Room", {
                  _id: item._id
                });
              }}
            >
              <View style={[styles.container]}>
                <View style={[styles.imageContainer]}>
                  <Image
                    style={{ width: 350, height: 200 }}
                    source={{ uri: item.photos[0] }}
                  ></Image>
                  <Text style={[styles.price]}>{item.price} €</Text>

                  <View style={[styles.reviewsContainer]}>
                    <Text numberOfLines={1} style={[styles.titleAnnounce]}>
                      {item.title}
                    </Text>
                    <View style={[styles.starsContainer]}>
                      <StarCard key={item.id} ratingValue={item.ratingValue} />
                      <Text>{item.reviews} reviews</Text>
                    </View>
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 30,
    position: "relative"
  },
  imageContainer: {
    marginBottom: 20
  },
  titleAnnounce: {},
  price: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    bottom: 90,
    height: 50,
    width: 70,
    fontSize: 30,
    backgroundColor: "black",
    color: "white"
  },
  reviewsContainer: {
    flex: 1,
    width: 300,
    flexDirection: "column",
    justifyContent: "flex-start",
    paddingLeft: 30
  },
  starsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 125
  }
});
