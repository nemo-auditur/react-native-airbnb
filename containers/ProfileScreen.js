import React, { useState, useEffect } from "react";
import { ActivityIndicator, Text, View } from "react-native";

import axios from "axios";

export default function ProfileScreen({ userID, userToken }) {
  const [userProfil, setUserProfil] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const response = await axios.get(
        "https://airbnb-api.herokuapp.com/api/user/" + userID,
        {
          headers: {
            Authorization: "Bearer " + userToken
          }
        }
      );
      setUserProfil(response.data);
      setIsLoading(false);
    } catch (e) {
      alert(e.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    console.log(userProfil);
  }, [userProfil]);

  return (
    <>
      {isLoading === true ? (
        <View>
          <ActivityIndicator size="large" color="#FF5A5F"></ActivityIndicator>
        </View>
      ) : (
        <View>
          <View>
            <Text>{userProfil.account.username}</Text>
          </View>
          <View>
            <Text>{userProfil.account.description}</Text>
          </View>
          {userProfil.account.favorites.map((favorite, index) => {
            return (
              <View key={index}>
                <Text>{favorite.title}</Text>
              </View>
            );
          })}
        </View>
      )}
    </>
  );
}
