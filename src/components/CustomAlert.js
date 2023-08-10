import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Image } from 'react-native';
import Modal from 'react-native-modal';
import COLORS from '../conts/colors';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';


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
                        <Icon name={icon} style={styles.icon} size={scale(36)} />
                    </View>
                    <Text style={styles.title}>{title}</Text>
                    <Text style={styles.message}>{message}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-end' }}>
                        {confirmBtn &&
                            <TouchableOpacity style={[styles.button]} onPress={handleConfirm}>
                                <Text style={styles.buttonText}>OK</Text>
                            </TouchableOpacity>
                        }
                        <TouchableOpacity style={[styles.button, { marginLeft: moderateScale(10) }]}
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
        borderRadius: scale(10),
        padding: scale(20),
        width: moderateScale(280),
    },

    icon: {
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: verticalScale(15),
        color: COLORS.blue
    },
    title: {
        fontSize: scale(18),
        fontWeight: 'bold',
        marginBottom: verticalScale(8),
        color: "#000000"
    },
    message: {
        color: "#000000",
        fontSize: scale(14),
        marginBottom: verticalScale(14),
    },
    button: {
        backgroundColor: COLORS.blue,
        borderRadius: 5,
        textAlign: 'center',
        paddingHorizontal: moderateScale(18),
        paddingVertical: verticalScale(10),
    },
    buttonText: {
        fontSize: scale(14),
        color: '#ffffff',
    },
});
