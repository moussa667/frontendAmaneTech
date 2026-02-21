import { useNavigation } from "@react-navigation/native";
import { Button, View, Text } from "react-native";
import Stats from "../../Stats";
import React, { useLayoutEffect } from "react";

export default function ListeDesFamillesDeClients() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: "Familles de Clients" });
  }, [navigation]);


  return (
    <View>
      <Text> Liste des Familles de Clients</Text>
    </View>
  );
}
