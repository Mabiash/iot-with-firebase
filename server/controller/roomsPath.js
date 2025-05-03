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



module.exports = getRoomsPath;
