import axios from "axios";
import db from "../../../database";

export default async (req, res) => {
  try {
    const { slug } = req.body;

    const entries = await db.collection("employees").get();

    if (req.method == "GET") {
      const entriesData = entries.docs.map((entry) => entry.data());

      res.status(200).json({ entriesData });
    } else if (req.method == "POST") {
      const entriesData = entries.docs.map((entry) => entry.data());

      if (entriesData.some((entry) => entry.slug === slug)) {
        res.status(400).end();
      } else {
        const { id } = await db
          .collection("employees")
          .doc(req.body.code)
          .set({
            ...req.body,
            created: new Date().toISOString(),
          });
        res.status(200).json({ id });
      }
    }
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};
