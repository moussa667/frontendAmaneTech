// Ce composant peut être dans un fichier nommé PaymentForm.js
import { CardForm, useStripe } from "@stripe/stripe-react-native";
import { useState, useEffect } from "react";
import {
  Button,
  Alert,
  View,
  TouchableOpacity,
  Text,
  StyleSheet,
} from "react-native";
import { useRoute } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";
import { useSelector, useDispatch } from "react-redux";
import { setSuscriptionType } from "../../featuresSlices/SuscriptionSlice";

const PaymentForm = ({ setIsSubscribed }) => {
  const route = useRoute();
  const { email, priceId } = route.params;

  console.log("Email:", email); // Vérifiez que l'email est passé correctement
  console.log("Price ID:", priceId);

  const { createPaymentMethod } = useStripe();
  const [cardDetails, setCardDetails] = useState();
  const [userEmail, setUserEmail] = useState(email);
  const [selectedPlanPriceId, setSelectedPlanPriceId] = useState(priceId);
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchData = async () => {
      const email = await AsyncStorage.getItem("email");
      const priceId = await AsyncStorage.getItem("selectedPlanPriceId");
      console.log("Email retrieved: ", email); // Ajouter ce log
      console.log("Price ID retrieved: ", priceId); // Ajouter ce log
      setUserEmail(email);
      setSelectedPlanPriceId(priceId);
    };

    fetchData();
  }, []);

 

  const createSuscription = async (email, paymentMethodId, priceId) => {
    try {
      const response = await fetch(
        "http://10.0.2.2:8083/api/payment-service/subscriptions/create-subscription",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email, paymentMethodId, priceId }),
        }
      );

      if (response.ok) {
        // Vérification si le statut HTTP indique un succès
        const data = await response.json(); // Supposons que la réponse est en JSON
        return { success: true, data }; // Renvoyer un objet avec un indicateur de succès et les données
      } else {
        const errorData = await response.text(); // Supposons que l'erreur soit retournée en texte
        return { success: false, error: errorData }; // Renvoyer un objet avec un indicateur d'échec et l'erreur
      }
    } catch (error) {
      console.error("Failed to create customer or subscription:", error);
      throw error; // Rethrow l'erreur pour voir plus de détails
    }
  };

  const handlePaymentSubmission = async (
    userEmail,
    paymentMethodId,
    selectedPlanPriceId
  ) => {
    try {
      //   const customer = await createCustomer(userEmail, paymentMethodId);
      const subscription = await createSuscription(
        userEmail,
        paymentMethodId,
        selectedPlanPriceId
      );

      if (subscription.success) {
        console.log("Subscription successful:", subscription.data);

        // Introduire un délai pour laisser le temps au backend de traiter
        await new Promise((resolve) => setTimeout(resolve, 2000)); 
        const subscriptionResponse = await fetch(
          `http://10.0.2.2:8083/api/payment-service/subscriptions/subscription?email=${encodeURIComponent(
            email
          )}`
        );
        if (subscriptionResponse.ok) {
          const suscription = await subscriptionResponse.json();
          const suscriptionType = suscription.suscriptionType;
         console.log("Setting subscription type to:", suscriptionType);
         await SecureStore.setItemAsync("suscriptionType", suscriptionType);
         console.log("Subscription type set. Verifying...");

         // Vérifier immédiatement après la définition
         const checkType = await SecureStore.getItemAsync("suscriptionType");
         console.log("Verified subscription type:", checkType);

          setIsSubscribed(true); // Mettre à jour l'état d'abonnement
          console.log("Subscription successful:", subscription.data);
          // Vous pouvez naviguer ou afficher un message de succès ici
        } else {
          console.error(
            "Failed to fetch subscription details. Status:",
            subscriptionResponse.status
          );
        }
      }

      // Navigate to confirmation page or show success message
    } catch (error) {
      console.error("Payment or customer creation failed:", error);
      // Handle errors, show messages
    }
  };

  const handlePayPress = async () => {
    if (!cardDetails?.complete) {
      Alert.alert("Please enter complete card details");
      return;
    }

    try {
      console.log("Card details:", cardDetails);

      const { error, paymentMethod } = await createPaymentMethod({
        paymentMethodType: "Card",
        card: cardDetails,
      });

      if (error) {
        console.error("Payment method creation failed", error);
        return;
      }

      const paymentMethodId = paymentMethod.id;
      await handlePaymentSubmission(
        userEmail,
        paymentMethodId,
        selectedPlanPriceId
      );
    } catch (error) {
      console.error("Error in payment or customer creation:", error);
      Alert.alert("Payment Error", "Failed to process payment");
    }
  };

  return (
   

    <View style={styles.container}>
      <Text style={styles.title}>Card Details</Text>
      <CardForm
        onFormComplete={(details) => {
          console.log("Form completed with card details:", details);
          setCardDetails(details); // Mettre à jour les détails de la carte lorsque le formulaire est complété
        }}
        style={styles.cardForm}
      />
      <TouchableOpacity
        style={styles.payButton}
        onPress={handlePayPress}
        disabled={!cardDetails?.complete}
      >
        <Text style={styles.payText}>Pay</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 20,
    marginBottom: 20,
    color: "#000",
  },
  cardForm: {
    width: "100%",
    height: 300, // Ajustez selon les besoins pour l'UI
    marginVertical: 30,
  },
  payButton: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 15,
    marginTop: 10,
    width: "30%",
  },
  payText: {
    color: "#ffffff",
    textAlign: "center",
    fontSize: 16,
  },
});

export default PaymentForm;
