import React, { useEffect, useRef } from "react";
import { View, Text, Pressable, StyleSheet, Dimensions, Animated } from "react-native";

const { width, height } = Dimensions.get("window");

export default function ArabicMainPage({ onNext }) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;
  const scaleValue = useRef(new Animated.Value(0.8)).current;

  useEffect(() => {
    // Title animation
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();

    // Subtitle animation
    Animated.timing(slideAnim, {
      toValue: 0,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Button animation (pulsing effect)
    Animated.loop(
      Animated.sequence([
        Animated.timing(scaleValue, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(scaleValue, {
          toValue: 0.95,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handleArabicAlphabets = () => {
    console.log("Navigating to Arabic Alphabets");
    onNext({ screen: "ArabicAlphabetsScreen" });
  };

  return (
    <View style={styles.container}>
      <View style={styles.backgroundPattern}>
        {/* Decorative elements */}
        <View style={[styles.decorativeCircle, styles.circle1]} />
        <View style={[styles.decorativeCircle, styles.circle2]} />
        <View style={[styles.decorativeCircle, styles.circle3]} />
        
        {/* Arabic script decorative elements */}
        <Text style={styles.arabicText1}>ا</Text>
        <Text style={styles.arabicText2}>ب</Text>
        <Text style={styles.arabicText3}>ت</Text>
        <Text style={styles.arabicText4}>ث</Text>
      </View>
      
      <View style={styles.contentContainer}>
        <Animated.View style={{ opacity: fadeAnim }}>
          <Text style={styles.heading}>Arabic Learning</Text>
        </Animated.View>
        
        <Animated.View style={{ transform: [{ translateY: slideAnim }] }}>
          <Text style={styles.subtitle}>Learn Arabic with interactive exercises</Text>
        </Animated.View>
        
        <Animated.View style={[styles.buttonContainer, { transform: [{ scale: scaleValue }] }]}>
          <Pressable
            onPress={handleArabicAlphabets}
            style={({ pressed }) => [
              styles.mainButton,
              pressed && { backgroundColor: "#3a7cb8" },
            ]}
          >
            <Text style={styles.buttonText}>Arabic Alphabets</Text>
          </Pressable>
        </Animated.View>
      </View>
      
      <Text style={styles.footerText}>Designed for Arabic Language Learners</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF"
  },
  contentContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    paddingHorizontal: 20,
  },
  backgroundPattern: {
    position: "absolute",
    width: width,
    height: height,
    opacity: 0.1,
    backgroundColor: "#F2F4F6",
  },
  decorativeCircle: {
    position: "absolute",
    borderRadius: 100,
    opacity: 0.15,
  },
  circle1: {
    width: 200,
    height: 200,
    top: -50,
    right: -50,
    backgroundColor: "#9DB9E2",
  },
  circle2: {
    width: 150,
    height: 150,
    bottom: 100,
    left: -50,
    backgroundColor: "#ECA5B3",
  },
  circle3: {
    width: 100,
    height: 100,
    top: 200,
    right: 100,
    backgroundColor: "#C7E9D0",
  },
  arabicText1: {
    position: "absolute",
    top: 100,
    left: 50,
    fontSize: 70,
    color: "#9DB9E2",
    opacity: 0.15,
    transform: [{ rotate: "15deg" }],
  },
  arabicText2: {
    position: "absolute",
    bottom: 150,
    right: 70,
    fontSize: 70,
    color: "#ECA5B3",
    opacity: 0.15,
    transform: [{ rotate: "-10deg" }],
  },
  arabicText3: {
    position: "absolute",
    top: 300,
    left: width / 2 - 30,
    fontSize: 70,
    color: "#C7E9D0",
    opacity: 0.15,
    transform: [{ rotate: "5deg" }],
  },
  arabicText4: {
    position: "absolute",
    bottom: 250,
    left: 100,
    fontSize: 70,
    color: "#B7AEDC",
    opacity: 0.15,
    transform: [{ rotate: "-5deg" }],
  },
  heading: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#000000",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 18,
    color: "#4867B3",
    marginBottom: 40,
    textAlign: "center",
    paddingHorizontal: 20,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 30,
  },
  mainButton: {
    padding: 20,
    backgroundColor: "#4867B3",
    borderRadius: 30,
    width: '80%',
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 20,
    fontWeight: "600",
    textAlign: "center",
  },
  footerText: {
    position: "absolute",
    bottom: 30,
    alignSelf: "center",
    color: "#333333",
    fontSize: 14,
  },
});