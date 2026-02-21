import React, { useLayoutEffect } from "react";
import { View, Text } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";

const DetailsContratScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { contrat } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: `Contrat ${contrat.id}` });
  }, [navigation, contrat]);

  return (
    <View style={tw`flex-1 p-4`}>
      <Text className="text-lg font-bold mb-2">Détails du contrat:</Text>
      <Text style={tw`text-lg`}>ID: {contrat.id}</Text>
      <Text style={tw`text-lg`}>Société: {contrat.societe}</Text>
      <Text style={tw`text-lg`}>Début: {contrat.dateDebut}</Text>
      <Text style={tw`text-lg`}>Fin: {contrat.dateFin}</Text>
      <Text style={tw`text-lg`}>Type: {contrat.type}</Text>
      <Text style={tw`text-lg`}>Matricule: {contrat.matricule}</Text>
      <Text style={tw`text-lg`}>Règlement: {contrat.reglement}</Text>
    </View>
  );
};

export default DetailsContratScreen;
