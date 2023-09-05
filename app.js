import express from "express";
import morgan from "morgan";
import ViteExpress from "vite-express";
import { nanoid } from "nanoid";

const app = express();
const port = "8000";

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));
app.use(express.json());

ViteExpress.config({ printViteDevServerHost: true });

const TEST_DATA = [
  { id: nanoid(), text: "First note!", date: "08/31/2023" },

  { id: nanoid(), text: "Second note!", date: "08/31/2023" },

  { id: nanoid(), text: "Third note!", date: "08/31/2023" },
];

app.get("/api/notes", (req, res) => {
  res.json(TEST_DATA);
});

app.post("/api/notes/:id/delete", (req, res) => {
  let { id } = req.params;

  const index = TEST_DATA.findIndex((note) => note.id === id);
  TEST_DATA.splice(index, 1);
  res.json(TEST_DATA);
});

app.post("/api/notes", (req, res) => {
  const { text, date } = req.body;

  const newItem = {
    id: nanoid(),
    text,
    date,
  };

  TEST_DATA.push(newItem);
  res.json(TEST_DATA);
});

app.post("/api/notes/:id/edit", (req,res)=>{
    let {id} = req.params
    let {text, date} = req.body

    const index = TEST_DATA.findIndex((note) =>note.id === id)
    const notes = TEST_DATA[index]

    notes.text = text ?? notes.text
    notes.date = date ?? notes.date

    console.log(TEST_DATA)
    res.json(TEST_DATA)
})

ViteExpress.listen(app, port, () =>
  console.log(`Listening on http://localhost:${port}`)
);
