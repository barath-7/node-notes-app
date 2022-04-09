const chalk = require('chalk')
const yargs = require('yargs')
const {addNote,removeNote,listNotes, readNotes} = require('./notes')








yargs.command({
  command: "add",
  describe: "Add a new note",
  builder:{
      title:{
          describe:'Note title',
          demandOption:true,
          type:'string'
      },
      body:{
          describe:'Body or content of the note',
          demandOption:true,
          type:'string'
      }
  },
  handler: (argv) => {
        addNote(argv.title,argv.body)
  },
})
.command({
    command: "remove",
  describe: "Remove a note",
  builder:{
    title:{
      describe:'Note title to be removed',
      demandOption:true,
      type:'string'
  }
  },
  handler: (argv) => {
    removeNote(argv.title)
  },
})
.command({
    command: "read",
  describe: "Read a note",
  builder:{
    title:{
      describe:'Title of the note to be displayed',
      demandOption:true,
      type:'string'
    }
  },
  handler: (argv) => {
    readNotes(argv.title)
  },
})
.command({
    command: "list",
  describe: "List all notes",
  
  handler: () => {
    listNotes()
  },
})
.argv


