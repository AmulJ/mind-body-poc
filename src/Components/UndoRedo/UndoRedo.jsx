import { useState } from "react";
import "./UndoRedo.css"

// Have two array to control undo/ redo operations
const undoArray = [];
const redoArray = [];

const UndoRedo = () =>{
    const [text, setText] = useState('');

    // On every text change, update undo array
    const textChangeHanlder = (text) => {
        if(undoArray.length === 10){
            undoArray.shift()
            undoArray.push(text);
            setText(text);
        }
        else {
            undoArray.push(text);
            setText(text);
        }
    }

    // When undo is clicked, check if it has values and pop the last item from undo array and push it into the redo array
    // set text with last item of undo array
    const undoClickHandler = () => {
        if(undoArray.length) { 
            const lastItem = undoArray.pop()
            redoArray.push(lastItem)
            if(undoArray.length) {
                const lastItemToBeUsed = undoArray[undoArray.length - 1];
                setText(lastItemToBeUsed)
            }
            // Update this logic to handle max 10 last items
            else {
                setText("")
            }
        }
    }

    // When redo is clicked, check if it has values and pop the last item from redo array nd push it in undo array
    // set text with last item of redo array
    const redoClickHandler = () => {
        if(redoArray.length) {
            const lastItem = redoArray.pop()
            undoArray.push(lastItem)
            setText(lastItem)
        }
    }

    return <div className="undo-redo-parent">
        <input className="text-field" type={"text"} value={text} onChange={(e)=>textChangeHanlder(e.currentTarget.value)}></input>
        <div className="button-container">
            <button className="undo-redo-button" onClick={undoClickHandler}>Undo</button>
            <button className="undo-redo-button" onClick={redoClickHandler}>Redo</button>
        </div>
    </div>
}

export default UndoRedo;