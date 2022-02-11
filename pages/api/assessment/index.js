import axios from "axios";
import db from "../../../database";

export default async (req, res) => {
  try {
    const { slug } = req.body;

    const entries = await db.collection("assesment").get();

    if (req.method == "GET") {
      const entriesData = entries.docs.map((entry) => entry.data());

      res.status(200).json({ entriesData });
    } else if (req.method == "POST") {
      const entriesData = entries.docs.map((entry) => entry.data());

      const { id } = await db
        .collection("assesment")

        .add({
          ...req.body,
          created: new Date().toISOString(),
        });
      res.status(200).json({ id });
    }
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};
