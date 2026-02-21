import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import tw from "tailwind-react-native-classnames";
import axios from "axios";

const DetailsFactureScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const { facture } = route.params;
  const [factureNew, setfactureNew] = useState(facture);
  const [modalVisible, setModalVisible] = useState(false);
  const [manuelReminderDate, setManuelReminderDate] = useState("");

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: `Facture ${factureNew.id}` });
  }, [navigation, factureNew]);

  const handleConfirmReminder = async () => {
    setModalVisible(false); // Fermer le modal
    const dateObject = new Date(manuelReminderDate);
    const formattedDate = `${dateObject.getFullYear()}-${(
      dateObject.getMonth() + 1
    )
      .toString()
      .padStart(2, "0")}-${dateObject.getDate().toString().padStart(2, "0")}`;
    let updatedInvoice = {
      ...factureNew,
      sendManuelReminderDate: formattedDate,
    };


    try {
      // Envoyer la date de rappel au backend
      const response = await axios.post(
        "http://10.0.2.2:8083/api/finance-management-service/invoices/saveManuelReminder",

        updatedInvoice,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      // Mettre à jour la date de rappel avec la réponse du backend
      if (response.status === 200) {
        setfactureNew(response.data);
      } else {
        console.error("Erreur lors de la mise à jour du rappel");
      }
    } catch (error) {
      console.error("Erreur lors de la communication avec le backend:", error);
    }
  };

  return (
    <View className="flex-1 p-4">
      {/* Overlay Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}
      >
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: "rgba(2, 3, 4, 0.7)", // Correspond à bg-slate-50, l'opacité à 100% indique que c'est totalement opaque
          }}
        >
          <View className="m-4 bg-white p-5 rounded-lg ">
            <Text className="mb-4 text-lg font-bold">
              Programmer un rappel manuel
            </Text>
            <TextInput
              style={tw`border p-2 rounded text-lg`}
              placeholder="YYYY-MM-DD"
              keyboardType="numeric"
              value={manuelReminderDate}
              onChangeText={setManuelReminderDate}
            />

            <View className="flex-row space-x-6 justify-center items-center">
              <TouchableOpacity
                className=" bg-[#A0522D] px-3 py-[8px] rounded-full mt-2 w-[35%]"
                onPress={handleConfirmReminder}
              >
                <Text className="text-sm text-white">Confirmer</Text>
              </TouchableOpacity>
              <TouchableOpacity
                className=" bg-red-600 px-3 py-[8px] rounded-full mt-2 w-[30%]"
                onPress={() => {
                  setModalVisible(!modalVisible);
                }}
              >
                <Text className="text-sm text-white">Annuler</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Facture Details */}
      <View className="flex-row justify-between items-center">
        <Text className="text-lg font-bold">Détails de la facture:</Text>
        <TouchableOpacity
          className="bg-[#A0522D] px-3 py-[8px] rounded-full mt-2"
          onPress={() => setModalVisible(true)}
        >
          <Text className="text-sm text-white">rappel manuel</Text>
        </TouchableOpacity>
      </View>

      <Text className="text-lg mb-2">
        Société: {factureNew.payerCompanyName}
      </Text>
      <Text className="text-lg mb-2">
        Date d'expiration: {factureNew.dueDate}
      </Text>
      <Text className="text-lg mb-2">
        Montant restant: {factureNew.remainingAmountVATIncluded} MAD
      </Text>
      <Text className="text-lg mb-2">
        Date de rappel Manuel :{" "}
        {factureNew.sendManuelReminderDate
          ? factureNew.sendManuelReminderDate
          : "Non programmé"}
      </Text>
      <Text className="text-lg">Règlement: {factureNew.regulationMethod}</Text>
    </View>
  );
};

export default DetailsFactureScreen;
