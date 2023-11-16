import { useState, useEffect } from "react";
import { TouchableOpacity, StyleSheet, Text, View } from "react-native";
import {
  MaterialIcons,
  FontAwesome5,
  MaterialCommunityIcons,
  AntDesign,
} from "@expo/vector-icons";
import { Keyboard } from "react-native";
export default BottomBar = ({ state, descriptors, navigation }) => {
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  const icons = [
    <MaterialIcons
      name="home"
      size={25}
      color={state.index == 0 ? "#FFFFFF" : "#8F9CF9"}
      style={{ width: "100%", textAlign: "center" }}
    />,
    <FontAwesome5
      name="robot"
      size={25}
      color={state.index == 1 ? "#FFFFFF" : "#8F9CF9"}
      style={{ width: "100%", textAlign: "center" }}
    />,
    <AntDesign
      name="heart"
      size={25}
      color={state.index == 2 ? "#FFFFFF" : "#8F9CF9"}
      style={{ width: "100%", textAlign: "center" }}
    />,
    <MaterialCommunityIcons
      name="timetable"
      size={25}
      style={{ width: "100%", textAlign: "center" }}
      color={state.index == 3 ? "#FFFFFF" : "#8F9CF9"}
    />,
  ];
  return (
    <View style={styles.bar}>
      {!isKeyboardVisible &&
        state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: "tabPress",
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate({ name: route.name, merge: true });
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: "tabLongPress",
              target: route.key,
            });
          };

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1 }}
              key={index}
            >
              {icons[index]}
              <Text
                style={{
                  color: isFocused ? "#FFFFFF" : "#8F9CF9",
                  textAlign: "center",
                  fontSize: 10,
                }}
              >
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
    </View>
  );
};

const styles = StyleSheet.create({
  btn: { flexDirection: "column" },
  bar: {
    flexDirection: "row",
    backgroundColor: "rgba(0,0,0,0.1)",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 8,
    position: "absolute",
    width: "100%",
    bottom: 0,
  },
});
