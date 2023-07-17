import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import COLORS from '../conts/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

export default function CustomDialog({ visible, onConfirm, confirmBtn, onClose, title, message, icon }) {
    const handleClose = () => {
        onClose();
    };
    const handleConfirm = () => {
        onConfirm();
    };

    return (
        <Modal isVisible={visible} style={styles.modal}>
            <View style={styles.container}>
                <View style={styles.box}>
                    <View style={{ alignItems: 'center' }}>
                        <Icon name={icon} style={styles.icon} size={40} />
                    </View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end'}}>
                        {confirmBtn &&
                            <TouchableOpacity style={[styles.button]} onPress={handleConfirm}>
                                <Text style={styles.buttonText}>OK</Text>
                            </TouchableOpacity>
                         }
                        <TouchableOpacity style={[styles.button, {marginLeft: 10}]}
                            onPress={handleClose}>
                            <Text style={styles.buttonText}>{confirmBtn ? "Cancel" : "OK"}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

const styles = StyleSheet.create({
    modal: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },

    box: {
        backgroundColor: '#ffffff',
        borderRadius: 10,
        padding: 20,
        width: 300,
    },

    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 15,
        color: COLORS.blue
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: "#000000"
    },
    message: {
        color: "#000000",
        fontSize: 16,
        marginBottom: 20,
    },
    button: {
        backgroundColor: COLORS.blue,
        borderRadius: 5,
        textAlign: 'center',
        paddingHorizontal: 20,
        paddingVertical: 10,
    },
    buttonText: {
        fontSize: 16,
        color: '#ffffff',
    },
});
