import React, { useLayoutEffect } from "react";
import { View, Text } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";

const DetailsClientScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { client } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: `Détails de ${client.nom}` });
  }, [navigation, client]);

  return (
    <View style={tw`flex-1 items-center justify-center p-4`}>
      <Text style={tw`text-lg font-bold`}>ID: {client.id}</Text>
      <Text style={tw`text-xl`}>Nom: {client.societe}</Text>
      <Text style={tw`text-green-500 text-xl `}>
        En cours: {client.enCours} DHS
      </Text>
    </View>
  );
};

export default DetailsClientScreen;
