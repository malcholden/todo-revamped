import {  View, Text, Button, Modal, ModalProps, Pressable} from "react-native";
import { Audio } from "expo-av";
import React, { useState } from "react";
import doneSound from './assets/check.mp3'
import delSound from './assets/no.mp3'
import addedSound from './assets/success.mp3';
import { styles } from './styles';


export default function AlertBox({visible, message, onClose}){
    console.log("f");
    return(

        <Modal 
        visible={visible}
        transparent
        animationType='fade'
        >
        <View style={styles.alertBlur}>
            <View style={styles.alertContent}>
                <Text>{message}</Text>
                <Button title="OK" onPress={onClose}></Button>
            </View>
        </View>

        </Modal>

    );
        
    
}