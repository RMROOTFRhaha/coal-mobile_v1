import { Text, View, StyleSheet } from "react-native";
import { useState, useEffect } from 'react';
import { Button } from '~/components/ui/button';
import { Link } from 'expo-router';
import { getData, postData, updateData, deleteData } from '../databases/postgresDB';

export default function testFetch() {

    // Initial State Set-up for API data handling
    const [data, setData] = useState(null);

    // Function to handle imported functions
    const handleGetNotes = async () => {
      const theData = await getData();
      setData(theData);
      console.log(theData); // For Debugging - check the json object
    };

    // Do actions during initial rendering
    useEffect( () => {
      
        
    }, []); 

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      

      <Text>Test Fetch API</Text>
      <Button
        style={{ backgroundColor: 'white' }}
        onPress={ () => handleGetNotes() }
      >
        <Text>Test to get all notes</Text>
      </Button>
      <Button
        style={{ backgroundColor: 'white' }}
        onPress={ () => postData('', '') }
      >
        <Text>Test to make a new note</Text>
      </Button>
      <Button
        style={{ backgroundColor: 'white' }}
        onPress={ () => updateData('', 'changed notes with parameters x3', 'this note was changed with parameters x3') }
      >
        <Text>Test to make an update to note</Text>
      </Button>
      <Button
        style={{ backgroundColor: 'white' }}
        onPress={ () => deleteData('') }
      >
        <Text>Test to delete a note</Text>
      </Button>
      

    </View>
  );
}

const styles = StyleSheet.create({
  
  button: {
    fontSize: 14,
    color: '#000',
  }
});