import React, { useState, useEffect } from "react";

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { View } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Stats from "./screens/Stats";
import FontAwesome from "react-native-vector-icons/FontAwesome"; // Importez FontAwesome ou une autre famille d'icônes de votre choix
import { Ionicons } from "@expo/vector-icons";
import Notifications from "./screens/Notifications";
import Settings from "./screens/Settings";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import Dashboard from "./screens/DrawerScreens/Dashboard";
import Agenda from "./screens/Agenda";

import ListeDesClients from "./screens/DrawerScreens/Clients/ListeDesClients";
import ListeDesContrats from "./screens/DrawerScreens/Clients/ListeDesContrats";
import { useIsFocused } from "@react-navigation/native";
import { getFocusedRouteNameFromRoute } from "@react-navigation/native";
import ListeDesCategoriesDeClients from "./screens/DrawerScreens/Clients/ListeDesCategoriesDeClients";
import ListeDesFamillesDeClients from "./screens/DrawerScreens/Clients/ListeDesFamillesDeClients";
import ListeDesImmatriculations from "./screens/DrawerScreens/Clients/ListeDesImmatriculations";
import EncoursClients from "./screens/DrawerScreens/CreditRisque/EncoursClients";
import FacturesReglements from "./screens/DrawerScreens/CreditRisque/FacturesReglements";
import DSO from "./screens/DrawerScreens/CreditRisque/DSO";
import ScoringClients from "./screens/DrawerScreens/CreditRisque/ScoringClients";
import Contentieux from "./screens/DrawerScreens/Relance/Contentieux";
import Litiges from "./screens/DrawerScreens/Relance/Litiges";
import PromesseReglement from "./screens/DrawerScreens/Relance/PromesseReglement";
import Relances from "./screens/DrawerScreens/Relance/Relances";

import DetailsClientScreen from "./screens/DrawerScreens/Clients/Details/DetailsClientScreen";
import DetailsContratScreen from "./screens/DrawerScreens/Clients/Details/DetailsContratScreen";
import DetailsImmatriculationScreen from "./screens/DrawerScreens/Clients/Details/DetailsImmatriculationScreen";
import SignInScreen from "./screens/authScreen/SignInScreen";
import SuscriptionPlanPage from "./screens/authScreen/SuscriptionPlanPage";
import PaymentForm from "./screens/authScreen/PaymentForm";
import DetailsFactureScreen from "./screens/DrawerScreens/CreditRisque/Details/DetailsFactureScreen";
import * as SecureStore from "expo-secure-store";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSelector, useDispatch } from "react-redux";
import { setSuscriptionType } from "./featuresSlices/SuscriptionSlice";


const Stack = createNativeStackNavigator();

// Tab Bottom
const Tab = createBottomTabNavigator();
//
const ClientStack = createNativeStackNavigator();

function ClientStackNavigator({ navigation }) {
  return (
    <ClientStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        headerTitle: "",
        // autres options d'entête si nécessaire...
      })}
    >
      <ClientStack.Screen name="ListeDesClients" component={ListeDesClients} />
      <ClientStack.Screen
        name="DetailsClientScreen"
        component={DetailsClientScreen}
        options={{ title: "Détails du Client" }}
      />
      <ClientStack.Screen
        name="ListeDesContrats"
        component={ListeDesContrats}
      />

      <ClientStack.Screen
        name="DetailsContratScreen"
        component={DetailsContratScreen}
        options={{ title: "Détails du Contrat" }}
      />

      <ClientStack.Screen
        name="ListeDesCategoriesDeClients"
        component={ListeDesCategoriesDeClients}
      />

      <ClientStack.Screen
        name="ListeDesFamillesDeClients"
        component={ListeDesFamillesDeClients}
      />
      <ClientStack.Screen
        name="ListeDesImmatriculations"
        component={ListeDesImmatriculations}
      />
      <ClientStack.Screen
        name="DetailsImmatriculationScreen"
        component={DetailsImmatriculationScreen}
        options={{ title: "Détails de l'immatriculation" }}
      />
    </ClientStack.Navigator>
  );
}

const CreditRisqueStack = createNativeStackNavigator();

