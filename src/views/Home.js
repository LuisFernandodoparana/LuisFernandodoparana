import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, Button, Image, StyleSheet, Pressable, StatusBar } from "react-native";
import * as Notifications from 'expo-notifications';
import { isDevice } from 'expo-device';
import Icon from 'react-native-vector-icons/EvilIcons'
const notificationText = [
    {
        id: 1,
        title: 'Aproveite os nossos cupons de desconto!',
        body: 'Utilizando o cupom casademae20 você conseguem 20% de desconto em todas as refeições!'
    },
    {
        id: 2,
        title: 'Não perca essa oportunidade deliciosa!',
        body: 'Aproveite o nosso cartão cliete fiel e faça uma refeição em nosso restaurante!'
    },
    {
        id: 3,
        title: 'Oferta exclusiva para Você!',
        body: 'Não perca a quarta-feira da feijuada e compre o seu almoço por apenas 25 reais!'
    }
]
/**
 * Configurações gerais:
 * - O que fazer quando chega uma notificação? exibir um alerta? um som? etc.
 */
Notifications.setNotificationHandler({
    handleNotification: async () => ({
        shouldShowAlert: true,
        shouldPlaySound: false,
        shouldSetBadge: false,
    }),
});

export default function Home({ navigation }) {
    /**
     * Estado da aplicação (state)
     */
    const [expoPushToken, setExpoPushToken] = useState('');
    const [notification, setNotification] = useState(false);
    /**
    * O useState permite atualizar o estado de uma função!
    * nesse caso a função inicial é notificationContent.
    * E esta sendo atualizada pela função setNotificationContent 
    * que esta recebendo as informações do title e do body
    */
    const [notificationContent, setNotificationContent] = useState({
        title: '',
        body: ''
    });
    /**
     * Referências aos objetos "ouvintes" (listeners)
     */
    const notificationListener = useRef();
    const responseListener = useRef();

    useEffect(() => {
        //Passo 1: obtenção do token
        registerForPushNotificationsAsync().then(
            token => setExpoPushToken(token) //salvar o token no estado (state)
        );
        //Terceiro passo (avisar a aplicação que chegou uma nova notificação)
        notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
            setNotification(notification); //armazenar a notificação no estado (state)
            setNotificationContent({ title: notification.request.content.title, body: notification.request.content.body })
        });
        //Terceiro passo (evento executado quando o usuário clica na notificação)
        responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
            navigation.navigate("Notification", {
                notificationTitle: notification && response.notification.request.content.title,
                notificationBody: notification && response.notification.request.content.body
            })
            console.log(response);
        });

        return () => {
            Notifications.removeNotificationSubscription(notificationListener.current);
            Notifications.removeNotificationSubscription(responseListener.current);
        }
    }, [notificationContent]);
    // obter o token método pronto 
    async function registerForPushNotificationsAsync() {
        let token;
        if (isDevice) {
            const { status: existingStatus } = await Notifications.getPermissionsAsync();
            let finalStatus = existingStatus;
            if (existingStatus !== 'granted') {
                const { status } = await Notifications.requestPermissionsAsync();
                finalStatus = status;
            }
            if (finalStatus !== 'granted') {
                alert('Failed to get push token for push notification!');
                return;
            }
            token = (await Notifications.getExpoPushTokenAsync()).data;
            console.log(token);
        }

        if (Platform.OS === 'android') {
            Notifications.setNotificationChannelAsync('default', {
                name: 'default',
                importance: Notifications.AndroidImportance.MAX,
                vibrationPattern: [0, 250, 250, 250],
                lightColor: '#FF231F7C',
            });
        }

        return token;
    }

    async function schedulePushNotification() {
        let contador = Math.floor(Math.random() * notificationText.length)
        console.log(contador)
        const mensagem = notificationText[contador];
        await Notifications.scheduleNotificationAsync(
            (
                {
                    content: {
                        title: mensagem.title,
                        body: mensagem.body,
                        sound: true,
                    },
                    trigger: { seconds: 5 },
                    repeats: true,
                }
            ))
    }



    return (
        <View style={Styles.Conteiner}>
            <View style={Styles.Header}>
                <Pressable>
                    <Text style={Styles.HeaderText}>
                        Cardapio
                    </Text>
                </Pressable>
                <Pressable
                    onPress={schedulePushNotification}>
                    <Text style={Styles.HeaderText}>
                        Testar Notificações
                    </Text>
                </Pressable>
                <View style={Styles.Search}>
                    <Icon name='search' size={25} color='white' />
                </View>
            </View>
            <View>
                <Text style={Styles.Title}>
                    Bem-vindo ao Restaureante Trattoria
                </Text>
                <Text style={Styles.TitleTwe}>
                    De uma olhada nos nossos pratos!
                </Text>
            </View>
            <View>
                <Image
                    source={require('../image/fachada.jpg')}
                    style={Styles.Image} />
            </View>

        </View>
    )
}
const Styles = StyleSheet.create({
    Conteiner: {
        width: '100%',
        height: '100%',
        backgroundColor: 'white',
        alignItems: 'center'
    },
    Header: {
        flexDirection: 'row',
        width: '100%',
        height: 40,
        backgroundColor: '#bc3e55',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 9,

    },
    HeaderText: {
        fontSize: 15,
        color: 'white',
        margin: 5
    },
    Search: {
        marginLeft: 40
    },
    Title: {
        fontSize: 20,
        color: '#705e61',
    },
    TitleTwe: {
        textAlign: 'center',
        color: '#705e61',
        marginBottom: 9
    },
    Image: {
        width: 300,
        height: 150,
        borderRadius: 3
    }
})
