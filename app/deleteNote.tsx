import {Text, View} from "react-native";
import React, { useEffect, useState } from 'react';
import { Textarea } from '~/components/ui/textarea';
import { Button } from "~/components/ui/button";
import { deleteANote } from '../databases/db';

export default function deleteNote() {

    // Initial State Set-up
    const [value, setValue] = useState('');

    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}
        >
            
            <Text>Delete Note By ID</Text>
            <Textarea
                value={value}
                onChangeText={setValue}
            />
            <Button 
                style={{ backgroundColor: 'white' }}
                onPress={ () => deleteANote(value) }
            >
                <Text>
                    Confirm
                </Text>
            </Button>
            
        </View>
    );
}