function CreditRisqueStackNavigator() {
  return (
    <CreditRisqueStack.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        headerTitle: "",
        // autres options d'entête si nécessaire...
      })}
    >
      <CreditRisqueStack.Screen
        name="EncoursClients"
        component={EncoursClients}
      />
      <CreditRisqueStack.Screen
        name="FacturesReglements"
        component={FacturesReglements}
      />
      <CreditRisqueStack.Screen
        name="DetailsFactureScreen"
        component={DetailsFactureScreen}
      />
      <CreditRisqueStack.Screen name="DSO" component={DSO} />

      <CreditRisqueStack.Screen
        name="ScoringClients"
        component={ScoringClients}
      />
    </CreditRisqueStack.Navigator>
  );
}

const RelanceStack = createNativeStackNavigator();
function RelanceStackNavigator() {
  return (
    <RelanceStack.Navigator screenOptions={{ headerShown: false }}>
      <RelanceStack.Screen name="Contentieux" component={Contentieux} />
      <RelanceStack.Screen name="Litiges" component={Litiges} />
      <RelanceStack.Screen
        name="PromesseReglement"
        component={PromesseReglement}
      />

      <RelanceStack.Screen name="Relances" component={Relances} />
    </RelanceStack.Navigator>
  );
}

// Drawer
const Drawer = createDrawerNavigator();

// function DrawerGroup(){
//     return (
//       <Drawer.Navigator>
//         <Drawer.Screen name="Dashboard" component={Dashboard} />
//         <Drawer.Screen name="Clients" component={Clients} />
//       </Drawer.Navigator>
//     );
// }

const getCurrentRouteName = (navigationState) => {
  if (!navigationState) return null;
  const route = navigationState.routes[navigationState.index];
  // Plongez dans les sous-routes si c'est un stack navigator
  if (route.state) {
    return getCurrentRouteName(route.state);
  }
  return route.name;
};

// const currentRouteName = getCurrentRouteName(state);

