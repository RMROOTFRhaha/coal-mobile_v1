import {Text, View} from "react-native";
import React, { useEffect, useState } from 'react';
import { Textarea } from '~/components/ui/textarea';
import { Button } from "~/components/ui/button";
import { RedisLPUSH } from "~/databases/redisQueue";

export default function createNote() {

    // Initial State Set-up
    const[noteContent, setNoteContent] = useState('');
    const[socket, setSocket] = useState<WebSocket | null>(null);
    const[input, setInput] = useState('');

    // Will need to adjust initial state of input when handling notifications of changes
    const sendMessage = () => {
        /*
        if (socket && input.trim()) {
            socket.send(input);
        }
        */
        socket?.send('Hello World!');
    };


    // Functions that call the appropriate functions depending on the message received
    const updateCurUI = () => {
        console.log('Placeholder - case 1 message received');
    };


    // Upon Initial Rendering of this screen, try to establish a connection to the web socket
    useEffect(() => {
        let ws: WebSocket;
        const connect = () => {
            //ws = new WebSocket('wss://http://3.140.100.220:3000/');
            ws = new WebSocket('wss://echo.websocket.events/');
            
            setSocket(ws);
            
            ws.onopen = () => {
                console.log('WebSocket connection opened');
            };

            // When a message is received
            ws.onmessage = (event) => {
                console.log('Received message:', event.data); // Debugging
                switch(event.data) {
                    case 'MSG_1':
                        updateCurUI();
                        break;
                    default:
                        console.log('Message Received From Host cannot be understood to apply an event change');
                        break;
                }
            };
    
            ws.onclose = () => {
                console.log('WebSocket connection closed');
            };
    
            ws.onerror = (error) => {
                console.error('WebSocket error:', error);
            };
    
            // Cleanup WebSocket connection on unmount
            return () => {
                ws.close();
            };

        };
    
        connect();
    
        return () => ws.close();
    }, []);

    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}
        >
            <Button 
                style={{ backgroundColor: 'white' }}
                //onPress={ () => RedisLPUSH() }
                onPress={ () => sendMessage() }
            >
                <Text>
                    Test Socket Connection
                </Text>
            </Button>
            
            <Text>Content</Text>
            <Textarea
                value={noteContent}
                onChangeText={setNoteContent}
            />
            
            
        </View>
    );
}
