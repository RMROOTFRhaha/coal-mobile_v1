import {Text, View} from "react-native";
import React, { useEffect, useState } from 'react';
import { Textarea } from '~/components/ui/textarea';
import { Button } from "~/components/ui/button";
import { updateANote } from "~/databases/db";

export default function openedNote() {

    // Initial State Set-up
    const[noteID, setNoteID] = useState('');
    const[updatedDesc, setUpdatedDesc] = useState('');

    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}
        >


            <Button 
                style={{ backgroundColor: 'white' }}
                onPress={ () => updateANote(noteID, updatedDesc) }
            >
                <Text>
                    Confirm
                </Text>
            </Button>
            <Text>Choose Note By ID to Rewrite!</Text>
            <Textarea
                value={noteID}
                onChangeText={setNoteID}
            />
            <Text>Rewrite Your Note Below!</Text>
            <Textarea
                value={updatedDesc}
                onChangeText={setUpdatedDesc}
            />
            
            
        </View>
    );
}