function CustomDrawerContent(props) {
  const { state } = props;
  const [isClientsExpanded, setClientsExpanded] = useState(false);
  const [isCreditRisqueExpanded, setCreditRisqueExpanded] = useState(false);
  const [isRelanceExpanded, setRelanceExpanded] = useState(false);
  const [isPremium, setIsPremium] = useState(isPremiumStock);
  ;
  const isPremiumStock = useSelector((state) => state.suscription.isPremium);
  console.log("est premium stock?",isPremiumStock);
  const dispatch = useDispatch();
console.log("est premium ?", isPremium);
  const subMenuItemStyle = {
    paddingLeft: 20, // Définissez le padding selon vos besoins
  };

  // Utilisez cette fonction pour obtenir le nom de la route actuelle à partir de l'état du drawer
  const getCurrentRouteName = (navigationState) => {
    if (!navigationState) return null;
    const route = navigationState.routes[navigationState.index];
    // Plongez dans les sous-routes si c'est un stack navigator
    if (route.state) {
      return getCurrentRouteName(route.state);
    }
    return route.name;
  };

  const currentRouteName = getCurrentRouteName(state);

  // Fonction pour naviguer et fermer le tiroir
  const navigateToScreen = (screenName) => {
    props.navigation.closeDrawer();
    setTimeout(() => {
      props.navigation.navigate(screenName);
    }, 150);
  };

  const drawerItemListStyle = {
    marginTop: -200, // Ajustez cette valeur selon vos besoins
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ paddingTop: 50 }} // Essayez d'ajuster cette valeur
    >
      <DrawerItemList {...props} style={drawerItemListStyle} />
      <DrawerItem
        label="Clients"
        onPress={() => {
          setClientsExpanded(!isClientsExpanded);
          // Vous pouvez également gérer la navigation ici si nécessaire
        }}
        icon={({ focused, size }) => (
          <FontAwesome
            name={isClientsExpanded ? "minus" : "plus"}
            size={size}
            color={focused ? "#A0522D" : "#555555"}
          />
        )}
      />
      {isClientsExpanded && (
        <View>
          <DrawerItem
            label="Liste des Clients"
            onPress={() => {
              props.navigation.navigate("ClientStack", {
                screen: "ListeDesClients",
              });
            }}
            style={[
              subMenuItemStyle,
              currentRouteName === "ListeDesClients" && {
                backgroundColor: "#ebebeb",
              },
            ]}
            labelStyle={{
              color:
                currentRouteName === "ListeDesClients" ? "#A0522D" : "#333",
            }}
          />
          <DrawerItem
            label="Liste des Contrats"
            onPress={() => {
              props.navigation.navigate("ClientStack", {
                screen: "ListeDesContrats",
              });
            }}
            style={[
              subMenuItemStyle,
              currentRouteName === "ListeDesContrats" && {
                backgroundColor: "#ebebeb",
              },
            ]}
            labelStyle={{
              color:
                currentRouteName === "ListeDesContrats" ? "#A0522D" : "#333",
            }}
          />
          <DrawerItem
            label="Liste des Familles de Clients"
            onPress={() => {
              props.navigation.navigate("ClientStack", {
                screen: "ListeDesFamillesDeClients",
              });
            }}
            style={[
              subMenuItemStyle,
              currentRouteName === "ListeDesFamillesDeClients" && {
                backgroundColor: "#ebebeb",
              },
            ]}
            labelStyle={{
              color:
                currentRouteName === "ListeDesFamillesDeClients"
                  ? "#A0522D"
                  : "#333",
            }}
          />
          <DrawerItem
            label="Liste Des Categories De Clients"
            onPress={() => {
              props.navigation.navigate("ClientStack", {
                screen: "ListeDesCategoriesDeClients",
              });
            }}
            style={[
              subMenuItemStyle,
              currentRouteName === "ListeDesCategoriesDeClients" && {
                backgroundColor: "#ebebeb",
              },
            ]}
            labelStyle={{
              color:
                currentRouteName === "ListeDesCategoriesDeClients"
                  ? "#A0522D"
                  : "#333",
            }}
          />
          {/* <DrawerItem
            label="Liste des Immatriculations"
            onPress={() => {
              props.navigation.navigate("ClientStack", {
                screen: "ListeDesImmatriculations",
              });
            }}
            style={[
              subMenuItemStyle,
              currentRouteName === "ListeDesImmatriculations" && {
                backgroundColor: "#ebebeb",
              },
            ]}
            labelStyle={{
              color:
                currentRouteName === "ListeDesImmatriculations"
                  ? "#A0522D"
                  : "#333",
            }}
          /> */}
        </View>
      )}

      <DrawerItem
        label="Credit Risque"
        onPress={() => {
          setCreditRisqueExpanded(!isCreditRisqueExpanded);
        }}
        // Ajoutez une icône similaire à celle de "Clients" ici si nécessaire
        icon={({ focused, size }) => (
          <FontAwesome
            name={isCreditRisqueExpanded ? "minus" : "plus"}
            size={size}
            color={focused ? "#A0522D" : "#555555"}
          />
        )}
      />
      {isCreditRisqueExpanded && (
        <View>
          <DrawerItem
            label=" Encours Clients "
            onPress={() => {
              props.navigation.navigate("CreditRisqueStack", {
                screen: "EncoursClients",
              });
            }}
            style={[
              subMenuItemStyle,
              currentRouteName === "EncoursClients" && {
                backgroundColor: "#ebebeb",
              },
            ]}
            labelStyle={{
              color: currentRouteName === "EncoursClients" ? "#A0522D" : "#333",
            }}
            // ... appliquez le style et le labelStyle comme avec "Clients" Factures Reglements
          />

          <DrawerItem
            label=" Factures Reglements "
            onPress={() => {
              props.navigation.navigate("CreditRisqueStack", {
                screen: "FacturesReglements",
              });
            }}
            style={[
              subMenuItemStyle,
              currentRouteName === "FacturesReglements" && {
                backgroundColor: "#ebebeb",
              },
            ]}
            labelStyle={{
              color:
                currentRouteName === "FacturesReglements" ? "#A0522D" : "#333",
            }}
            // ... appliquez le style et le labelStyle comme avec "Clients" Factures Reglements
          />
          {isPremiumStock && (
            <DrawerItem
              label="Scoring Clients"
              onPress={() => {
                props.navigation.navigate("CreditRisqueStack", {
                  screen: "ScoringClients",
                });
              }}
              style={[
                subMenuItemStyle,
                currentRouteName === "ScoringClients" && {
                  backgroundColor: "#ebebeb",
                },
              ]}
              labelStyle={{
                color:
                  currentRouteName === "ScoringClients" ? "#A0522D" : "#333",
              }}
            />
          )}
          {isPremiumStock && (
            <DrawerItem
              label=" DSO "
              onPress={() => {
                props.navigation.navigate("CreditRisqueStack", {
                  screen: "DSO",
                });
              }}
              style={[
                subMenuItemStyle,
                currentRouteName === "DSO" && {
                  backgroundColor: "#ebebeb",
                },
              ]}
              labelStyle={{
                color: currentRouteName === "DSO" ? "#A0522D" : "#333",
              }}
              // ... appliquez le style et le labelStyle comme avec "Clients" Factures Reglements
            />
          )}
        </View>
      )}

      <DrawerItem
        label="Relance"
        onPress={() => {
          setRelanceExpanded(!isRelanceExpanded);
        }}
        // Ajoutez une icône similaire à celle de "Clients" ici si nécessaire
        icon={({ focused, size }) => (
          <FontAwesome
            name={isRelanceExpanded ? "minus" : "plus"}
            size={size}
            color={focused ? "#A0522D" : "#555555"}
          />
        )}
      />
      {isRelanceExpanded && (
        <View>
          {isPremiumStock && (
            <DrawerItem
              label="Contentieux"
              onPress={() => {
                props.navigation.navigate("RelanceStack", {
                  screen: "Contentieux",
                });
              }}
              style={[
                subMenuItemStyle,
                currentRouteName === "Contentieux" && {
                  backgroundColor: "#ebebeb",
                },
              ]}
              labelStyle={{
                color: currentRouteName === "Contentieux" ? "#A0522D" : "#333",
              }}
              // ... appliquez le style et le labelStyle comme avec "Clients" Factures Reglements
            />
          )}
          {isPremiumStock && (
            <DrawerItem
              label=" Litiges "
              onPress={() => {
                props.navigation.navigate("RelanceStack", {
                  screen: "Litiges",
                });
              }}
              style={[
                subMenuItemStyle,
                currentRouteName === "Litiges" && {
                  backgroundColor: "#ebebeb",
                },
              ]}
              labelStyle={{
                color: currentRouteName === "Litiges" ? "#A0522D" : "#333",
              }}
              // ... appliquez le style et le labelStyle comme avec "Clients" Factures Reglements
            />
          )}

          <DrawerItem
            label=" Promesse Reglement "
            onPress={() => {
              props.navigation.navigate("RelanceStack", {
                screen: "PromesseReglement",
              });
            }}
            style={[
              subMenuItemStyle,
              currentRouteName === "PromesseReglement" && {
                backgroundColor: "#ebebeb",
              },
            ]}
            labelStyle={{
              color:
                currentRouteName === "PromesseReglement" ? "#A0522D" : "#333",
            }}
            // ... appliquez le style et le labelStyle comme avec "Clients" Factures Reglements
          />

          <DrawerItem
            label=" Relances "
            onPress={() => {
              props.navigation.navigate("RelanceStack", {
                screen: "Relances",
              });
            }}
            style={[
              subMenuItemStyle,
              currentRouteName === "Relances" && {
                backgroundColor: "#ebebeb",
              },
            ]}
            labelStyle={{
              color: currentRouteName === "Relances" ? "#A0522D" : "#333",
            }}
            // ... appliquez le style et le labelStyle comme avec "Clients" Factures Reglements
          />
        </View>
      )}
    </DrawerContentScrollView>
  );
}

