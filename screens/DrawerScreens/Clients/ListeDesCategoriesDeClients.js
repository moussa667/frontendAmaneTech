import { useNavigation } from "@react-navigation/native";
import { Button, View, Text } from "react-native";
import Stats from "../../Stats";
import React, { useLayoutEffect } from "react";

export default function ListeDesCategoriesDeClients() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: "Liste des Categories" });
  }, [navigation]);


  return (
    <View>
      <Text> Liste Des Categories De Clients</Text>
    </View>
  );
}
