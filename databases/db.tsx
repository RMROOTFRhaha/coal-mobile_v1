import * as SQLite from 'expo-sqlite';

/*
FAIR WARNING:
According to the documentation, the functions used to execute queries may be prone to SQL injection.
This means in the final version of the following code MUST be user-sanitized when taking in user input.
*/


// Note type specified to unwrap data catered to the "notes" table
export type note = {
  description: string;
  id: number;
  name: string;
}

// Shared Database Instance - Depreciated this as the database will just be called to be opened by each of the CRUD functions
/*
let dbInstance: SQLite.SQLiteDatabase | null = null; // Will Initially Be Null & Setups with the initializeTheDB function

export const initializeTheDB = async () => {
  if(!dbInstance) { //if the instance does not already exist, create it
    dbInstance = await SQLite.openDatabaseAsync('coalite');
    dbInstance.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, description TEXT NOT NULL);
    `);
  }
  return dbInstance;
};

export const initializeTheDB = async () => {
  try {
    const db = await SQLite.openDatabaseAsync('coalite');
    return db;
  } catch (error) {
    console.error("Failed to initialize the database", error);
    return null; // Not the most graceful way to handle it
  }
}
*/

// CRUD Functions
// Can be optimized better by making a function to just initialize the table for the database instead of doing it in each CRUD function
// Can be optimized better by utilizing the runAsync() function when doing write operations instead of using the bulk query executor function execAsync() function
export const getData = async () => {
  try {
    const theDB = await SQLite.openDatabaseAsync('coalite');
    //const theDB = initializeTheDB(); // Ignore depreciated function

    await theDB.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, description TEXT NOT NULL);
    `);

    const result = await theDB.getAllAsync('SELECT * FROM notes');
    //console.log(result); // For Debugging

    // Casting result to explain to code what this unknown[] type actually is
    const notes: note[] = result as note[];
    for (const aNote of notes) {
      console.log(aNote.id, aNote.name, aNote.description);
    }

    theDB.closeAsync(); 

    return result as note[];
    } catch (error) {
      console.error("Error Fetching Data from SQLite Database");
      return []
  }
};

export const createANote = async (usrInput1: string, usrInput2: string) => {
  try {
    const theDB = await SQLite.openDatabaseAsync('coalite')

    await theDB.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, description TEXT NOT NULL);
    `);

    //await theDB.runAsync('INSERT INTO notes (name, description) VALUES ($noteName, $noteDesc)', { $noteName: usrInput1, $noteDesc: usrInput2 }); // From expo-sqlite documenttaion bind parameter - not viable
    //Generic INSERT Test SQL Command: INSERT INTO notes (name, description) VALUES ('GenericNote', 'This is a note')
    
    // Debugging - Check user input
    //console.log(usrInput1);
    //console.log(usrInput2);

    //const sqlcommand = "INSERT INTO notes (name, description) VALUES ('TestInsert', 'Hello World')"; // Test SQL Command
    const sqlcommand = "INSERT INTO notes (name, description) VALUES ('" + usrInput1 + "', '" + usrInput2 + "')";
    await theDB.runAsync(sqlcommand); 

    theDB.closeAsync(); 

  } catch (error) {
      console.error("Error Creating a Note to SQLite Database");
  }
};

export const deleteANote = async (usrInput: string) => {
  try {
    const theDB = await SQLite.openDatabaseAsync('coalite');

    await theDB.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, description TEXT NOT NULL);
    `);

    //await theDB.runAsync('DELETE FROM notes WHERE id = $value', { $value: usrInput}); // From expo-sqlite documentation bind parameter - not viable
    const sqlcommand = 'DELETE FROM notes WHERE id = ' + usrInput;
    await theDB.runAsync(sqlcommand); 

    // Debugging
    //console.log(usrInput);
    //console.log(sqlcommand);

    theDB.closeAsync(); 
    
  } catch (error) {
      console.error("Error Deleting a Note in SQLite Database")
  }
};

export const updateANote = async (usrInput1: string, usrInput2: string) => {
  try {
    const theDB = await SQLite.openDatabaseAsync('coalite');

    await theDB.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS notes (id INTEGER PRIMARY KEY NOT NULL, name TEXT NOT NULL, description TEXT NOT NULL);
    `);

    // Debugging - Check user input
    console.log(usrInput1);
    console.log(usrInput2);

    //await theDB.runAsync('UPDATE notes SET description = $desValue WHERE id = $idValue', { $desValue: usrInput1, $idValue: usrInput2 }); // From expo-sqlite documentation bind parameter - not viable
    const sqlcommand = 'UPDATE notes SET description="' + usrInput2 +'" WHERE id=' + usrInput1;
    await theDB.runAsync(sqlcommand); 

    theDB.closeAsync(); 
    
  } catch (error) {
      console.error("Error Deleting a Note in SQLite Database")
  }
};

