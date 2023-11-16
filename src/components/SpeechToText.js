import { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import Voice from "@react-native-voice/voice";

const SpeechToTextComponent = ({ handleQuery }) => {
  const [isRecording, setIsRecording] = useState(false);
  const [query, setQuery] = useState("");

  const toogleSpeechToText = async (e) => {
    if (!isRecording) {
      // const services = await Voice.getSpeechRecognitionServices();
      // console.log(services);

      console.log("start");
      await Voice.start("en-US");
    } else {
      console.log("end");
      await Voice.stop();
    }
    setIsRecording(!isRecording);
  };

  useEffect(() => {
    Voice.onSpeechStart = () => {
      console.log(1);
    };
    Voice.onSpeechEnd = () => {
      console.log(2);
    };
    Voice.onSpeechRecognized = () => {
      console.log(3);
    };
    Voice.onSpeechError = (e) => {
      console.log("onSpeechError: ", e);
    };
    Voice.onSpeechResults = (e) => {
      console.log("speech result: ", e.value);
      setQuery(e.value);
    };
    Voice.onSpeechVolumeChanged = (event) => {
      console.log("volumn change: ", event);
    };
    return function cleanup() {
      Voice.destroy().then(Voice.removeAllListeners);
    };
  }, []);

  useEffect(() => {
    handleQuery(query);
  }, [query]);

  return (
    <TouchableOpacity onPress={toogleSpeechToText}>
      <MaterialIcons name="keyboard-voice" size={28} color="#555555" />
    </TouchableOpacity>
  );
};

export default SpeechToTextComponent;
