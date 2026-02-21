import React from "react";
import { View, Text, TouchableOpacity } from "react-native";

// import utilities from "../tailwind.json";

const SuscriptionPlan = ({ plan, onSelectPlan }) => {
  return (
    <View
      className="bg-white rounded-3xl  p-5 m-3 shadow-md w-[85%]"
      //   style={{ width: 320, marginHorizontal: 10, height: 230 }}
    >
      <Text className="text-lg font-bold mb-1">{plan.title}</Text>
      <Text className="text-gray-500 text-lg font-semibold mb-2">
        {plan.price}
      </Text>
      {plan.features.map((feature, index) => (
        <Text key={index} className="text-base mb-1">
          {feature}
        </Text>
      ))}
      <View className="flex items-center ">
        <TouchableOpacity
          className="mt-2 bg-[#A0522D] p-2 rounded-lg w-1/2 "
          onPress={() => onSelectPlan(plan.priceId)}
        >
          <Text className="text-white text-center font-bold">Get Started</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SuscriptionPlan;
