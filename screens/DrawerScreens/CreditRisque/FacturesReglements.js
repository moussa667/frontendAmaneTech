import { useNavigation } from "@react-navigation/native";

import Stats from "../../Stats";
import {
  SafeAreaView,
  View,
  TextInput,
  FlatList,
  TouchableOpacity,
  Text,
  ScrollView,
  Animated,
} from "react-native";

import React, {
  useLayoutEffect,
  useState,
  useRef,
  useMemo,
  useEffect,
} from "react";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import tw from "tailwind-react-native-classnames";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";
import * as SecureStore from "expo-secure-store";

export default function FacturesReglements() {
  const navigation = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedOption, setSelectedOption] = useState(""); // Initialisé à une chaîne vide

  const [selectedReglement, setSelectedReglement] = useState(null);
  const [selectedRetard, setSelectedRetard] = useState(null);

  const [filterOptions, setFilterOptions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [filterHeight, setFilterHeight] = useState(new Animated.Value(0)); // Utilisez Animated pour une meilleure transition

  const scrollViewRef = useRef();
  const [factures, setFactures] = useState([]);

  useEffect(() => {
    const fetchFactures = async () => {
      try {
        const userEmail = await SecureStore.getItemAsync("email");
        if (userEmail) {
          const response = await fetch(
            `http://10.0.2.2:8083/api/finance-management-service/invoices/${userEmail}`
          );
          const factures = await response.json();
          setFactures(factures);
          // console.log(factures);
        } else {
          console.log("Aucun email utilisateur stocké trouvé");
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des factures:", error);
      }
    };

    fetchFactures();
  }, []); // Le tableau vide assure que l'effet ne s'exécute qu'une fois après le montage du composant

  const getFilteredFactures = () => {
    let filteredFactures = factures;

    if (searchQuery) {
      filteredFactures = filteredFactures.filter((facture) =>
        facture.reference.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    if (selectedReglement) {
      filteredFactures = filteredFactures.filter((facture) =>
        facture.regulationMethod.includes(selectedReglement)
      );
    }
    if (selectedRetard) {
      const limits = selectedRetard.split("-").map(Number);
      filteredFactures = filteredFactures.filter(
        (facture) =>
          facture.lateCount >= limits[0] && facture.lateCount <= limits[1]
      );
    }
    

    return filteredFactures;
  };

  const filteredFactures = useMemo(
    () => getFilteredFactures(),
    [selectedReglement, selectedRetard, factures, searchQuery]
  );

  const voirDetailsfacture = (factureId) => {
    const facture = factures.find((facture) => facture.id === factureId);
    if (facture) {
      navigation.navigate("DetailsFactureScreen", { facture });
    } else {
      console.log("facture non trouvé avec l'ID:", factureId);
    }
  };

  const handleFilterPress = (filter) => {
    setSelectedFilter(filter);
    if (filter === "all") {
      setSelectedReglement("");
      setSelectedRetard("");
      Animated.timing(filterHeight, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }).start();
      setModalVisible(false);
    } else {
      const options =
        filter === "reglement"
          ? ["prélèvement", "chèque", "virement"]
          : ["0-30", "30-60", "60-90", "90-365"];
      setFilterOptions(options);
      Animated.timing(filterHeight, {
        toValue: 100,
        duration: 300,
        useNativeDriver: false,
      }).start();
      setModalVisible(true);
    }
  };
  // const handleOptionSelect = (option) => {
  //    setSelectedOption(option);
  //   console.log(option);
  //   setModalVisible(false); // Cache le modal après la sélection
  // };

  const handleOptionSelect = (option) => {
    if (selectedFilter === "reglement") {
      setSelectedReglement(option);
    } else if (selectedFilter === "retard") {
      setSelectedRetard(option);
    }
    setModalVisible(false);
    Animated.timing(filterHeight, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  const handleSearchChange = (text) => {
    setSearchQuery(text);
  };

  return (
    <SafeAreaView style={tw`flex-1`}>
      <LinearGradient colors={["#f2f3f7", "#f2f3f7"]} style={tw`flex-1`}>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={tw`p-4`}
        >
          <View className="flex-row items-center rounded-full bg-white p-2 pl-3 space-x-3">
            <Icon name="search" size={20} color="#A1A1A1" className=" " />
            <TextInput
              placeholder="Search"
              onChangeText={handleSearchChange}
              value={searchQuery}
              className="flex-1"
              onSubmitEditing={() => {
                getFilteredFactures;
                /* Vous pouvez également déclencher une action ici si nécessaire */
              }}
            />
            <TouchableOpacity
              onPress={() => {
                getFilteredFactures;
                /* Déclencher une action si nécessaire */
              }}
            >
              <AntDesign name="rightcircle" size={24} color="#431407" />
            </TouchableOpacity>
            {/* Exemple avec une couleur orange claire hexadécimale */}
          </View>

          <ScrollView
            ref={scrollViewRef}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={tw`flex-grow justify-end mr-4`}
            className="my-4 "
          >
            {["all", "reglement", "retard"].map((filter) => (
              <TouchableOpacity
                key={filter}
                className={`mr-2 px-4 py-2 rounded-xl ${
                  (filter === "reglement" && selectedReglement) || // Si reglement est sélectionné
                  (filter === "retard" && selectedRetard) || // Si retard est sélectionné
                  (filter === "all" &&
                    selectedFilter === "all" &&
                    !selectedReglement &&
                    !selectedRetard) // Si tout est sélectionné et aucun autre filtre n'est actif
                    ? "bg-[#A0522D]"
                    : "bg-white"
                }`}
                onPress={() => handleFilterPress(filter)}
              >
                <Text
                  className={`${
                    (filter === "reglement" && selectedReglement) ||
                    (filter === "retard" && selectedRetard) ||
                    (filter === "all" &&
                      selectedFilter === "all" &&
                      !selectedReglement &&
                      !selectedRetard)
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  {filter === "reglement" && selectedReglement
                    ? selectedReglement
                    : filter === "retard" && selectedRetard
                    ? selectedRetard
                    : filter}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Animated.View agissant comme espace réservé pour le contenu du filtre */}
          <Animated.View
            style={{ height: modalVisible ? 53 : 0, overflow: "hidden" }}
            className="flex flex-row"
          >
            {modalVisible &&
              filterOptions.map((option) => (
                <TouchableOpacity
                  key={option}
                  className="p-2 m-2 bg-gray-200 rounded-lg"
                  onPress={() => handleOptionSelect(option)}
                >
                  <Text>
                    {option}{" "}
                    {option && option.includes("0") ? " jours" : ""}
                  </Text>
                </TouchableOpacity>
              ))}
          </Animated.View>
          {/* Reste du contenu, y compris la liste des factures */}
          <FlatList
            data={filteredFactures}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={tw`rounded-lg bg-white p-4 m-2 shadow`}
                onPress={() => voirDetailsfacture(item.id)}
              >
                <Text
                  style={tw`text-lg font-bold`}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.invoiceName} - {item.payerCompanyName}
                </Text>
                <Text>{`Date d'écheance : ${item.dueDate}`}</Text>
              </TouchableOpacity>
            )}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={tw`pb-4 pt-2`} // Ajoute un padding pour compenser l'espace du filtre
          />
        </ScrollView>
      </LinearGradient>
    </SafeAreaView>
  );
}
