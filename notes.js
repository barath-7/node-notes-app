const fs = require("fs");
const chalk = require("chalk");

const loadNotes = () => {
  try {
    let dataBuffer = fs.readFileSync("notes.json");
    let jsonData = dataBuffer.toString();
    let data = JSON.parse(jsonData);
    return data;
  } catch (error) {
    console.log("inside catch block");
    return [];
  }
};

const addNote = (title, body) => {
  let notes = loadNotes();
  let isDuplicate = notes.find((note) => note.title === title);
  if (isDuplicate) {
    console.log(chalk.red("Title already exists. Try a different one !"));
    return;
  }

  notes.push({
    title: title,
    body: body,
  });

  saveNote(notes);
  console.log(chalk.green("Note added succesfully!"));
};

const saveNote = (notes) => {
  let data = JSON.stringify(notes);
  fs.writeFileSync("notes.json", data);
};

const removeNote = (title) => {
  let notes = loadNotes();
  let notesToBeRetained = notes.filter((note) => note.title !== title);
  if (notes.length === notesToBeRetained.length) {
    console.log(chalk.inverse.red("Title not found!"));
    return;
  }
  saveNote(notesToBeRetained);
  console.log(chalk.inverse.magenta("Note removed succesfully!"));
};

const listNotes = () => {
  let i = 1;
  let notes = loadNotes();
  console.log(chalk.blue.inverse("Your Notes\n"));
  notes.map((note) => {
    console.log(`${i}. ${note.title}\n`);
    i++;
  });
};

const readNotes = (title) => {
  let notes = loadNotes();
  let noteToBeDisplayed = notes.find((note) => note.title == title);
  if (noteToBeDisplayed === undefined) {
    console.log(chalk.red("No note found, please check your title"));
    return;
  }
  console.log(chalk.bold.underline.green(noteToBeDisplayed.title));
  console.log(`${chalk.blue(noteToBeDisplayed.body)}`);
};

module.exports = { addNote, removeNote, listNotes, readNotes };
