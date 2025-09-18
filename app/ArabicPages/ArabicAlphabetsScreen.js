import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Dimensions, Alert, I18nManager } from 'react-native';
import { Audio } from 'expo-av';

// Force RTL layout for Arabic
I18nManager.forceRTL(true);
I18nManager.allowRTL(true);

const { width } = Dimensions.get('window');

// Arabic alphabet data with audio file references
const arabicAlphabets = [
  { id: 1, letter: 'ا', name: 'Alif', sound: require('../../assets/sound/alif.mp3') },
  { id: 2, letter: 'ب', name: 'Baa', sound: require('../../assets/sound/baa.mp3') },
  { id: 3, letter: 'ت', name: 'Taa', sound: require('../../assets/sound/taa.mp3') },
  { id: 4, letter: 'ث', name: 'saa', sound: require('../../assets/sound/saa.mp3') },
  { id: 5, letter: 'ج', name: 'Jeem', sound: require('../../assets/sound/jeem.mp3') },
  { id: 6, letter: 'ح', name: 'Haa', sound: require('../../assets/sound/haa.mp3') },
  { id: 7, letter: 'خ', name: 'Khaa', sound: require('../../assets/sound/khaa.mp3') },
  { id: 8, letter: 'د', name: 'Daal', sound: require('../../assets/sound/daal.mp3') },
  { id: 9, letter: 'ذ', name: 'Zaal', sound: require('../../assets/sound/zaal.mp3') },
  { id: 10, letter: 'ر', name: 'Raa', sound: require('../../assets/sound/raa.mp3') },
  { id: 11, letter: 'ز', name: 'Zaay', sound: require('../../assets/sound/zaay.mp3') },
  { id: 12, letter: 'س', name: 'Seen', sound: require('../../assets/sound/seen.mp3') },
  { id: 13, letter: 'ش', name: 'Sheen', sound: require('../../assets/sound/sheen.mp3') },
  { id: 14, letter: 'ص', name: 'Saad', sound: require('../../assets/sound/saad.mp3') },
  { id: 15, letter: 'ض', name: 'Daad', sound: require('../../assets/sound/daad.mp3') },
  { id: 16, letter: 'ط', name: 'Taa', sound: require('../../assets/sound/taah.mp3') },
  { id: 17, letter: 'ظ', name: 'Zhaa', sound: require('../../assets/sound/zhaa.mp3') },
  { id: 18, letter: 'ع', name: 'Ayn', sound: require('../../assets/sound/ayn.mp3') },
  { id: 19, letter: 'غ', name: 'Ghayn', sound: require('../../assets/sound/ghayn.mp3') },
  { id: 20, letter: 'ف', name: 'Faa', sound: require('../../assets/sound/faa.mp3') },
  { id: 21, letter: 'ق', name: 'Qaaf', sound: require('../../assets/sound/qaaf.mp3') },
  { id: 22, letter: 'ك', name: 'Kaaf', sound: require('../../assets/sound/kaaf.mp3') },
  { id: 23, letter: 'ل', name: 'Laam', sound: require('../../assets/sound/laam.mp3') },
  { id: 24, letter: 'م', name: 'Meem', sound: require('../../assets/sound/meem.mp3') },
  { id: 25, letter: 'ن', name: 'Noon', sound: require('../../assets/sound/noon.mp3') },
  { id: 26, letter: 'ه', name: 'Haah', sound: require('../../assets/sound/haah.mp3') },
  { id: 27, letter: 'و', name: 'Waaw', sound: require('../../assets/sound/waaw.mp3') },
  { id: 28, letter: 'ي', name: 'Yaa', sound: require('../../assets/sound/yaa.mp3') },
];

export default function ArabicAlphabetsScreen() {
  const [sound, setSound] = useState(null);
  const [selectedLetter, setSelectedLetter] = useState(null);

  // Clean up sound on unmount
  useEffect(() => {
    return sound
      ? () => {
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  // Play sound for a letter
  async function playSound(letterSound, letterId) {
    try {
      setSelectedLetter(letterId);
      
      if (sound) {
        await sound.unloadAsync();
      }
      
      const { sound: newSound } = await Audio.Sound.createAsync(letterSound);
      setSound(newSound);
      
      newSound.setOnPlaybackStatusUpdate((status) => {
        if (status.didJustFinish) {
          setSelectedLetter(null);
        }
      });
      
      await newSound.playAsync();
    } catch (error) {
      Alert.alert('Error', 'Could not play sound. Please try again.');
      setSelectedLetter(null);
    }
  }

  // Render alphabet grid with RTL layout
  const renderAlphabetGrid = () => {
    const rows = [];
    const itemsPerRow = 4;
    
    for (let i = 0; i < arabicAlphabets.length; i += itemsPerRow) {
      const rowItems = arabicAlphabets.slice(i, i + itemsPerRow);
      
      rows.push(
        <View key={i} style={[styles.row, {flexDirection: 'row-reverse'}]}>
          {rowItems.map((item) => (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.letterButton,
                selectedLetter === item.id && styles.selectedLetterButton
              ]}
              onPress={() => playSound(item.sound, item.id)}
            >
              <Text style={styles.arabicLetter}>{item.letter}</Text>
              <Text style={styles.letterName}>{item.name}</Text>
            </TouchableOpacity>
          ))}
        </View>
      );
    }
    
    return rows;
  };

  return (
    <View style={[styles.container, {direction: 'rtl'}]}>
      <Text style={styles.title}>Arabic Alphabets</Text>
      <Text style={styles.subtitle}>CLICK ALPHABETS TO LISTEN THEIR SOUNDS</Text>
      
      <ScrollView contentContainerStyle={styles.gridContainer}>
        {renderAlphabetGrid()}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
    padding: 16,
    paddingTop: 40,
    direction: 'rtl'
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#2E7D32',
    textAlign: 'center',
    marginBottom: 10,
    writingDirection: 'rtl',
  },
  subtitle: {
    fontSize: 16,
    color: '#4867B3',
    textAlign: 'center',
    marginBottom: 30,
    fontWeight: '500',
    writingDirection: 'rtl',
  },
  gridContainer: {
    paddingBottom: 30,
  },
  row: {
    flexDirection: 'row-reverse',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  letterButton: {
    width: width / 4.8,
    height: width / 4.8,
    backgroundColor: 'white',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  selectedLetterButton: {
    backgroundColor: '#E3F2FD',
    borderColor: '#2196F3',
    transform: [{ scale: 1.05 }],
  },
  arabicLetter: {
    fontSize: 32,
    color: '#2E7D32',
    marginBottom: 5,
    textAlign: 'right',
    writingDirection: 'rtl',
  },
  letterName: {
    fontSize: 12,
    color: '#555',
    textTransform: 'uppercase',
    textAlign: 'right',
    writingDirection: 'rtl',
  },
});