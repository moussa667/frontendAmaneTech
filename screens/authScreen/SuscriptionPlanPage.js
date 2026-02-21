import { useState, useEffect } from "react";
import { ScrollView, View, Text } from "react-native";
import SuscriptionPlan from "./SuscriptionPlanScreen";
import { StatusBar } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";

function SuscriptionPlanPage() {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");

  useEffect(() => {
    if (email) {
      console.log("Now email is updated: ", email);
      // Vous pouvez naviguer ici ou faire d'autres actions dépendantes de l'email
      navigation.navigate("PaymentForm", {
        email,
        priceId: selectedPlanPriceId,
      });
    }
  }, [email]); 

  const plans = [
    {
      title: "Standard",
      price: "2500 MAD",
      priceId: "price_1PE97EC0LP0qNzhBduQ6kA2b",
      features: [
        "Tableau de Bord des Statistiques",
        "Application mobile",
        "Assistance en Ligne",
        "Gestion de recouvrement",
      ],
      color: "bg-blue-500",
    },
    {
      title: "Premium",
      price: "5000 MAD",
      priceId: "price_1PE97FC0LP0qNzhBIakC3TzL",
      features: [
        "Tableau de Bord des Statistiques",
        "Application mobile",
        "Assistance en Ligne",
        "Gestion de recouvrement",
        "Gestion des DSO & Scoring",
        "Gestion des Contentieux & Litiges",
      ],
      color: "bg-purple-500",
    },
    {
      title: "Personnalisé",
      price: "2500 MAD - 5000 MAD",
      priceId: "price_1PE97FC0LP0qNzhBIakC3TzL",
      features: [
        "Get the party started.",
        "Lorem ipsum is simply dummy text of the printing and typesetting industry.",
      ],
      color: "bg-red-500",
    },
  ];

//   const handleSelectPlan = async (priceId) => {
//     console.log("Selected price ID:", priceId);
//     // Enregistrez le priceId dans AsyncStorage ou naviguez vers le PaymentForm
//     try {
//       const email = await AsyncStorage.getItem("email"); // Assurez-vous que cette opération est terminée avant de continuer
//       console.log("Email retrieved:", email);
//       setEmail(email)
//       await AsyncStorage.setItem("selectedPlanPriceId", priceId);

//       console.log("Data saved"); // Confirmer la sauvegarde
//     } catch (error) {
//       console.error("Failed to save data: ", error);
//     }
//     console.log("email passer: " + email);
//     console.log("priceId passer: " + priceId);
//     // Exemple de navigation vers le PaymentForm
//     navigation.navigate("PaymentForm", { email, priceId });
//   };

const handleSelectPlan = async (priceId) => {
  console.log("Selected price ID:", priceId);
  try {
    const email = await AsyncStorage.getItem("email");
    console.log("Email retrieved:", email);
    await AsyncStorage.setItem("selectedPlanPriceId", priceId);
    console.log("Data saved");
    console.log("email passer: " + email);
    console.log("priceId passer: " + priceId);
    navigation.navigate("PaymentForm", { email, priceId });
  } catch (error) {
    console.error("Failed to save data: ", error);
  }
};

  return (
    <View className="flex-1 bg-gray-100">
      <StatusBar hidden={true} />
      <View className="px-4 py-5 bg-orange-300">
        <Text className="text-2xl font-bold text-center text-gray-800">
          Select Your Plan
        </Text>
      </View>
      <ScrollView
        vertical={true}
        showsVerticalScrollIndicator={false}
        className="bg-gray-100 flex-1 p-4 mt-1  "
        contentContainerStyle={{
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {plans.map((plan, index) => (
          <SuscriptionPlan
            key={index}
            plan={plan}
            onSelectPlan={handleSelectPlan}
          />
        ))}
      </ScrollView>
    </View>
  );
}

export default SuscriptionPlanPage;
