import { View, Text, StyleSheet, Animated } from "react-native";
import React, { useState, useEffect } from "react";
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from "react-native-responsive-screen";

const Snackbar = ({
  message,
  visible,
  duration = 3000,
  backgroundClr,
  txtclr,
  Images,
  subtitle,
  setVisible,
}) => {
  const [visibleState, setVisibleState] = useState(visible);
  const [animation] = useState(new Animated.Value(0));

  useEffect(() => {
    if (visible) {
      setVisibleState(true);
      Animated.timing(animation, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }).start();

      const timer = setTimeout(() => {
        setVisible(false);
      }, duration);

      return () => clearTimeout(timer);
    } else {
      Animated.timing(animation, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setVisibleState(false);
      });
    }
  }, [animation, duration, visible]);

  if (!visibleState) {
    return null;
  }
  const combinedTextLength = (message?.length || 0) + (subtitle?.length || 0);
  const calculatedWidth = combinedTextLength > 50 ? wp("90%") : wp("40%");

  return (
    <Animated.View
      style={[
        styles.container,
        { backgroundColor: backgroundClr, width: calculatedWidth },
        {
          opacity: animation,
          transform: [
            {
              translateY: animation.interpolate({
                inputRange: [0, 1],
                outputRange: [50, 0],
              }),
            },
          ],
        },
      ]}
    >
      <View style={{ flexDirection: "row" }}>
        {Images && <Images />}

        <View style={[styles.messagecon, !subtitle && { marginTop: hp("1%") }]}>
          <Text style={[styles.message, { color: txtclr }]}>{message}</Text>
          <Text style={styles.subtitletext}>{subtitle}</Text>
        </View>
      </View>
      <TouchableOpacity onPress={onDismiss}>
        <Text style={styles.dismissText}>Dismiss</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: hp("10%"),
    left: wp("5%"),
    right: wp("5%"),
    // maxWidth: wp('90%'), // Adjust the max width as needed
    alignSelf: "center", // Center horizontally
    padding: hp("1.4%"),
    borderRadius: 16,
    flexDirection: "column",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },
  messagecon: {
    flexDirection: "column",
    width: wp("78%"),
    marginLeft: wp("2%"),
    alignItems: "flex-start",
  },
  message: {
    color: "white",
    fontFamily: "ManropeMedium",
    fontSize: hp("2%"),
  },
  subtitletext: {
    color: "white",
    fontFamily: "ManropeMedium",
    fontSize: hp("1.5%"),
  },
});

export default Snackbar;
