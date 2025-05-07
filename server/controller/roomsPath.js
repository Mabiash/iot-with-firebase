const { db } = require("../config/firebase.js");

const getRoomsPath = async (req, res) => {
  try {
    const snapshot = await db.collection("roomsPath").get();

    if (snapshot.empty) {
      return res.status(404).send("No roomsPath found");
    }

    const pathData = [];
    snapshot.forEach(doc => {
      pathData.push({ id: doc.id, ...doc.data() });
    });

    res.json({ pathData });
  } catch (error) {
    console.error(error);
    res.status(500).send("Server error");
  }
};

const addRoomPath = async(req, res) => {
  try {
      const data = req.body;
      const snapshot = await db.collection('roomsPath')
      .where('path', '==', data.path)
      .get();

    if (!snapshot.empty) {
      return res.status(400).send({ message: 'Path already exists.' });
    }
      const docRef = await db.collection('roomsPath').add(data);
  
      res.status(200).json({ message: 'Document added', id: docRef.id });
 
    } catch (err) {
      console.error('Error adding document:', err);
      res.status(500).json({ error: 'Failed to add document' });
    }
}

const deleteRoomPath = async (req, res) => {
  try {
    const { path }= req.body;

    const snapshot = await db.collection('roomsPath')
      .where('path', '==', path)
      .get();

    if (snapshot.empty) {
      return res.status(404).json({ msg: "No matching room found." });
    }

    const batch = db.batch();
    snapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    await batch.commit();

    return res.status(200).json({ msg: "Successfully deleted the room!" });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ msg: "Error deleting room.", error: error.message });
  }
}


module.exports = { getRoomsPath, addRoomPath, deleteRoomPath};
