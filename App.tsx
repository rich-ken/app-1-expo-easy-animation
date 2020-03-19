import * as React from "react";
import {
  Animated,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
  ScrollView
} from "react-native";
import Constants from "expo-constants";
import { AssetExample } from "./components/AssetExample";

const AnimatedScrollView: typeof ScrollView = Animated.ScrollView as any;
const App = () => {
  const animValue = new Animated.Value(0);
  let rotateCount = 0;

  const onScroll = Animated.event(
    [{ nativeEvent: { contentOffset: { y: animValue } } }],
    {
      useNativeDriver: true
    }
  );
  const animRotateZ = animValue.interpolate({
    inputRange: [0, 300],
    outputRange: [0, Math.PI]
  });

  function animate() {
    rotateCount = rotateCount + 1;
    // Animated.timing(animValue, {
    //   toValue: rotateCount * Math.PI,
    //   duration: 500
    // }).start(); // Start the animation
  }

  return (
    <>
      <AnimatedScrollView
        style={{ flex: 1 }}
        contentContainerStyle={{ height: 2000 }}
        onScroll={onScroll}
      >
        <View style={{ height: 2000 }} />
      </AnimatedScrollView>
      <View style={StyleSheet.absoluteFill} pointerEvents="box-none">
        <Animated.View
          style={[styles.container, { transform: [{ rotateZ: animRotateZ }] }]}
        >
          {/* <Text>Math.PI {Math.PI}</Text> */}
          <TouchableHighlight onPress={animate} activeOpacity={0.2}>
            <View>
              <AssetExample />
            </View>
          </TouchableHighlight>
        </Animated.View>
      </View>
    </>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    // flex: 1,

    justifyContent: "center",
    paddingTop: Constants.statusBarHeight,
    backgroundColor: "#ecf0f1",
    padding: 8
  },
  paragraph: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  }
});
