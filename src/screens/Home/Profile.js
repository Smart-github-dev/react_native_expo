import React, { useState, useEffect, useRef } from "react";
import { LinearGradient } from "expo-linear-gradient";
import { ScrollView } from "react-native-gesture-handler";

import { SelectList } from "react-native-dropdown-select-list";
import moment from "moment";
// import * as Permissions from "expo-permissions";

import * as Location from "expo-location";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  MaterialIcons,
  Fontisto,
  MaterialCommunityIcons,
  Ionicons,
  FontAwesome,
  FontAwesome5,
  Feather,
} from "@expo/vector-icons";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Switch,
  ToastAndroid,
  TouchableHighlight,
  Animated,
  Dimensions,
} from "react-native";
import PhoneInput from "react-native-phone-number-input";
import { DEFAULT_THEME, Flag } from "react-native-country-picker-modal";

import { useAppStore } from "../../store";
import DateTimePicker from "@react-native-community/datetimepicker";
import {
  SERVER_BASE_URL,
  navigationKeys,
  profile_update,
  upload_avatar,
} from "../../actions";
import * as ImagePicker from "expo-image-picker";
import { Avatar } from "react-native-paper";
import { HeaderBar } from "../../components/HeaderBar";

const GOOGLE_PLACES_API_KEY = "AIzaSyCYx4qDfOw_IAtMxA1qjKoI2MbWY-4uIHg";