function DashboardWithDrawer() {
  const navigation = useNavigation();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerActiveBackgroundColor: "#ebebeb", // Couleur de fond pour l'élément actif
        drawerActiveTintColor: "#A0522D", // Couleur du texte pour l'élément actif
        drawerInactiveTintColor: "#333", // Couleur du texte pour les éléments inactifs
        headerRight: () => (
          <Ionicons
            name="notifications-outline" // Changez ce nom selon l'icône exacte que vous voulez utiliser
            size={25}
            style={{ marginRight: 10 }}
            onPress={() => {
              // Ajoutez l'action que vous voulez exécuter quand l'icône est pressée
              navigation.navigate("ClientStack", {
                screen: "ListeDesClients",
              });
            }}
          />
        ),
      }}
    >
      <Drawer.Screen name="Dashboard" component={Dashboard} />
      {/* Le reste de votre UI */}

      {/* Ne pas ajouter "Clients" ici puisque vous le gérez déjà dans CustomDrawerContent */}
      {/* Le StackNavigator est accessible mais pas visible dans le Drawer */}
      <Drawer.Screen
        name="ClientStack"
        component={ClientStackNavigator}
        options={{ drawerItemStyle: { height: 0 }, title: "Clients" }}
      />
      <Drawer.Screen
        name="CreditRisqueStack"
        component={CreditRisqueStackNavigator}
        options={{ drawerItemStyle: { height: 0 }, title: " Credits Risques" }}
      />
      <Drawer.Screen
        name="RelanceStack"
        component={RelanceStackNavigator}
        options={{ drawerItemStyle: { height: 0 }, title: "Relances" }}
      />
    </Drawer.Navigator>
  );
}

