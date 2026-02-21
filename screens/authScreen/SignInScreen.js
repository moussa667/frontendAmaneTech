import React, { useLayoutEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons"; // Assurez-vous que cette ligne est correctement importée
import axios from "axios"; // Import Axios
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import * as SecureStore from "expo-secure-store";

const SignInScreen = ({ setIsSignedIn, setIsSubscribed }) => {
  const navigation = useNavigation();

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: "Sign In" });
  }, [navigation]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordVisible, setPasswordVisible] = useState(false);

  const handleLogin = async () => {
    // try {
    //   const response = await fetch("http://10.0.2.2:8084/auth/login", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify({
    //       email: email,
    //       password: password,
    //     }),
    //   });

    //   if (response.ok) {
    //     const token = await response.text();
    //     await AsyncStorage.setItem("accessToken", token);
    //     await SecureStore.setItemAsync("email", email);

    //     console.log(token);
    //     console.log("le SecureStore"+ SecureStore.getItemAsync("email"))

    //     // Récupération de la date de fin d'abonnement
    //     const subscriptionResponse = await fetch(
    //       `http://10.0.2.2:8084/auth/subscription?email=${encodeURIComponent(
    //         email
    //       )}`,
    //       {
    //         headers: {
    //           Authorization: `Bearer ${token}`,
    //         },
    //       }
    //     );

    //     const suscription = await subscriptionResponse.json();
    //     const suscriptionType = suscription.suscriptionType;
    //     const suscriptionEndDate = new Date(suscription.suscriptionEndDate);

    //   // Stocker le type d'abonnement dans SecureStore
    //     await SecureStore.setItemAsync('suscriptionType', suscriptionType);

    //       const currentDate = new Date();

    //       if (suscriptionEndDate < currentDate) {

    //         // Si l'abonnement est toujours valide
    //         // navigation.navigate("TabGroup"); // Assurez-vous que 'Home' est bien configuré dans votre navigateur
    //         console.log("l'ecran a ete remplacer ")
    //         setIsSubscribed(true);
    //         setIsSignedIn(true);
    //       } else {
    //         setIsSubscribed(false);
    //         setIsSignedIn(true);

    //         // Si l'abonnement est expiré
    //         // navigation.navigate("SubscriptionPlanPage"); // Rediriger vers la page de gestion des abonnements
    //       }
    //     } else {
    //       // Gérer l'erreur si l'API ne renvoie pas une date
    //       console.error("Failed to fetch subscription end date");
    //     }

    // } catch (error) {
    //   Alert.alert("Network Error", "Unable to connect to server");
    //   console.error(error);
    // }

    try {
      const response = await fetch(
        "http://10.0.2.2:8083/api/identity-service/auth/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: email,
            password: password,
          }),
        }
      );

      if (response.ok) {
        const token = await response.text();
        await AsyncStorage.setItem("accessToken", token);
        await SecureStore.setItemAsync("email", email);

        console.log("Token:", token);

        // Afficher la valeur email stockée pour vérifier
        const storedEmail = await SecureStore.getItemAsync("email");
        console.log("Stored email:", storedEmail);

        const subscriptionResponse = await fetch(
          `http://10.0.2.2:8083/api/identity-service/auth/subscription?email=${encodeURIComponent(
            email
          )}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (subscriptionResponse.ok) {
          const suscription = await subscriptionResponse.json();
          const suscriptionType = suscription.suscriptionType;
          const suscriptionEndDate = new Date(suscription.suscriptionEndDate);

          // Stocker le type d'abonnement dans SecureStore
          await SecureStore.setItemAsync("suscriptionType", suscriptionType);

          console.log("le type de souscription", suscriptionType);

          const currentDate = new Date();

          if (suscriptionEndDate > currentDate) {
            console.log("L'abonnement est toujours valide.");
            setIsSubscribed(true);
            setIsSignedIn(true);
          } else {
            console.log("L'abonnement a expiré.");
            setIsSubscribed(false);
            setIsSignedIn(true);
          }
        } else {
          console.error(
            "Failed to fetch subscription details. Status:",
            subscriptionResponse.status
          );
        }
      } else {
        console.error("Login failed. Status:", response.status);
      }
    } catch (error) {
      Alert.alert("Network Error", "Unable to connect to server");
      console.error("Network Error:", error);
    }
  };

  return (
    <View className="flex-1 justify-center   bg-white px-4">
      <View className="flex justify-start items-center  bg-white px-4">
        <Text className="text-2xl font-bold text-gray-800 mb-4">
          Welcome back!
        </Text>
        <Text className="text-base text-gray-600 mb-20">
          Hello there 👋, sign in to continue!
        </Text>
      </View>

      <TextInput
        className="border border-gray-300 bg-gray-100 p-3 rounded-lg mb-4"
        placeholder="Enter your email"
        onChangeText={setEmail}
        value={email}
      />

      <View style={styles.passwordContainer}>
        <TextInput
          style={[styles.input, { flex: 1 }]}
          placeholder="Enter your password"
          secureTextEntry={!passwordVisible}
          onChangeText={setPassword}
          value={password}
        />
        <TouchableOpacity
          style={styles.icon}
          onPress={() => setPasswordVisible(!passwordVisible)}
        >
          <Icon
            name={passwordVisible ? "eye" : "eye-off"}
            size={24}
            color="gray"
          />
        </TouchableOpacity>
      </View>

      <Text className="text-right text-[#A0522D] mb-4">Forgot password?</Text>

      <TouchableOpacity
        className="bg-[#A0522D] p-3 rounded-lg mb-4"
        onPress={handleLogin}
      >
        <Text className="text-white text-center">Log in</Text>
      </TouchableOpacity>

      <TouchableOpacity className="border border-[#A0522D] p-3 rounded-lg">
        <Text className="text-[#A0522D] text-center">
          Don't have an account? Register
        </Text>
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
    // backgroundColor: "white",
  },
  input: {
    width: "100%",
  },
  passwordContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    borderWidth: 1, // 'border' correspond à borderWidth: 1 en React Native
    borderColor: "#D1D5DB", // 'border-gray-300' correspond à cette couleur hexadécimale
    backgroundColor: "#F3F4F6", // 'bg-gray-100' correspond à cette couleur hexadécimale
    padding: 2, // 'p-3' (en Tailwind, 1 unité = 4px, donc 3 unités = 12px)
    borderRadius: 8, // 'rounded-lg' est généralement environ 8px en React Native
    marginBottom: 16,
    paddingHorizontal: 10,
  },
  icon: {
    padding: 10,
  },
});

export default SignInScreen;
