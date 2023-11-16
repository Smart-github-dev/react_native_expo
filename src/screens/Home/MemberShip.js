import {
  View,
  Text,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useEffect } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { LinearGradient } from "expo-linear-gradient";

export default MemberShipScreen = ({ navigation }) => {
  const insets = useSafeAreaInsets();
  const windowWidth = Dimensions.get("screen").width;

  useEffect(() => {});

  return (
    <ScrollView>
      <View
        style={{
          width: windowWidth,
          // height: windowHeight,
          backgroundColor: "#081132",
          paddingTop: insets.top + 10,
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text style={{ fontSize: 25, color: "white", fontWeight: 500 }}>
            ALL Features
          </Text>
          <TouchableOpacity
            style={{ position: "absolute", right: 20, top: 5 }}
            onPress={navigation.goBack}
          >
            <MaterialCommunityIcons
              name="window-close"
              size={22}
              color="#757b93"
            />
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "column",
            paddingHorizontal: 30,
            paddingVertical: 20,
            // height: "50%",
            paddingBottom: 140,
          }}
        >
          <View style={{ flexDirection: "row", marginVertical: 6 }}>
            <MaterialCommunityIcons
              name="star-four-points"
              size={20}
              color="white"
            />
            <Text
              style={{
                color: "white",
                fontSize: 15,
                fontWeight: 300,
                marginLeft: 16,
              }}
            >
              Full access to all content
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginVertical: 6 }}>
            <MaterialCommunityIcons
              name="star-four-points"
              size={20}
              color="white"
            />
            <Text
              style={{
                color: "white",
                fontSize: 15,
                fontWeight: 300,
                marginLeft: 16,
              }}
            >
              No ads
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginVertical: 6 }}>
            <MaterialCommunityIcons
              name="star-four-points"
              size={20}
              color="white"
            />
            <Text
              style={{
                color: "white",
                fontSize: 15,
                fontWeight: 300,
                marginLeft: 16,
              }}
            >
              Detailed zodiac profile
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginVertical: 6 }}>
            <MaterialCommunityIcons
              name="star-four-points"
              size={20}
              color="white"
            />
            <Text
              style={{
                color: "white",
                fontSize: 15,
                fontWeight: 300,
                marginLeft: 16,
              }}
            >
              Compatibility section
            </Text>
          </View>
          <View style={{ flexDirection: "row", marginVertical: 6 }}>
            <MaterialCommunityIcons
              name="star-four-points"
              size={20}
              color="white"
            />
            <Text
              style={{
                color: "white",
                fontSize: 15,
                fontWeight: 300,
                marginLeft: 16,
              }}
            >
              Free palmistry & compatibility report
            </Text>
          </View>
        </View>
        <View style={{ flexDirection: "column" }}>
          <View style={{ flexDirection: "row", justifyContent: "center" }}>
            <Text style={{ color: "white", fontSize: 20, fontWeight: "600" }}>
              Unlock everything
            </Text>
          </View>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginTop: 20,
              paddingHorizontal: 16,
              alignItems: "flex-end",
            }}
          >
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: "column",
                  borderColor: "#3b4163",
                  borderRadius: 8,
                  borderWidth: 1,
                  overflow: "hidden",
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    padding: 4,
                    backgroundColor: "#3b4163",
                  }}
                >
                  <Text
                    style={{ fontSize: 11, fontWeight: "400", color: "white" }}
                  >
                    3 DAYS FREE
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: 15,
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: "#3b4163",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 19,
                      color: "white",
                    }}
                  >
                    1
                  </Text>
                  <Text
                    style={{
                      fontSize: 19,
                      color: "white",
                    }}
                  >
                    week
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: "white",
                      marginTop: 2,
                    }}
                  >
                    7.99 USD/week
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: "white",
                      marginVertical: 3,
                    }}
                  >
                    7.99 USD
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: "white",
                      marginBottom: 8,
                    }}
                  >
                    auto-renewable
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <View
                style={{
                  flexDirection: "column",
                  borderColor: "#3b4163",
                  borderRadius: 8,
                  borderWidth: 1,
                }}
              >
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: 15,
                    alignItems: "center",
                    borderBottomWidth: 1,
                    borderBottomColor: "#3b4163",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 19,
                      color: "white",
                    }}
                  >
                    1
                  </Text>
                  <Text
                    style={{
                      fontSize: 19,
                      color: "white",
                    }}
                  >
                    month
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: "white",
                      marginTop: 2,
                    }}
                  >
                    6.25 USD/week
                  </Text>
                </View>
                <View
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: "white",
                      marginVertical: 3,
                    }}
                  >
                    24.99 USD
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: "white",
                      marginBottom: 8,
                    }}
                  >
                    auto-renewable
                  </Text>
                </View>
              </View>
            </TouchableOpacity>
            <TouchableOpacity>
              <LinearGradient
                start={{
                  x: 0,
                  y: 0,
                }}
                end={{
                  x: 1,
                  y: 0,
                }}
                colors={["#636bfe", "#be9bf5"]}
                style={{
                  flexDirection: "column",
                  borderRadius: 8,
                }}
              >
                <View
                  style={{
                    flexDirection: "row",
                    justifyContent: "center",
                    padding: 4,
                  }}
                >
                  <Text
                    style={{ fontSize: 11, fontWeight: "600", color: "white" }}
                  >
                    BEST OFFER
                  </Text>
                </View>
                <LinearGradient
                  start={{
                    x: 0,
                    y: 0,
                  }}
                  end={{
                    x: 0,
                    y: 1,
                  }}
                  colors={["#313992", "#1b245f"]}
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    padding: 15,
                    alignItems: "center",
                    margin: 1,
                    // backgroundColor: "#2e358d",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 19,
                      color: "white",
                    }}
                  >
                    3
                  </Text>
                  <Text
                    style={{
                      fontSize: 19,
                      color: "white",
                    }}
                  >
                    months
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: "white",
                      marginTop: 2,
                    }}
                  >
                    2.50 USD/week
                  </Text>
                </LinearGradient>
                <LinearGradient
                  start={{
                    x: 0,
                    y: 0,
                  }}
                  end={{
                    x: 0,
                    y: 1,
                  }}
                  colors={["#313992", "#1b245f"]}
                  style={{
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    marginHorizontal: 1,
                    marginBottom: 1,
                    borderBottomRightRadius: 8,
                    borderBottomLeftRadius: 8,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 14,
                      color: "white",
                      marginVertical: 3,
                    }}
                  >
                    29.99 USD
                  </Text>
                  <Text
                    style={{
                      fontSize: 10,
                      color: "white",
                      marginBottom: 8,
                    }}
                  >
                    auto-renewable
                  </Text>
                </LinearGradient>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        </View>
        <View
          style={{
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            marginTop: 20,
            paddingTop: 20,
          }}
        >
          <TouchableOpacity
            style={{
              backgroundColor: "#5f66fd",
              paddingVertical: 14,
              paddingHorizontal: 50,
              borderRadius: 36,
              borderWidth: 2,
              borderColor: "#252a8b",
            }}
          >
            <Text style={{ fontSize: 18, color: "white" }}>CONTINUE</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ fontSize: 18, color: "#3f4865", marginTop: 14 }}>
              Cancel anytime
            </Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text style={{ color: "#5f66fd", fontSize: 17, marginTop: 14 }}>
              Restore
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-around",
            paddingHorizontal: 16,
            paddingVertical: 16,
            marginBottom: 6,
          }}
        >
          <TouchableOpacity>
            <Text
              style={{
                color: "#757b93",
                fontSize: 14,
                fontWeight: "300",
                borderBottomColor: "#757b93",
                borderBottomWidth: 0.7,
              }}
            >
              Terms of Service
            </Text>
          </TouchableOpacity>

          <Text style={{ color: "#757b93", fontSize: 14, fontWeight: "300" }}>
            .
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                color: "#757b93",
                fontSize: 14,
                fontWeight: "300",
                borderBottomColor: "#757b93",
                borderBottomWidth: 0.7,
              }}
            >
              Privacy Policy
            </Text>
          </TouchableOpacity>
          <Text style={{ color: "#757b93", fontSize: 14, fontWeight: "300" }}>
            .
          </Text>
          <TouchableOpacity>
            <Text
              style={{
                color: "#757b93",
                fontSize: 14,
                fontWeight: "300",
                borderBottomColor: "#757b93",
                borderBottomWidth: 0.7,
              }}
            >
              Subscription Terms
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};
