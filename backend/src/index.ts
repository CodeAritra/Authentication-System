import express from "express";

const app = express();
app.use(express.json());

app.use("/", (req: express.Request, res: express.Response) => {
  res.send("hii");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`App is running at http://localhost:${PORT}`);
});
