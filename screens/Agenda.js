import React, { useState } from "react";
import { SafeAreaView, Text, View } from "react-native";
import { Agenda } from "react-native-calendars";
import tw from "tailwind-react-native-classnames";

export default function AgendaScreen() {
  // Les items doivent être structurés par date
  const items = {
    "2024-04-02": [{ name: "Comite de coordination à 8h" }],
    "2024-04-03": [{ name: "Atelier Application de conv à 9:30" }],
    // Autres dates et événements...
  };
//   const [selectedDate, setSelectedDate] = useState("");

  // La fonction renderItem est appelée pour chaque événement de la date sélectionnée
  const renderItem = (item, firstItemInDay) => {
        return (
          <View style={tw`bg-blue-100 rounded-md p-2 my-2 mx-4`}>
            <Text>{item.name}</Text>
            {/* Afficher plus de détails ici si nécessaire */}
          </View>
        );
      };
    // if (item.date === selectedDate) {
    //   return (
    //     <View style={tw`bg-blue-100 rounded-md p-2 my-2 mx-4`}>
    //       <Text>{item.name}</Text>
    //     </View>
    //   );
    // }

//     return null; // ou un autre placeholder si besoin
//   };

  // Fonction pour gérer les dates sans événements
  const renderEmptyData = () => {
    return (
      <View style={tw`m-4 p-2`}>
        <Text style={tw`text-center`}>Pas d'événements pour ce jour</Text>
      </View>
    );
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      <Agenda
        items={items}
        renderItem={renderItem}
        renderEmptyData={renderEmptyData}
        // Assurez-vous de passer les autres props nécessaires ici
      />
    </SafeAreaView>
  );
}
