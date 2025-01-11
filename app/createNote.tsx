import {Text, View} from "react-native";
import React, { useEffect, useState } from 'react';
import { Textarea } from '~/components/ui/textarea';
import { Button } from "~/components/ui/button";
import { createANote } from '../databases/db';

export default function createNote() {

    // Initial State Set-up
    const[noteName, setNoteName] = useState('');
    const[noteContent, setNoteContent] = useState('');


    return (
        <View style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        }}
        >
            <Button 
                style={{ backgroundColor: 'white' }}
                onPress={ () => createANote(noteName, noteContent) }
            >
                <Text>
                    Save Note
                </Text>
            </Button>
            <Text>Name Your Note</Text>
            <Textarea
                value={noteName}
                onChangeText={setNoteName}
            />
            <Text>Content</Text>
            <Textarea
                value={noteContent}
                onChangeText={setNoteContent}
            />
            
            
        </View>
    );
}