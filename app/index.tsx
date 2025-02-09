import { Text, View, StyleSheet } from "react-native";
import { Button } from '~/components/ui/button';
import { Link } from 'expo-router';

export default function Index() {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Dashboard (CRUD Operations)</Text>
      <Link href="/createNote" style={styles.button}>Create A Note</Link>
      <Link href="/viewNotes" style={styles.button}>View All Notes In List</Link>
      <Link href="/openedNote" style={styles.button}>Edit A Note</Link>
      <Link href="/deleteNote" style={styles.button}>Delete A Note</Link>

      <Link href="/testFetch" style={styles.button}>Test the fetch API</Link>
      <Link href="/testWebSocket" style={styles.button}>Test Redis & WebSockets</Link>

      <Link href="/textEditor" style={styles.button}>Test Text Editor</Link>

    </View>
  );
}

const styles = StyleSheet.create({
  
  button: {
    fontSize: 14,
    color: '#000',
  }
});