import { useNavigation } from "@react-navigation/native";
import { Button, View, Text } from "react-native";
import Stats from "../../Stats";
import React, { useLayoutEffect } from "react";

export default function PromesseReglement() {
  const navigation = useNavigation();

  return (
    <View>
      <Text> Promesse Reglement</Text>
    </View>
  );
}
