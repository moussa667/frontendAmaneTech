import { useNavigation } from "@react-navigation/native";
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

import React, { useLayoutEffect, useState, useRef, useMemo } from "react";
import { useRoute } from "@react-navigation/native";
import Icon from "react-native-vector-icons/FontAwesome";
import tw from "tailwind-react-native-classnames";
import { LinearGradient } from "expo-linear-gradient";
import { AntDesign } from "@expo/vector-icons";

export default function ListeDesContrats() {
  const navigation = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedOption, setSelectedOption] = useState(""); // Initialisé à une chaîne vide

  const [selectedReglement, setSelectedReglement] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const [filterOptions, setFilterOptions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");


  const [filterHeight, setFilterHeight] = useState(new Animated.Value(0)); // Utilisez Animated pour une meilleure transition

  const scrollViewRef = useRef();

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: "Liste des Contrats" });
  }, [navigation]);

  const [Contrats, setContrats] = useState([
    {
      id: 215543,
      societe: "STE MULTISERVICE TELECOM COMPAGY",
      dateDebut: "2024-01-15",
      dateFin: "2025-01-14",
      type: "contrat long terme",
      matricule: "A1B2C3",
      reglement: "chèque",
    },
    {
      id: 216602,
      societe: "MARSA MAROC MARCHE 03-26/2023",
      dateDebut: "2024-02-20",
      dateFin: "2024-08-19",
      type: "contrat moyen terme",
      matricule: "D4E5F6",
      reglement: "virement client",
    },
    {
      id: 217703,
      societe: "ELECTRO DYNAMIC SERVICES",
      dateDebut: "2024-03-05",
      dateFin: "2024-05-04",
      type: "relais",
      matricule: "G7H8I9",
      reglement: "prélèvement",
    },
    {
      id: 218804,
      societe: "INFOSEC SOLUTIONS",
      dateDebut: "2024-04-10",
      dateFin: "2029-04-09",
      type: "contrat long terme",
      matricule: "J0K1L2",
      reglement: "chèque",
    },
    {
      id: 215554,
      societe: "STE MULTISERVICE TELECOM COMPAGY",
      dateDebut: "2024-01-15",
      dateFin: "2025-01-14",
      type: "contrat long terme",
      matricule: "A1B2C3",
      reglement: "chèque",
    },
    {
      id: 216672,
      societe: "MARSA MAROC MARCHE 03-26/2023",
      dateDebut: "2024-02-20",
      dateFin: "2024-08-19",
      type: "contrat moyen terme",
      matricule: "D4E5F6",
      reglement: "virement client",
    },
  ]);

 const getFilteredContrats = () => {
   let filteredContrats = Contrats;

   if (searchQuery) {
     filteredContrats = filteredContrats.filter((contrat) =>
       contrat.societe.toLowerCase().includes(searchQuery.toLowerCase())
     );
   }

   if (selectedReglement) {
     filteredContrats = filteredContrats.filter((contrat) =>
       contrat.reglement.includes(selectedReglement)
     );
   }
   if (selectedType) {
     filteredContrats = filteredContrats.filter((contrat) =>
       contrat.type.includes(selectedType)
     );
   }

   return filteredContrats;
 };

    const filteredContrats = useMemo(
      () => getFilteredContrats(),
      [selectedReglement, selectedType, Contrats, searchQuery]
    );


   
  const voirDetailsContrat = (contratId) => {
    const contrat = Contrats.find((contrat) => contrat.id === contratId);
    if (contrat) {
      navigation.navigate("DetailsContratScreen", { contrat });
    } else {
      console.log("Contrat non trouvé avec l'ID:", contratId);
    }
  };

 
 const handleFilterPress = (filter) => {
   setSelectedFilter(filter);
   if (filter === "all") {
     setSelectedReglement("");
     setSelectedType("");
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
         : ["relais", "moyen terme", "long terme"];
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
     } else if (selectedFilter === "type") {
       setSelectedType(option);
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
                getFilteredContrats;
                /* Vous pouvez également déclencher une action ici si nécessaire */
              }}
            />
            <TouchableOpacity
              onPress={() => {
                getFilteredContrats;
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
            {["all", "reglement", "type"].map((filter) => (
              <TouchableOpacity
                key={filter}
                className={`mr-2 px-4 py-2 rounded-xl ${
                  (filter === "reglement" && selectedReglement) || // Si reglement est sélectionné
                  (filter === "type" && selectedType) || // Si type est sélectionné
                  (filter === "all" &&
                    selectedFilter === "all" &&
                    !selectedReglement &&
                    !selectedType) // Si tout est sélectionné et aucun autre filtre n'est actif
                    ? "bg-[#A0522D]"
                    : "bg-white"
                }`}
                onPress={() => handleFilterPress(filter)}
              >
                <Text
                  className={`${
                    (filter === "reglement" && selectedReglement) ||
                    (filter === "type" && selectedType) ||
                    (filter === "all" &&
                      selectedFilter === "all" &&
                      !selectedReglement &&
                      !selectedType)
                      ? "text-white"
                      : "text-black"
                  }`}
                >
                  {filter === "reglement" && selectedReglement
                    ? selectedReglement
                    : filter === "type" && selectedType
                    ? selectedType
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
                  <Text>{option}</Text>
                </TouchableOpacity>
              ))}
          </Animated.View>
          {/* Reste du contenu, y compris la liste des contrats */}
          <FlatList
            data={filteredContrats}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={tw`rounded-lg bg-white p-4 m-2 shadow`}
                onPress={() => voirDetailsContrat(item.id)}
              >
                <Text
                  style={tw`text-lg font-bold`}
                  numberOfLines={1}
                  ellipsizeMode="tail"
                >
                  {item.societe}
                </Text>
                <Text>{`${item.dateDebut} - ${item.dateFin}`}</Text>
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
