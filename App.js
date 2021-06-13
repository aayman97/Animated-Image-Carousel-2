import { StatusBar } from "expo-status-bar";
import React from "react";
import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  Animated,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { FontAwesome } from "@expo/vector-icons";

const data = [
  {
    image: require("./assets/images/1.jpg"),
    caption: "Plan A Trip",
    description: "Start planning and we are also committed to helping you,",
  },
  {
    image: require("./assets/images/3.jpg"),
    caption: "Choose A Destination",
    description:
      "Choose any destination and we will help you find the best places.",
  },
  {
    image: require("./assets/images/2.jpg"),
    caption: "Enjoy The Trip",
    description:
      "Easily discover the new places and share with your friends and travel together.",
  },
];

const { width, height } = Dimensions.get("screen");
export default function App() {
  const [activeIndex, setActiveIndex] = React.useState(0);
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const flatlistref = React.useRef();
  return (
    <View style={styles.container}>
      <Animated.FlatList
        ref={flatlistref}
        data={data}
        horizontal
        keyExtractor={(item) => item.key}
        snapToInterval={width}
        decelerationRate={0.5}
        bounces={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { x: scrollX } } }],
          { useNativeDriver: false }
        )}
        showsHorizontalScrollIndicator={false}
        renderItem={(item) => {
          const inputRange = [
            (item.index - 1) * width,
            item.index * width,
            (item.index + 1) * width,
          ];

          const opacityAnimation = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });

          const scaleAnimation = scrollX.interpolate({
            inputRange,
            outputRange: [1, 1.3, 1],
          });
          const radiusAnimation = scrollX.interpolate({
            inputRange,
            outputRange: [width * 0.3, width * 0.5, width * 0.3],
          });
          const leftAnimation = scrollX.interpolate({
            inputRange,
            outputRange: [width * 0.8, -width * 0.27, width * 0.8],
          });

          const bottomAnimation = scrollX.interpolate({
            inputRange,
            outputRange: [width * 0.8, 0, width * 0.8],
          });
          const scaleImageAnimation = scrollX.interpolate({
            inputRange,
            outputRange: [0, 1, 0],
          });
          const rotatationAnimation = scrollX.interpolate({
            inputRange,
            outputRange: ["180deg", "0deg", "-180deg"],
          });

          return (
            <View
              style={{
                width: width,
                paddingHorizontal: 20,
              }}
            >
              <Animated.View
                style={{
                  flex: 0.8,
                  width: width,
                  alignSelf: "center",
                  overflow: "hidden",
                  borderBottomLeftRadius: radiusAnimation,
                  borderBottomRightRadius: radiusAnimation,
                  transform: [{ scale: scaleAnimation }],
                  opacity: opacityAnimation,
                }}
              >
                <Animated.Image
                  source={item.item.image}
                  style={{
                    resizeMode: "contain",
                    left: leftAnimation,
                    bottom: bottomAnimation,
                    borderBottomLeftRadius: width,
                    borderBottomRightRadius: width,
                    // transform: [
                    //   {
                    //     scale: scaleImageAnimation,
                    //   },
                    // ],
                  }}
                />
              </Animated.View>

              <View style={{ flex: 1, alignItems: "center" }}>
                <Text
                  style={{
                    marginTop: "24%",
                    fontSize: 30,
                    fontWeight: "bold",
                  }}
                >
                  {item.item.caption}
                </Text>
                <Text
                  style={{
                    textAlign: "center",
                    marginTop: "5%",
                    fontSize: 15,
                    fontWeight: "bold",
                    width: width * 0.75,
                  }}
                >
                  {item.item.description}
                </Text>
              </View>
            </View>
          );
        }}
      />

      <View
        style={{
          position: "absolute",
          width,
          top: "75%",
          alignItems: "center",
        }}
      >
        <View style={{ flexDirection: "row", marginBottom: 40 }}>
          {data.map((item, index) => {
            const inputRange = [
              (index - 1) * width,
              index * width,
              (index + 1) * width,
            ];

            const colorAnimation = scrollX.interpolate({
              inputRange,
              outputRange: ["white", "#3e81e1", "white"],
            });
            return (
              <Animated.View
                key={index}
                style={{
                  width: width * 0.035,
                  height: width * 0.035,
                  backgroundColor: colorAnimation,
                  borderRadius: width,
                  marginHorizontal: 5,
                  borderWidth: 2,
                  borderColor: "#3e81e1",
                }}
              />
            );
          })}
        </View>

        <TouchableOpacity
          style={{
            width: width * 0.18,
            height: width * 0.18,
            borderRadius: width,
            backgroundColor: "#3e81e1",
            alignSelf: "center",
            alignItems: "center",
            justifyContent: "center",
          }}
          onPress={() => {
            console.log(Math.ceil(scrollX._value / width));
            if (flatlistref.current) {
              setTimeout(() => {
                if (Math.ceil(scrollX._value / width) < data.length - 1) {
                  flatlistref.current.scrollToIndex({
                    index: Math.ceil(scrollX._value / width) + 1,
                    animated: true,
                  });
                  scrollX.setValue(Math.ceil(scrollX._value / width) + 1);
                }
              }, 0);
            }
          }}
        >
          <FontAwesome name="arrow-right" size={35} color="white" />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
