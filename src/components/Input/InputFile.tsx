import React, {useState } from "react";
import XLSX from 'xlsx';
import './style.css';

export default function InputFile() {
    const [dragging,setDragging] = useState<boolean>(false);


    const handleDragEnter = (e:React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(true);
    }

    const handleDragLeave = (e:React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragging(false);
    }

    const handleDragOver = (e:React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }

    const handleDrop = (e:React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        if(e.dataTransfer.files && e.dataTransfer.files.length >0) {
            fileHandler(e.dataTransfer.files);
        }
        e.dataTransfer.clearData();
        setDragging(false);
    }

    const fileHandler = (files: FileList) => {
        const file = files[0];
        if(!(file instanceof File))
            return;
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = (e) => {
            const bufferArray = e.target?.result;
            const wb = XLSX.read(bufferArray, {type: 'buffer'});

            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws);

            console.log(data);
        }
    }

    return (
        <div className={dragging?'input-dragging input':'input'}
            onDragEnter={handleDragEnter}
            onDragLeave ={handleDragLeave} 
            onDrop={handleDrop} 
            onDragOver={handleDragOver}>
                
            파일을 올려주세요.
        </div>
    )
}