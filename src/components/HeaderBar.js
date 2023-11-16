import { useSafeAreaInsets } from "react-native-safe-area-context";
import { View, Text, TouchableOpacity } from "react-native";
import { MaterialIcons, FontAwesome } from "@expo/vector-icons";
import { navigationKeys } from "../actions";
export const HeaderBar = ({
  navigation,
  title,
  item,
  profile,
  isTitleElement,
}) => {
  const insets = useSafeAreaInsets();
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        paddingHorizontal: 20,
        paddingVertical: 10,
        marginTop: insets.top,
        // borderBottomColor: "#C0BDBD",
        // borderBottomWidth: 1,
      }}
    >
      <TouchableOpacity
        style={{ flexDirection: "row", alignItems: "center" }}
        onPress={navigation.goBack}
      >
        <MaterialIcons name="keyboard-arrow-left" size={24} color="white" />
        {isTitleElement ? (
          title
        ) : (
          <Text
            style={{
              color: "#FFFFFF",
              fontSize: 18,
              fontWeight: "500",
              marginLeft: 8,
              marginRight: 4,
            }}
          >
            {title}
          </Text>
        )}
      </TouchableOpacity>

      <View style={{ flexDirection: "row" }}>
        {item}

        {!profile && (
          <TouchableOpacity
            style={{ marginLeft: 10 }}
            onPress={() =>
              navigation.navigate(navigationKeys.HOME, {
                screen: navigationKeys.PROFILE,
              })
            }
          >
            <FontAwesome name="user-circle" size={24} color="white" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};