function TabGroup() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: route.name !== "Dashboard",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          let iconColor;
          if (route.name === "Dashboard") {
            iconName = focused ? "view-dashboard" : "view-dashboard-outline";
            iconColor = focused ? "#A0522D" : "#555555";
            return (
              <MaterialCommunityIcons
                name={iconName}
                size={27}
                color={iconColor}
                // style={{ marginTop: 6, marginBottom: 6 }} // Padding added here
              />
            );
          } else if (route.name === "Agenda") {
            iconName = focused ? "calendar" : "calendar-outline";
            iconColor = "#A0522D";
          } else if (route.name === "Parametre") {
            iconName = focused ? "cog" : "cog-outline";
            iconColor = "#A0522D";
          }

          if (focused === true) {
            iconColor = "#A0522D";
          } else {
            iconColor = "#555555";
          }

          // Vous pouvez retourner n'importe quel composant ici, pas seulement une icône.
          return (
            <Ionicons
              name={iconName}
              size={28}
              color={iconColor}
              // style={{ paddingTop: 16, paddingBottom: 16 }} // Padding added here
            />
          );
        },
        tabBarActiveTintColor: "#A0522D",
        tabBarInactiveTintColor: "#555555",

        // tabBarStyle: {
        //   // Ajoutez ici le padding pour augmenter la hauteur de la barre
        //   paddingVertical: 10, // Ajustez la valeur selon vos besoins
        //   height: 60, // Vous pouvez ajuster la hauteur si nécessaire
        // },
        // tabBarLabelStyle: {
        //   marginBottom: 6, // Ajustez cette valeur pour déplacer le label en dessous de l'icône
        // },
      })}
    >
      {/* <Tab.Screen name="Dashboard" component={Dashboard} /> */}
      <Tab.Screen name="Dashboard" component={DashboardWithDrawer} />
      <Tab.Screen name="Agenda" component={Agenda} />
      <Tab.Screen name="Parametre" component={Settings} />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  const [isSignedIn, setIsSignedIn] = useState(false);
  const [isSubscribed, setIsSubscribed] = useState(false);
  const dispatch = useDispatch();
    const suscriptionTypeStore = useSelector((state) => state.suscription.type);


  useEffect(() => {
    async function fetchSubscriptionType() {
      try {
        const suscriptionType = await SecureStore.getItemAsync(
          "suscriptionType"
        );
        console.log("Le type de souscription récupéré est :", suscriptionType);
        const x = dispatch(setSuscriptionType(suscriptionType))
        console.log(
          "modification type",
          x.payload)
       
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du type de souscription:",
          error
        );
      }
    }

    async function checkLoginStatus() {
      try {
        const token = await AsyncStorage.getItem("accessToken");
        console.log("Token disponible:", !!token);
        setIsSignedIn(!!token);
      } catch (error) {
        console.error(
          "Erreur lors de la vérification du statut de connexion:",
          error
        );
      }
    }

    fetchSubscriptionType();
    checkLoginStatus();
  }, [isSignedIn, isSubscribed]);


 
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isSignedIn ? (
          isSubscribed ? (
            <Stack.Screen
              name="TabGroup"
              component={TabGroup}
              options={{ headerShown: false }}
            />
          ) : (
            <>
              <Stack.Screen
                name="SubscriptionPlanPage"
                component={SuscriptionPlanPage}
                options={{ headerShown: false }}
              />
              <Stack.Screen
                name="PaymentForm"
                component={(props) => (
                  <PaymentForm {...props} setIsSubscribed={setIsSubscribed} />
                )}
                options={{ headerShown: false }}
              />
            </>
          )
        ) : (
          <Stack.Screen
            name="SignIn"
            component={(props) => (
              <SignInScreen
                {...props}
                setIsSignedIn={setIsSignedIn}
                setIsSubscribed={setIsSubscribed}
              />
            )}
            options={{ headerShown: false }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
