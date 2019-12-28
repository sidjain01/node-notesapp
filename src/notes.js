const fs=require('fs')
const chalk = require('chalk')
const addNote =(title,body) => {
    const notes=loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)
    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })
        saveNotes(notes)
        console.log(chalk.green.inverse('New note added!'))
    }else{
        console.log(chalk.red.inverse('Note title taken!'))
    }
}

const saveNotes =(notes) => {
    const dataJSON = JSON.stringify(notes)
    fs.writeFileSync('notes.json',dataJSON)
}

const loadNotes = function(){
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    }catch(e){
        return []
    }
}

const removeNote =(title) => {
    const notes = loadNotes()
    const notesToKeep=notes.filter((note) => note.title!==title)
    if(notes.length>notesToKeep.length){
        console.log(chalk.green.inverse('Note removed!'))
        saveNotes(notesToKeep)
    }else{
        console.log(chalk.red.inverse('No such note exist!'))
    }
}
const listNotes=() => {
    console.log(chalk.yellow.inverse('Your notes..!'))
    const notes=loadNotes()
    notes.forEach((note) => {
        console.log(note.title)
    });
}
const readNote=(title) => {
    const notes=loadNotes()
    const reqNote=notes.find((note) => note.title===title)
    if(reqNote){
        console.log(chalk.white.inverse(reqNote.title))
        console.log(reqNote.body)
    }else{
        console.log(chalk.red.inverse('No such note exists!'))
    }
}
module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}