import { ST } from "next/dist/shared/lib/utils";
import "../global.css";
import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: 'Dashboard' }} />
      <Stack.Screen name="viewNotes" options={{ title: 'Your Notes' }} />
      <Stack.Screen name="createNote" options={{ title: 'Note Creation In Progress' }} />
      <Stack.Screen name="openedNote" options={{title: 'Note Edit In Progress'}} />
      <Stack.Screen name="deleteNote" options={{title: 'Note Deletion In Progress'}} />
      <Stack.Screen name="testFetch" options={{title: 'Test Fetch API'}} />
    </Stack>
    );
}
