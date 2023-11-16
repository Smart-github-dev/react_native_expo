import { LinearGradient } from "expo-linear-gradient";

export default GradientCard = (props) => {
  return (
    <LinearGradient
      colors={props.colors || ["#4145B0", "#151539"]}
      start={{
        x: 0,
        y: 0,
      }}
      end={{
        x: 1,
        y: 0,
      }}
      style={props.style}
    >
      {props.children}
    </LinearGradient>
  );
};
