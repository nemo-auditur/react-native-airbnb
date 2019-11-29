import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/core";
import {
  ActivityIndicator,
  FlatList,
  Image,
  ImageBackground,
  Text,
  StyleSheet,
  View
} from "react-native";

import Swiper from "react-native-swiper";

import StarCard from "../components/StarCard";
// import axios
import axios from "axios";
import { TouchableOpacity } from "react-native-gesture-handler";

export default function HomeScreen(props) {
  const navigation = useNavigation();

  const size = 50;

  const [rooms, setRooms] = React.useState([]);
  const [isLoading, setIsLoading] = React.useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://airbnb-api.herokuapp.com/api/room?city=paris"
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
        <ActivityIndicator style={[styles.activityIndicator]} />
      ) : (
        <FlatList
          data={rooms}
          keyExtractor={item => String(item._id)}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[styles.container]}
              onPress={() => {
                console.log(item._id);
                navigation.navigate("Room", {
                  _id: item._id
                });
              }}
            >
              <View>
                <ImageBackground
                  style={{ width: "100%", height: 200 }}
                  source={{ uri: item.photos[0] }}
                >
                  <Text style={[styles.price]}>{item.price} €</Text>
                </ImageBackground>
                <View style={[styles.informationsContainer]}>
                  <View style={[styles.reviewsContainer]}>
                    <Text numberOfLines={1} style={[styles.titleAnnounce]}>
                      {item.title}
                    </Text>
                    <View style={[styles.starsContainer]}>
                      <StarCard key={item.id} ratingValue={item.ratingValue} />
                      <Text style={{ marginLeft: 10 }}>
                        {item.reviews} reviews
                      </Text>
                    </View>
                  </View>
                  <Image
                    source={{ uri: item.user.account.photos[0] }}
                    style={{
                      height: size,
                      width: size,
                      borderRadius: size / 2
                    }}
                  />
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
    padding: 30,
    position: "relative",
    borderBottomColor: "grey",
    borderBottomWidth: 1
  },
  imageContainer: {
    marginBottom: 20
  },
  informationsContainer: {
    flexDirection: "row",
    marginTop: 20
  },
  titleAnnounce: {
    fontSize: 20
  },
  price: {
    position: "absolute",
    justifyContent: "center",
    alignItems: "center",
    left: 0,
    bottom: 5,
    height: 30,
    width: 50,
    fontSize: 20,
    backgroundColor: "black",
    color: "white"
  },
  reviewsContainer: {
    flex: 1,
    width: 300,
    flexDirection: "column",
    justifyContent: "flex-start"
  },
  starsContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: 150,
    paddingLeft: 30
  },
  activityIndicator: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    height: 80
  }
});
