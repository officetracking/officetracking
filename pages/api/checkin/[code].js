import axios from "axios";

import db from "../../../database";
export default async (req, res) => {
  try {
    const { slug } = req.body;
    const { code } = req.query;
    const entries = await db.collection("checkin").get();

    if (req.method == "GET") {
      //  res.status(200).json();
      const employee = await db
        .collection("checkin")
        .where("code", "==", code)
        .get();

      const entriesData = employee.docs.map((entry) => entry.data());
      if (!entriesData.length > 0) {
        res.status(404).end();
      } else {
        res.status(200).json({ entriesData });
      }
    } else if (req.method == "DELETE") {
      const employee = db.collection("checkin").where("code", "==", code);
      employee.get().then(function (querySnapshot) {
        querySnapshot.forEach(function (doc) {
          doc.ref.delete();
        });
      });

      res.status(200).json();
    }
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};
