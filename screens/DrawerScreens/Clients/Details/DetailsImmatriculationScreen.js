import React, { useLayoutEffect } from "react";
import { View, Text } from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";

const DetailsImmatriculationScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  // Modifier ici pour récupérer l'objet immatriculation au lieu de contrat
  const { immatriculation } = route.params;

  useLayoutEffect(() => {
    // Mettre à jour le titre avec l'ID de l'immatriculation
    navigation.setOptions({
      headerTitle: `Immatriculation ${immatriculation.id}`,
    });
  }, [navigation, immatriculation]);

  return (
    <View style={tw`flex-1 p-4`}>
      <Text style={tw`text-lg font-bold mb-2`}>
        Détails de l'immatriculation:
      </Text>
      <Text style={tw`text-lg`}>ID: {immatriculation.id}</Text>
      <Text style={tw`text-lg`}>
        Modèle du véhicule: {immatriculation.modeleVehicule}
      </Text>
      <Text style={tw`text-lg`}>Matricule: {immatriculation.matricule}</Text>
      <Text style={tw`text-lg`}>
        Date d'immatriculation: {immatriculation.dateImmatriculation}
      </Text>
    </View>
  );
};

export default DetailsImmatriculationScreen;
