// Method for POST requests
export const postData = async (usrInput1: string, usrInput2: string) => { //accepts two parameters to specify what info the new note will have
    try  {
        await fetch('http://3.140.100.220:3000/api/v1/notes/newnote', {
            method: 'POST',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              noteTitle: usrInput1,
              noteDescription: usrInput2,
            }),
          });
    } catch (error) {
        console.error("There was an error: ", error);
    }
};


// Method for GET requests
export const getData = async () => {
    try {
        const response = await fetch('http://3.140.100.220:3000/api/v1/notes/allnotes');
        const json = await response.json();
        return json;
    } catch (error) {
        console.log("There was an error: ", error);
        return null;
    }
};

// Method for PUT requests
export const updateData = async (noteID: string, usrInput1: string, usrInput2: string) => { //accepts two parameters to specify what will be changed
    try  {
        const api_url = 'http://3.140.100.220:3000/api/v1/notes/updatenote/' + noteID;
        await fetch(api_url, {
            method: 'PUT',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              noteTitle: usrInput1,
              noteDescription: usrInput2,
            }),
          });
    } catch (error) {
        console.error("There was an error: ", error);
    }
};

// Method for DELETE request
export const deleteData = async (noteID: string) => { //accepts one parameter to delete a note by id
    
    try  {
        const api_url = 'http://3.140.100.220:3000/api/v1/notes/deletenote/' + noteID;
        fetch(api_url, {
            method: 'DELETE',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json',
            },
          });
    } catch (error) {
        console.error("There was an error: ", error);
    }
    
    /*
    try {
        await fetch('http://3.140.100.220:3000/api/v1/notes/deletenote/id');
    } catch (error) {
        console.log("There was an error: ", error);
    }
    */
};