export default ProfileScreen = ({ navigation }) => {
  const windowWidth = Dimensions.get("screen").width;

  const setUserinfo = useAppStore((state) => state.setUserinfo);
  const userinfo = useAppStore((state) => state.userinfo);

  const [username, setUsername] = useState(userinfo.username);
  const [phoneNumber, setPhoneNumber] = useState(userinfo.phoneNumber);
  const [email, setEmail] = useState(userinfo.email);
  const [birthdate, setbirthdate] = useState(userinfo.birth || new Date());
  const [gender, setGender] = useState(userinfo.gender);

  const [location, setLocation] = useState(userinfo.location);
  const [zipcode, setZipcode] = useState(userinfo.zipcode);

  const settings = userinfo.settings || {};

  const [route, setRoute] = useState("setting");
  const [daily_digests, setdaily_digests] = useState(
    settings.daily_digests || false
  );
  const [someone_added, setsomeone_added] = useState(
    settings.someone_added || false
  );
  const [eros, seteros] = useState(settings.eros || false);
  const [solar_returns, setsolar_returns] = useState(
    settings.solar_returns || false
  );
  const toggleSwitch1 = () =>
    setdaily_digests((previousState) => !previousState);
  const toggleSwitch2 = () =>
    setsomeone_added((previousState) => !previousState);
  const toggleSwitch3 = () => seteros((previousState) => !previousState);
  const toggleSwitch4 = () =>
    setsolar_returns((previousState) => !previousState);

  const [locationNames, setLocationNames] = useState([]);

  const [selectedLocation, setSelectedLocation] = useState(null);

  const [selected, setSelected] = React.useState("");
  const onBirthDateChage = (event, selectedDate) => {
    setShowDatepicker(false);
    setbirthdate(selectedDate);
  };
  const logout = useAppStore((state) => state.logout);

  const [isShowDatepicker, setShowDatepicker] = useState(false);

  const data = [
    { key: "2", value: "Appliances" },
    { key: "3", value: "Cameras" },
    { key: "5", value: "Vegetables" },
    { key: "6", value: "Diary Products" },
    { key: "7", value: "Drinks" },
  ];

  const fetchLocationNames = async () => {
    try {
      const locations = await Location.reverseGeocodeAsync({
        latitude: 0,
        longitude: 0,
      });
      const locationNamesList = locations.map((location) => location.name);
      setLocationNames(locationNamesList);
    } catch (error) {
      console.log(error);
    }
  };

  const requestLocationPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== "granted") {
      console.log("Permission denied");
    }
  };

  const onSubmit = () => {
    try {
      profile_update({
        email: email,
        username: username,
        birth: birthdate,
        phonenumber: phoneNumber,
        gender: gender,
        settings: {
          daily_digests: daily_digests,
          someone_added: someone_added,
          eros: eros,
          solar_returns: solar_returns,
        },
      })
        .then((result) => {
          if (result.data.success) {
            setUserinfo(result.data.user);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  //------------------------------------------------------------------- avatar ---------------------------------//

  const [galleryPermission, setGalleryPermission] = useState(null);
  const [imageUri, setImageUri] = useState(
    `${SERVER_BASE_URL}/avatars/${userinfo.avatar}`
  );

  const setToastMsg = (msg) => {
    ToastAndroid.showWithGravity(msg, ToastAndroid.SHORT, ToastAndroid.CENTER);
  };

  const permisionFunction = async () => {
    const imagePermission = await ImagePicker.getMediaLibraryPermissionsAsync();
    console.log(imagePermission.status);

    setGalleryPermission(imagePermission.status === "granted");

    if (imagePermission.status !== "granted") {
      // setToastMsg("Permission for media access needed.");
    }
  };

  const pick = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    if (!result.canceled) {
      try {
        const resul = await upload_avatar(result.uri, userinfo._id);
        if (resul.data.success) {
          userinfo.avatar = result.uri;
          console.log(result.uri);
          setImageUri(result.uri);
          // setUserinfo({ ...userinfo });
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const animateSplash1 = useRef(new Animated.Value(-windowWidth)).current;
  const animateSplash2 = useRef(new Animated.Value(0)).current;

  const slideLeft = () => {
    Animated.timing(animateSplash1, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
    // animateSplash2 = windowWidth;
    animateSplash2.setValue(windowWidth);
  };
  const slideRight = () => {
    Animated.timing(animateSplash2, {
      toValue: 0,
      duration: 400,
      useNativeDriver: true,
    }).start();
    animateSplash1.setValue(-windowWidth);
  };

  useEffect(() => {
    // requestLocationPermission();
    fetchLocationNames();
    permisionFunction();
    // return update;
  }, []);

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
  };

  return (
    <View>
      <ScrollView overScrollMode="never">
        <LinearGradient
          colors={["#040D2A", "#061443", "#061A5E", "#051030"]}
          start={{
            x: 0,
            y: 0,
          }}
          end={{
            x: 0,
            y: 1,
          }}
          style={{ width: "100%" }}
        >
          <HeaderBar
            navigation={navigation}
            title={"My Profile"}
            item={
              <TouchableOpacity
                style={{
                  borderRadius: 30,
                  width: 30,
                  height: 30,
                  backgroundColor: "#8F9CF9",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "black",
                }}
              >
                <Fontisto name="bell" size={18} color="black" />
              </TouchableOpacity>
            }
            profile={true}
          />

          <View
            style={{
              width: "100%",
              marginTop: 170,
              position: "relative",
              flexDirection: "column",
              // alignItems: "center",
            }}
          >
            <GradientCard
              colors={["#2D3CBF", "#000960"]}
              style={styles.userCardWrapper}
            >
              <View style={styles.userAvatar}>
                {/* <Image
                  source={require("../../assets/images/avatar.png")}
                ></Image> */}
                <TouchableHighlight
                  onPress={pick}
                  underlayColor="rgba(0,0,0,0)"
                >
                  {/* {
                      uri: imageUri,
                    } */}
                  <Avatar.Image
                    size={110}
                    source={require("../../assets/images/avatar.png")}
                  />
                </TouchableHighlight>
              </View>

              <Text
                style={{
                  fontSize: 18,
                  marginTop: 58,
                  fontWeight: 700,
                  color: "#FFFFFF",
                }}
              >
                Profile
              </Text>
              <View style={styles.userWrapper}>
                <View style={styles.userItems}>
                  <View style={styles.userItem}>
                    <MaterialCommunityIcons
                      name="record-circle-outline"
                      size={14}
                      color="white"
                    />
                    <Text style={styles.userItemText}>Aries</Text>
                  </View>
                  <View style={styles.userItem}>
                    <Ionicons name="moon-outline" size={14} color="white" />
                    <Text style={styles.userItemText}>Aries</Text>
                  </View>
                  <View style={styles.userItem}>
                    <MaterialCommunityIcons
                      name="arrow-up"
                      size={14}
                      color="white"
                    />
                    <Text style={styles.userItemText}>Aquarius</Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  width: "100%",
                  flexDirection: "row",
                  justifyContent: "space-between",
                }}
              >
                <TouchableOpacity
                  onPress={() => {
                    if (route != "info") {
                      slideLeft();
                      setRoute("info");
                    }
                  }}
                >
                  <Text
                    style={{
                      color: route === "info" ? "white" : "#838383",
                      fontSize: 16,
                      fontWeight: 500,
                    }}
                  >
                    Personal Info
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    if (route != "setting") {
                      slideRight();
                      setRoute("setting");
                    }
                  }}
                >
                  <Text
                    style={{
                      color: route === "setting" ? "white" : "#838383",
                      fontSize: 16,
                      fontWeight: 500,
                    }}
                  >
                    Settings
                  </Text>
                </TouchableOpacity>
              </View>
            </GradientCard>
            <View style={{ flexDirection: "row" }}>
              {route == "info" && (
                <Animated.View
                  style={[
                    {
                      paddingHorizontal: 16,
                      marginVertical: 40,
                      marginBottom: 100,
                      width: windowWidth,
                    },
                    ,
                    { transform: [{ translateX: animateSplash1 }] },
                  ]}
                >
                  <View style={styles.inputGroup}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 500,
                        color: "#FFFFFF",
                        padding: 8,
                      }}
                    >
                      Name
                    </Text>
                    <TextInput
                      style={styles.Input}
                      value={username}
                      onChangeText={setUsername}
                      placeholder="Usernodiac"
                      placeholderTextColor={"#FFFFFF"}
                    />
                  </View>
                  <View style={styles.inputGroup}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 500,
                        color: "#FFFF",
                        padding: 8,
                      }}
                    >
                      Phone Number
                    </Text>
                    <PhoneInput
                      defaultCode="US"
                      layout="first"
                      placeholder="Enter Mobile Number"
                      placeholderTextColor="#FFFFFF"
                      withDarkTheme
                      withShadow
                      autoFocus
                      onChangeText={setPhoneNumber}
                      value={phoneNumber}
                      textContainerStyle={{
                        backgroundColor: "transparent",
                        // color: "#FFFFFF",
                        paddingVertical: 10,
                        paddingHorizontal: 3,
                      }}
                      textInputStyle={{
                        borderColor: "#FFFFFF",
                        borderLeftWidth: 1,
                        paddingLeft: 10,
                        backgroundColor: "transparent",
                        color: "#FFFFFF",
                        fontSize: 16,
                      }}
                      containerStyle={{
                        width: "100%",
                        backgroundColor: "transparent",
                        borderColor: "#FFFFFF",
                        borderWidth: 1,
                        alignItems: "center",
                      }}
                      textInputProps={{
                        keyboardType: "phone-pad",
                        placeholderTextColor: "#FFFFFF",
                      }}
                      codeTextStyle={{
                        color: "#FFFFFF",
                        marginRight: 3,
                        marginLeft: -5,
                      }}
                      // flagButtonStyle={{ backgroundColor: "red" }}
                      // disableArrowIcon={true}
                      renderDropdownImage={
                        <MaterialIcons
                          name="arrow-drop-down"
                          size={18}
                          color="white"
                        />
                      }
                      countryPickerProps={{
                        renderFlagButton: (props) => {
                          return (
                            <Flag
                              countryCode={props.countryCode}
                              flagSize={DEFAULT_THEME.flagSize}
                            />
                          );
                        },
                      }}
                    />
                  </View>
                  <View style={styles.inputGroup}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 500,
                        color: "#FFFF",
                        padding: 8,
                      }}
                    >
                      Email ID
                    </Text>
                    <TextInput
                      style={styles.Input}
                      value={email}
                      onChangeText={setEmail}
                      placeholder="team@zodiac.in"
                      placeholderTextColor={"#FFFFFF"}
                    />
                  </View>
                  <View style={styles.inputGroup}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 500,
                        color: "#FFFF",
                        padding: 8,
                      }}
                    >
                      Date of Birth
                    </Text>
                    {isShowDatepicker && (
                      <DateTimePicker
                        mode="date"
                        value={birthdate}
                        onChange={onBirthDateChage}
                      />
                    )}
                    <TouchableOpacity onPress={() => setShowDatepicker(true)}>
                      <TextInput
                        style={styles.Input}
                        value={moment(birthdate).format("MMM Do YY")}
                        editable={false}
                        placeholder="24/02/1997"
                        placeholderTextColor={"#FFFFFF"}
                      />
                    </TouchableOpacity>
                  </View>
                  <View style={{ flexDirection: "row", padding: 8 }}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 600,
                        color: "#FFFFFF",
                      }}
                    >
                      Gender :
                    </Text>
                    <TouchableOpacity
                      onPress={() => {
                        setGender(true);
                      }}
                      style={{ flexDirection: "row", paddingLeft: 10 }}
                    >
                      {gender ? (
                        <Ionicons
                          name="radio-button-on"
                          size={20}
                          color="yellow"
                        />
                      ) : (
                        <Ionicons
                          name="radio-button-off-sharp"
                          size={20}
                          color="white"
                        />
                      )}

                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          color: "#FFFFFF",
                          marginLeft: 5,
                        }}
                      >
                        Male
                      </Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                      onPress={() => {
                        setGender(false);
                      }}
                      style={{ flexDirection: "row", paddingLeft: 10 }}
                    >
                      {!gender ? (
                        <Ionicons
                          name="radio-button-on"
                          size={20}
                          color="yellow"
                        />
                      ) : (
                        <Ionicons
                          name="radio-button-off-sharp"
                          size={20}
                          color="white"
                        />
                      )}
                      <Text
                        style={{
                          fontSize: 16,
                          fontWeight: 600,
                          color: "#FFFFFF",
                          marginLeft: 5,
                        }}
                      >
                        Female
                      </Text>
                    </TouchableOpacity>
                  </View>
                  <View style={styles.inputGroup}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 500,
                        color: "#FFFF",
                        padding: 8,
                      }}
                    >
                      Location
                    </Text>
                    <GooglePlacesAutocomplete
                      placeholder="City, State, Country"
                      query={{
                        key: GOOGLE_PLACES_API_KEY,
                        language: "en", // language of the results
                      }}
                      onPress={(data, details = null) => console.log(data)}
                      onFail={(error) => console.error(error)}
                      styles={{
                        textInput: {
                          borderRadius: 0,
                          borderColor: "#FFFFFF",
                          color: "#FFFFFF",
                          borderWidth: 1,
                          backgroundColor: "transparent",
                        },
                      }}
                      textInputProps={{
                        placeholderTextColor: "#FFFFFF",
                      }}
                    />
                  </View>
                  <View style={styles.inputGroup}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 500,
                        color: "#FFFF",
                        padding: 8,
                      }}
                    >
                      Zipcode
                    </Text>
                    <TextInput
                      style={styles.Input}
                      placeholder="517501"
                      placeholderTextColor={"#FFFFFF"}
                    />
                  </View>
                  <TouchableOpacity
                    style={{
                      flexDirection: "row",
                      backgroundColor: "#5F66FD",
                      padding: 14,
                      justifyContent: "center",
                      borderRadius: 36,
                      marginTop: 30,
                    }}
                    onPress={onSubmit}
                  >
                    <Text
                      style={{
                        color: "white",
                        fontSize: 16,
                        fontWeight: 500,
                      }}
                    >
                      Submit
                    </Text>
                  </TouchableOpacity>
                </Animated.View>
              )}
              {route == "setting" && (
                <Animated.View
                  style={[
                    {
                      paddingHorizontal: 16,
                      marginVertical: 40,
                      marginBottom: 100,
                      width: windowWidth,
                    },
                    {
                      transform: [{ translateX: animateSplash2 }],
                    },
                  ]}
                >
                  <Text
                    style={{
                      fontSize: 16,
                      color: "#FFFFFF",
                      fontWeight: 400,
                      paddingVertical: 10,
                    }}
                  >
                    Notifications
                  </Text>
                  <View style={styles.switchWrraper}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#FFFFFF",
                        fontWeight: 400,
                      }}
                    >
                      Daily digests
                    </Text>
                    <Switch
                      trackColor={{ false: "#8F9CF9", true: "#FDE74D" }}
                      thumbColor={"#FFFFFF"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch1}
                      value={daily_digests}
                    ></Switch>
                  </View>
                  <View style={styles.switchWrraper}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#FFFFFF",
                        fontWeight: 400,
                      }}
                    >
                      Someone added you
                    </Text>
                    <Switch
                      trackColor={{ false: "#8F9CF9", true: "#FDE74D" }}
                      thumbColor={"#FFFFFF"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch2}
                      value={someone_added}
                    ></Switch>
                  </View>
                  <View style={styles.switchWrraper}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#FFFFFF",
                        fontWeight: 400,
                      }}
                    >
                      Eros
                    </Text>
                    <Switch
                      trackColor={{ false: "#8F9CF9", true: "#FDE74D" }}
                      thumbColor={"#FFFFFF"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch3}
                      value={eros}
                    ></Switch>
                  </View>
                  <View style={styles.switchWrraper}>
                    <Text
                      style={{
                        fontSize: 16,
                        color: "#FFFFFF",
                        fontWeight: 400,
                      }}
                    >
                      Solar returns (Birthday)
                    </Text>
                    <Switch
                      trackColor={{ false: "#8F9CF9", true: "#FDE74D" }}
                      thumbColor={"#FFFFFF"}
                      ios_backgroundColor="#3e3e3e"
                      onValueChange={toggleSwitch4}
                      value={solar_returns}
                    ></Switch>
                  </View>
                  <View style={styles.inputGroup}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 500,
                        color: "#FFFF",
                        paddingVertical: 8,
                      }}
                    >
                      Premium
                    </Text>
                    <SelectList
                      setSelected={(val) => setSelected(val)}
                      data={data}
                      save="value"
                      arrowicon={
                        <MaterialIcons
                          name="keyboard-arrow-down"
                          size={20}
                          color="white"
                        />
                      }
                      closeicon={
                        <MaterialCommunityIcons
                          name="close"
                          size={20}
                          color="white"
                        />
                      }
                      searchicon={
                        <Fontisto name="search" size={18} color="white" />
                      }
                      boxStyles={{
                        borderRadius: 0,
                        borderColor: "#FFFFFF",
                        color: "#FFFFFF",
                      }}
                      dropdownStyles={{
                        borderRadius: 0,
                        borderColor: "#FFFFFF",
                        color: "#FFFFFF",
                      }}
                      placeholder="Purchased readings"
                      dropdownTextStyles={{ color: "#FFFFFF" }}
                      inputStyles={{ color: "#FFFFFF" }}
                    />
                  </View>
                  <View
                    style={{
                      marginVertical: 14,
                      flexDirection: "row",
                      alignItems: "center",
                      borderColor: "#FFFFFF",
                      borderWidth: 1,
                      justifyContent: "space-between",
                      padding: 14,
                      paddingHorizontal: 20,
                    }}
                  >
                    <Text style={{ fontSize: 14, color: "#FFFFFF" }}>
                      Eros 520/mo
                    </Text>
                    <Text
                      style={{
                        fontSize: 10,
                        color: "#FFFFFF",
                        borderBottomColor: "#FFFFFF",
                        borderBottomWidth: 1,
                      }}
                    >
                      SUBSCRIPTION
                    </Text>
                  </View>
                  <View style={styles.inputGroup}>
                    <Text
                      style={{
                        fontSize: 16,
                        fontWeight: 500,
                        color: "#FFFF",
                        paddingVertical: 8,
                      }}
                    >
                      About
                    </Text>
                    <SelectList
                      setSelected={(val) => setSelected(val)}
                      data={data}
                      save="value"
                      arrowicon={
                        <MaterialIcons
                          name="keyboard-arrow-down"
                          size={20}
                          color="white"
                        />
                      }
                      closeicon={
                        <MaterialCommunityIcons
                          name="close"
                          size={20}
                          color="white"
                        />
                      }
                      searchicon={
                        <Fontisto name="search" size={18} color="white" />
                      }
                      boxStyles={{
                        borderRadius: 0,
                        borderColor: "#FFFFFF",
                        color: "#FFFFFF",
                      }}
                      dropdownStyles={{
                        borderRadius: 0,
                        borderColor: "#FFFFFF",
                        color: "#FFFFFF",
                      }}
                      placeholder="FAQ"
                      dropdownTextStyles={{ color: "#FFFFFF" }}
                      inputStyles={{ color: "#FFFFFF" }}
                    />
                  </View>
                  <View style={styles.inputGroup}>
                    <SelectList
                      setSelected={(val) => setSelected(val)}
                      data={data}
                      save="value"
                      arrowicon={
                        <MaterialIcons
                          name="keyboard-arrow-down"
                          size={20}
                          color="white"
                        />
                      }
                      closeicon={
                        <MaterialCommunityIcons
                          name="close"
                          size={20}
                          color="white"
                        />
                      }
                      searchicon={
                        <Fontisto name="search" size={18} color="white" />
                      }
                      boxStyles={{
                        borderRadius: 0,
                        borderColor: "#FFFFFF",
                        color: "#FFFFFF",
                      }}
                      dropdownStyles={{
                        borderRadius: 0,
                        borderColor: "#FFFFFF",
                        color: "#FFFFFF",
                      }}
                      placeholder="Feedbacks & Support"
                      dropdownTextStyles={{ color: "#FFFFFF" }}
                      inputStyles={{ color: "#FFFFFF" }}
                    />
                  </View>
                  <View style={styles.inputGroup}>
                    <SelectList
                      setSelected={(val) => setSelected(val)}
                      data={data}
                      save="value"
                      arrowicon={
                        <MaterialIcons
                          name="keyboard-arrow-down"
                          size={20}
                          color="white"
                        />
                      }
                      closeicon={
                        <MaterialCommunityIcons
                          name="close"
                          size={20}
                          color="white"
                        />
                      }
                      searchicon={
                        <Fontisto name="search" size={18} color="white" />
                      }
                      boxStyles={{
                        borderRadius: 0,
                        borderColor: "#FFFFFF",
                        color: "#FFFFFF",
                      }}
                      dropdownStyles={{
                        borderRadius: 0,
                        borderColor: "#FFFFFF",
                        color: "#FFFFFF",
                      }}
                      placeholder="Terms & Conditions"
                      dropdownTextStyles={{ color: "#FFFFFF" }}
                      inputStyles={{ color: "#FFFFFF" }}
                    />
                  </View>
                  <View style={styles.inputGroup}>
                    <SelectList
                      setSelected={(val) => setSelected(val)}
                      data={data}
                      save="value"
                      arrowicon={
                        <MaterialIcons
                          name="keyboard-arrow-down"
                          size={20}
                          color="white"
                        />
                      }
                      closeicon={
                        <MaterialCommunityIcons
                          name="close"
                          size={20}
                          color="white"
                        />
                      }
                      searchicon={
                        <Fontisto name="search" size={18} color="white" />
                      }
                      boxStyles={{
                        borderRadius: 0,
                        borderColor: "#FFFFFF",
                        color: "#FFFFFF",
                      }}
                      dropdownStyles={{
                        borderRadius: 0,
                        borderColor: "#FFFFFF",
                        color: "#FFFFFF",
                      }}
                      placeholder="Privacy"
                      dropdownTextStyles={{ color: "#FFFFFF" }}
                      inputStyles={{ color: "#FFFFFF" }}
                    />
                  </View>
                  <View style={styles.inputGroup}>
                    <SelectList
                      setSelected={(val) => setSelected(val)}
                      data={data}
                      save="value"
                      arrowicon={
                        <MaterialIcons
                          name="keyboard-arrow-down"
                          size={20}
                          color="white"
                        />
                      }
                      closeicon={
                        <MaterialCommunityIcons
                          name="close"
                          size={20}
                          color="white"
                        />
                      }
                      searchicon={
                        <Fontisto name="search" size={18} color="white" />
                      }
                      boxStyles={{
                        borderRadius: 0,
                        borderColor: "#FFFFFF",
                        color: "#FFFFFF",
                      }}
                      dropdownStyles={{
                        borderRadius: 0,
                        borderColor: "#FFFFFF",
                        color: "#FFFFFF",
                      }}
                      placeholder="About Us"
                      dropdownTextStyles={{ color: "#FFFFFF" }}
                      inputStyles={{ color: "#FFFFFF" }}
                    />
                  </View>
                  <View style={styles.inputGroup}>
                    <SelectList
                      setSelected={(val) => setSelected(val)}
                      data={data}
                      save="value"
                      arrowicon={
                        <MaterialIcons
                          name="keyboard-arrow-down"
                          size={20}
                          color="white"
                        />
                      }
                      closeicon={
                        <MaterialCommunityIcons
                          name="close"
                          size={20}
                          color="white"
                        />
                      }
                      searchicon={
                        <Fontisto name="search" size={18} color="white" />
                      }
                      boxStyles={{
                        borderRadius: 0,
                        borderColor: "#FFFFFF",
                        color: "#FFFFFF",
                      }}
                      dropdownStyles={{
                        borderRadius: 0,
                        borderColor: "#FFFFFF",
                        color: "#FFFFFF",
                      }}
                      placeholder="Delete account"
                      dropdownTextStyles={{ color: "#FFFFFF" }}
                      inputStyles={{ color: "#FFFFFF" }}
                    />
                  </View>
                  <View style={styles.inputGroup}>
                    <SelectList
                      setSelected={(val) => setSelected(val)}
                      data={data}
                      save="value"
                      arrowicon={
                        <MaterialIcons
                          name="keyboard-arrow-down"
                          size={20}
                          color="white"
                        />
                      }
                      closeicon={
                        <MaterialCommunityIcons
                          name="close"
                          size={20}
                          color="white"
                        />
                      }
                      searchicon={
                        <Fontisto name="search" size={18} color="white" />
                      }
                      boxStyles={{
                        borderRadius: 0,
                        borderColor: "#FFFFFF",
                        color: "#FFFFFF",
                      }}
                      dropdownStyles={{
                        borderRadius: 0,
                        borderColor: "#FFFFFF",
                        color: "#FFFFFF",
                      }}
                      placeholder="Contact Us"
                      dropdownTextStyles={{ color: "#FFFFFF" }}
                      inputStyles={{ color: "#FFFFFF" }}
                    />
                  </View>
                  <View
                    style={{
                      width: "100%",
                      justifyContent: "center",
                      flexDirection: "row",
                      marginVertical: 10,
                    }}
                  >
                    <TouchableOpacity
                      style={{
                        flexDirection: "row",
                        width: 136,
                        //   padding: 10,
                        // paddingVertical: 5,
                        padding: 8,
                        justifyContent: "center",
                        alignItems: "center",
                        borderRadius: 7,
                        backgroundColor: "#FFFFFF",
                      }}
                      onPress={() => {
                        navigation.navigate(navigationKeys.LOGIN);

                        logout();
                      }}
                    >
                      <Text
                        style={{
                          color: "#E1353C",
                          fontSize: 18,
                          fontWeight: 500,
                          paddingRight: 8,
                        }}
                      >
                        Logout
                      </Text>
                      <FontAwesome name="power-off" size={23} color="#E1353C" />
                    </TouchableOpacity>
                  </View>
                  <Text
                    style={{
                      flexDirection: "row",
                      fontSize: 16,
                      fontWeight: 400,
                      textAlign: "center",
                      color: "#FFFFFF",
                    }}
                  >
                    Follow us on
                  </Text>
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "space-between",
                      paddingHorizontal: 100,
                      paddingVertical: 8,
                    }}
                  >
                    <FontAwesome5
                      name="facebook-square"
                      size={40}
                      color="#FDE74D"
                    />
                    <FontAwesome5
                      name="twitter-square"
                      size={40}
                      color="#FDE74D"
                    />
                    <Feather name="instagram" size={40} color="#FDE74D" />
                  </View>
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontSize: 12,
                      fontWeight: 400,
                      textAlign: "center",
                      paddingBottom: 16,
                    }}
                  >
                    App version 6.1
                  </Text>
                </Animated.View>
              )}
            </View>
          </View>
        </LinearGradient>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  userCardWrapper: {
    flexDirection: "column",
    alignItems: "center",
    paddingHorizontal: 31,
    paddingVertical: 15,
    marginHorizontal: 15,
    borderRadius: 10,
    width: "90%",
  },
  userAvatar: {
    flexDirection: "row",
    borderRadius: 110,
    width: 110,
    height: 110,
    alignItems: "center",
    position: "absolute",
    top: -50,
  },
  userWrapper: {
    width: "100%",
    paddingVertical: 10,
    alignItems: "center",
  },
  username: {
    // color: "#FFFFFF",
    fontWeight: 400,
    fontSize: 16,
    marginBottom: 10,
  },
  userItems: {
    flexDirection: "row",
    width: "90%",
  },
  userItem: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
  },
  userItemText: {
    marginLeft: 5,
    color: "#FFFFFF",
  },
  controlWrapper: {
    // width: "100%",
  },
  inputGroup: {
    flexDirection: "column",
    marginVertical: 11,
  },
  Input: {
    // color: "#FFFFFF",
    fontSize: 16,
    // fontWeight: 400,
    // marginLeft: 5,
    width: "100%",
    // height: 100,
    borderWidth: 1,
    borderColor: "#FFFFFF",
    color: "#FFFFFF",
    // padding: 8,
    paddingLeft: 20,
    height: 48,
  },
  switchWrraper: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    height: 24,
    alignItems: "center",
  },
});
