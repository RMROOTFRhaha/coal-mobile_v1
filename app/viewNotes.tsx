import { Text, View, ScrollView, useWindowDimensions } from "react-native";
import React, { useEffect, useState } from 'react';
import { Button } from '~/components/ui/button';
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from '~/components/ui/table';
import { FlashList } from '@shopify/flash-list';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { cn } from '~/lib/utils';
import { deleteANote, getData, note } from '../databases/db';
//import * as SQLite from 'expo-sqlite'; // No longer needed due to its import in databases/db

const MIN_COLUMN_WIDTHS = [120, 120, 120]; //Need to readjust later for number of columns

export const viewNotes = () => {
    
    // Initial State Set-Up
    const [data, setData] = useState<note[]>([]); 

    // Table Set-Up
    const { width } = useWindowDimensions();
    const insets = useSafeAreaInsets();
    const columnWidths = React.useMemo(() => {
        return MIN_COLUMN_WIDTHS.map((minWidth) => {
            const evenWidth = width / MIN_COLUMN_WIDTHS.length;
            return evenWidth > minWidth ? evenWidth : minWidth;
        });
    }, [width]);

    // Handle State Changes that utilize SQLite API
    const handleGetNotes = async () => {
        const theNotes = await getData();
        setData(theNotes);
    }

    // Handle State Change after deleting a note
    const handleDeleteANote = async (noteID: string) => {
        await deleteANote(noteID);
        const updatedNoteList = await getData();
        setData(updatedNoteList);
    }

    // The ViewNotes Component
    return (
        <ScrollView horizontal bounces={false} showsHorizontalScrollIndicator={false}>
            <Text>Your Existing Notes</Text>
            <Button onPress={ () => handleGetNotes() }>
                <Text>
                    Click me to see notes
                </Text>
            </Button>
            <Table aria-labelledby='notes-table'>
                <TableHeader>
                    <TableRow>
                        <TableHead className='px-0.5' style={{ width: MIN_COLUMN_WIDTHS[0]}}>
                            <Text>ID</Text>
                        </TableHead>
                        <TableHead className='px-0.5' style={{ width: MIN_COLUMN_WIDTHS[1]}}>
                            <Text>Name</Text>
                        </TableHead>
                        <TableHead className='px-0.5' style={{ width: MIN_COLUMN_WIDTHS[2]}}>
                            <Text>Description</Text>
                        </TableHead>
                    </TableRow>
                </TableHeader>

                <TableBody>
                    <FlashList
                        data={data}
                        estimatedItemSize={45}
                        contentContainerStyle={{
                        paddingBottom: insets.bottom,
                        }}
                        showsVerticalScrollIndicator={false}
                        renderItem={({ item: note, index }) => {
                            return (
                                <TableRow
                                    key={note.id}
                                    className={cn('active:bg-secondary', index % 2 && 'bg-muted/40 ')}
                                >
                                    <TableCell style={{ width: columnWidths[0] }}>
                                        <Text>{note.id}</Text>
                                    </TableCell>
                                    <TableCell style={{ width: columnWidths[0] }}>
                                        <Text>{note.name}</Text>
                                    </TableCell>
                                    <TableCell style={{ width: columnWidths[1] }}>
                                        <Text>{note.description}</Text>
                                    </TableCell>
                                </TableRow>
                            );
                        }}
                    />
                </TableBody>
            </Table>
        </ScrollView>
    );
}

export default viewNotes;