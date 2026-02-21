import { useNavigation } from "@react-navigation/native";
import { ScrollView, View, Text } from "react-native";
import Stats from "../Stats";


import { LinearGradient } from "expo-linear-gradient";
import tw from "tailwind-react-native-classnames";
import {
  LineChart,
  
  PieChart,
  ProgressChart,
  ContributionGraph,
  StackedBarChart,
} from "react-native-chart-kit";

import { Dimensions } from "react-native";




const dataPieChart = [
  {
    name: "A",
    population: 21500000,
    color: "rgba(131, 167, 234, 1)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "B",
    population: 2800000,
    color: "#F00",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "C",
    population: 527612,
    color: "red",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "D",
    population: 8538000,
    color: "#ffffff",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
  {
    name: "E",
    population: 11920000,
    color: "rgb(0, 0, 255)",
    legendFontColor: "#7F7F7F",
    legendFontSize: 15,
  },
];

export default function Dashboard() {
  const navigation = useNavigation();

  

  
   const chartConfig = {
     backgroundColor: "#2c2c2c", // Un gris foncé comme couleur de fond de base
     backgroundGradientFrom: "#2c2c2c", // Un gris moyen pour le début du gradient
     backgroundGradientTo: "#2c2c2c", // Un gris plus foncé pour la fin du gradient
     decimalPlaces: 1, // Un seul chiffre après la virgule
     color: (opacity = 1) => `rgba(160, 82, 45, ${opacity})`, // Texte et lignes en blanc avec une opacité ajustable
     labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // Idem pour les labels
     style: {
       borderRadius: 16, // Bords arrondis pour le conteneur du graphique
     },
     propsForDots: {
       r: "4", // Rayon des points du graphique
       strokeWidth: "4", // Largeur du trait des points
       stroke: "#2c2c2c", // Couleur de contour des points, un gris clair
     },
   };

   const colorA0522D = (opacity = 1) => `rgba(160, 82, 45, ${opacity})`;



  return (
    <LinearGradient
      colors={["#f2f3f7", "#f2f3f7"]}
      style={tw`h-full w-full flex-1 justify-center items-center`}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 100 }}
      >
        <View>
          <Text>Balance agee </Text>
          <LineChart
            style={{
              // ...tw`pt-14`,
              // marginVertical: 18,
              borderRadius: 16,
            }}
            data={{
              labels: ["0-30", "30-60", "60-90", "90-120", "120-150", "+150"],
              datasets: [
                {
                  data: [0, 0, 0, 0, 0, 60],
                },
              ],
            }}
            width={Dimensions.get("window").width * 0.95} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={chartConfig}
            bezier
          ></LineChart>
        </View>

        <View>
          <Text>Chiffres d'Affaires</Text>
          <LineChart
            style={{
              // ...tw`pt-14`,
              // marginVertical: 18,
              borderRadius: 16,
            }}
            data={{
              labels: ["2019", "2020", "2021", "2022", "2023"],
              datasets: [
                {
                  data: [10, 30, 50, 55, 60],
                },
              ],
            }}
            width={Dimensions.get("window").width * 0.95} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={chartConfig}
            bezier
          ></LineChart>
        </View>

        <View>
          <Text>Bénéfices realisés</Text>
          <LineChart
            style={{
              // ...tw`pt-14`,
              // marginVertical: 18,
              borderRadius: 16,
            }}
            data={{
              labels: ["2019", "2020", "2021", "2022", "2023"],
              datasets: [
                {
                  data: [0, 0, 30, 32, 40],
                },
              ],
            }}
            width={Dimensions.get("window").width * 0.95} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={chartConfig}
            bezier
          ></LineChart>
        </View>
        <View>
          <Text> Dashboard </Text>

          <Stats />
        </View>

        <View>
          <Text>Suivi Evolution DSO</Text>
          <LineChart
            style={{
              // ...tw`pt-14`,
              // marginVertical: 18,
              borderRadius: 16,
            }}
            data={{
              labels: ["0-30", "30-60", "60-90", "90-120", "120-150", "+150"],
              datasets: [
                {
                  data: [10, 30, 50, 55, 60, 60],
                },
              ],
            }}
            width={Dimensions.get("window").width * 0.95} // from react-native
            height={220}
            yAxisLabel="$"
            yAxisSuffix="k"
            yAxisInterval={1} // optional, defaults to 1
            chartConfig={chartConfig}
            bezier
          ></LineChart>
        </View>

        <LinearGradient
          colors={["#000066", "#000033"]}
          style={{ borderRadius: 16, marginTop: 15 }}
        >
          <PieChart
            data={dataPieChart}
            width={Dimensions.get("window").width * 0.95}
            height={220}
            chartConfig={chartConfig}
            accessor={"population"}
            backgroundColor={"transparent"}
            // paddingLeft={"15"}
            center={[10, 10]}
            absolute
          />
        </LinearGradient>
      </ScrollView>

      {/* Le reste de votre UI du tableau de bord */}
    </LinearGradient>
  );
}
