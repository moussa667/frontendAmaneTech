import { useNavigation } from "@react-navigation/native";
import {
  FlatList,
  TouchableOpacity,
  Text,
  View,
  ScrollView,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import tw from "tailwind-react-native-classnames";
import { LinearGradient } from "expo-linear-gradient";

export default function ListeDesContrats() {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: "Liste des Contrats" });
  }, [navigation]);

  const Immatriculations = [
    {
      id: 123456,
      modeleVehicule: "Toyota Corolla",
      matricule: "X1Y2Z3",
      dateImmatriculation: "2024-01-01",
    },
    {
      id: 234567,
      modeleVehicule: "Honda Civic",
      matricule: "A3B4C5",
      dateImmatriculation: "2024-02-12",
    },
    {
      id: 345678,
      modeleVehicule: "Ford Focus",
      matricule: "D4E5F6",
      dateImmatriculation: "2024-03-23",
    },
    {
      id: 456789,
      modeleVehicule: "Chevrolet Malibu",
      matricule: "G7H8I9",
      dateImmatriculation: "2024-04-04",
    },
    {
      id: 567890,
      modeleVehicule: "Tesla Model S",
      matricule: "J0K1L2",
      dateImmatriculation: "2024-05-15",
    },
    {
      id: 678901,
      modeleVehicule: "Nissan Altima",
      matricule: "M3N4O5",
      dateImmatriculation: "2024-06-26",
    },
    {
      id: 789012,
      modeleVehicule: "Hyundai Sonata",
      matricule: "P6Q7R8",
      dateImmatriculation: "2024-07-07",
    },
    {
      id: 890123,
      modeleVehicule: "Subaru Outback",
      matricule: "S9T0U1",
      dateImmatriculation: "2024-08-18",
    },
  ];

  const voirDetailsContrat = (immatriculationId) => {
    const immatriculation = Immatriculations.find(
      (immatriculation) => immatriculation.id === immatriculationId
    );
    if (immatriculation) {
      navigation.navigate("DetailsImmatriculationScreen", { immatriculation });
    } else {
      console.log("Immatriculation non trouvé avec l'ID:", contratId);
    }
  };

  return (
    <LinearGradient
      colors={["#FFCC80", "#FFFFFF00", "#FFCC80", "#FFCC80"]}
      start={{ x: 0.0, y: 0.0 }}
      end={{ x: 1.0, y: 1.0 }}
      locations={[0.0, 0.5, 0.5, 1.0]}
      style={tw`flex-1`}
    >
      <FlatList
        data={Immatriculations}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={tw`rounded bg-blue-200 p-1`}
            onPress={() => voirDetailsContrat(item.id)}
          >
            <View
              style={tw`flex-row items-center justify-between px-4 py-2 border-b border-gray-200`}
            >
              <View style={tw`flex-1 mr-2`}>
                <Text
                  numberOfLines={2}
                  ellipsizeMode="tail"
                  style={tw`text-lg`}
                >
                  {item.id} {item.modeleVehicule}
                </Text>
              </View>
              <Icon name="eye" size={20} color="#A0522D" />
            </View>
          </TouchableOpacity>
        )}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      />
    </LinearGradient>
  );
}
