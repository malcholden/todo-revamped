import { StatusBar } from 'expo-status-bar';
import { Button, TextInput, SafeAreaView, ScrollView, StyleSheet, Text, View } from 'react-native';
import { styles } from './styles';
import { Image } from 'expo-image';
import happyDog from './assets/happy-dog.gif';
import { ReactNode, useState } from "react";
import ToDo from './ToDo';

export default function App() {
  return(
    <ToDo/>
  )
  
}