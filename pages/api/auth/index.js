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
      const employee = await db
        .collection("employees")
        .where("username", "==", req.body.username)
        .where("password", "==", req.body.password)
        .get();
      //   entriesData.some((data) => entry.slug === slug

      const entriesData = employee.docs.map((entry) => entry.data());
      res.status(200).json({ entriesData });
      //   if (!entriesData.length > 0) {
      //     res.status(404).json({ message: "username atau password salah" });
      //   } else {
      //     sessionStorage.setItem("isLogin", true);
      //     res.status(200).json({ entriesData });
      //   }

      //   if (
      //     entriesData.some(
      //       (data) =>
      //         (data.username =
      //           req.body.username && data.password == req.body.password)
      //     )
      //   ) {
      //     res.status(200).json({ entriesData });
      //   } else {
      //     res.status(400).json({ entriesData });
      //   }

      //   const { id } = await db
      //     .collection("employees")
      //     .doc(req.body.code)
      //     .set({
      //       ...req.body,
      //       created: new Date().toISOString(),
      //     });
      //   res.status(200).json({ id });
      //   if (entriesData.some((entry) => entry.slug === slug)) {
      //     res.status(400).end();
      //   } else {

      //   }
    }
  } catch (e) {
    console.log(e);
    res.status(400).end();
  }
};
