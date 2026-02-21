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

export default function ListeDesClients() {
  const navigation = useNavigation();

  const [selectedFilter, setSelectedFilter] = useState("all");
  const [selectedOption, setSelectedOption] = useState(""); // Initialisé à une chaîne vide

  const [selectedEnCours, setSelectedEnCours] = useState(null);
  const [selectedType, setSelectedType] = useState(null);

  const [filterOptions, setFilterOptions] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const [filterHeight, setFilterHeight] = useState(new Animated.Value(0)); // Utilisez Animated pour une meilleure transition

  const scrollViewRef = useRef();

  useLayoutEffect(() => {
    navigation.setOptions({ headerTitle: "Liste des Clients" });
  }, [navigation]);

  const clients = [
    {
      id: 215543,
      societe: "STE MULTISERVICE TELECOM COMPANY",
      enCours: 25000,
    },
    {
      id: 216602,
      societe: "MARSA MAROC MARCHE 03-26/2023",
      enCours: 15000,
    },
    {
      id: 220345,
      societe: "CONSTRUCTION ET GÉNIE CIVIL LTÉE",
      enCours: 32000,
    },
    {
      id: 221789,
      societe: "INFORMATIQUE ET TECHNOLOGIES AVANCÉES",
      enCours: 5000,
    },
    {
      id: 222840,
      societe: "RENOVATIONS DURABLES & CO",
      enCours: 18500,
    },
    {
      id: 223957,
      societe: "IMPORT-EXPORT INDUSTRIELS SA",
      enCours: 27300,
    },
    {
      id: 224101,
      societe: "AGROALIMENTAIRE INTERNATIONAL INC",
      enCours: 30500,
    },
    {
      id: 225462,
      societe: "SOLUTIONS TECHNOLOGIQUES INTÉGRÉES",
      enCours: 21200,
    },
    {
      id: 226533,
      societe: "SÉCURITÉ ET SURVEILLANCE S.A.",
      enCours: 15700,
    },
    {
      id: 227688,
      societe: "ÉNERGIE RENOUVELABLE ET INNOVATIONS",
      enCours: 28900,
    },
  ];

  const getFilteredClients = () => {
    let filteredClients = clients;

    if (searchQuery) {
      filteredClients = filteredClients.filter((client) =>
        client.societe.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filtre enCours
    if (selectedEnCours) {
      const limits = selectedEnCours.split("-").map(Number);
      filteredClients = filteredClients.filter(
        (client) => client.enCours >= limits[0] && client.enCours <= limits[1]
      );
    }
    // if (selectedType) {
    //   filteredContrats = filteredContrats.filter((contrat) =>
    //     contrat.type.includes(selectedType)
    //   );
    // }

    return filteredClients;
  };

  const filteredClients = useMemo(
    () => getFilteredClients(),
    [selectedEnCours, clients, searchQuery]
  );

  const voirDetailsClient = (clientId) => {
    const client = clients.find((client) => client.id === clientId);
    if (client) {
      navigation.navigate("DetailsClientScreen", { client });
    } else {
      console.log("Client non trouvé avec l'ID:", clientId);
    }
  };

  // const handleFilterPress = (filter) => {
  //   setSelectedFilter(filter);
  //   if (filter === "all") {
  //     setSelectedEnCours("");
  //     // setSelectedType("");
  //     Animated.timing(filterHeight, {
  //       toValue: 0,
  //       duration: 300,
  //       useNativeDriver: false,
  //     }).start();
  //     setModalVisible(false);
  //   } else {
  //     const options =
  //       filter === "reglement"
  //         ? ["prélèvement", "chèque", "virement"]
  //         : ["relais", "moyen terme", "long terme"];
  //     setFilterOptions(options);
  //     Animated.timing(filterHeight, {
  //       toValue: 100,
  //       duration: 300,
  //       useNativeDriver: false,
  //     }).start();
  //     setModalVisible(true);
  //   }
  // };

const handleFilterPress = (filter) => {
  if (filter === "all") {
    setSelectedEnCours(null); // Réinitialiser le filtre
    // Réinitialisez d'autres filtres si vous en ajoutez plus tard
  } else {
    // Ici, vous pouvez définir les options pour le filtre 'enCours'
    // et gérer l'affichage des boutons de sélection pour 'enCours'
    setFilterOptions(["0-10000", "10000-20000", "20000-30000"]);
    setModalVisible(true);
  }
};

  // const handleOptionSelect = (option) => {
  //    setSelectedOption(option);
  //   console.log(option);
  //   setModalVisible(false); // Cache le modal après la sélection
  // };

 const handleOptionSelect = (option) => {
   setSelectedEnCours(option);
   // Fermez le modal et animez la hauteur du conteneur de filtre si nécessaire
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

  // const voirDetailsClient = (clientId) => {
  //   // Trouvez le client basé sur l'ID
  //   const client = clients.find((client) => client.id === clientId);
  //   if (client) {
  //     // Naviguez vers l'écran de détails avec l'objet client complet
  //     navigation.navigate("DetailsClientScreen", { client });
  //     // console.log("hello"); // Ceci affichera "hello" dans la console à chaque fois que la fonction est appelée
  //   } else {
  //     console.log("Client non trouvé avec l'ID:", clientId);
  //   }
  // };

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
            {["all", "enCours"].map((filter) => (
              <TouchableOpacity
                key={filter}
                className={`mr-2 px-4 py-2 rounded-xl ${
                  (filter === "enCours" && selectedEnCours) || // Si reglement est sélectionné
                  // (filter === "type" && selectedType) || // Si type est sélectionné
                  (filter === "all" &&
                    selectedFilter === "all" &&
                    !selectedEnCours)
                    ? // && !selectedType // Si tout est sélectionné et aucun autre filtre n'est actif
                      "bg-[#A0522D]"
                    : "bg-white"
                }`}
                onPress={() => handleFilterPress(filter)}
              >
                <Text
                  className={`${
                    (filter === "enCours" && selectedEnCours) ||
                    // (filter === "type" && selectedType) ||
                    (filter === "all" &&
                      selectedFilter === "all" &&
                      !selectedEnCours)
                      ? // && !selectedType
                        "text-white"
                      : "text-black"
                  }`}
                >
                  {filter === "enCours" && selectedEnCours
                    ? selectedEnCours
                    // : filter === "type" && selectedType
                    // ? selectedType
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
            data={filteredClients}
            keyExtractor={(item) => item.id.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={tw`rounded-lg bg-white p-4 m-2 shadow`}
                onPress={() => voirDetailsClient(item.id)}
              >
                <Text
                  style={tw`text-lg font-bold`}
                  numberOfLines={2}
                  ellipsizeMode="tail"
                >
                  {item.societe}
                </Text>
                <Text>{`${item.enCours} Dhs`}</Text>
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
