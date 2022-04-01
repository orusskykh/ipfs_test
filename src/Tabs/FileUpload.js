import React, {useCallback, useState} from 'react'
import {useDropzone} from 'react-dropzone'
import { create } from "ipfs-http-client";


import { Buffer } from 'buffer'
const client = create('https://ipfs.infura.io:5001/api/v0');

const FileUpload = ({addItems}) => {

  const [curretnFiles, setCurrentFiles] = useState(null)
  const [isLoading, setIsLoading] = useState(false)
  const onDrop = useCallback((acceptedFiles) => {
    setCurrentFiles(acceptedFiles)
  }, [])

  const uploadFiles = () => {
    setIsLoading(true)
    let results = []
    curretnFiles.forEach((file, i) => {
      const reader = new FileReader()
      reader.onabort = () => console.log('file reading was aborted')
      reader.onerror = () => console.log('file reading has failed')
      reader.onload = async () => {
        const binaryStr = reader.result
        const buffer = Buffer.from(binaryStr)
        try {
          const created = await client.add(buffer);
          results.push(created)
        } catch (error) {
          console.log(error.message);
        }
        if (i+1 === curretnFiles.length) {
          setIsLoading(false)
          setCurrentFiles(null)
          addItems(results)
        }
        // ipfs_js implementation come with some errors
        // ipfs.add(buffer, (error, response) => {
        //   if (error){
        //     console.log(error)
        //     return
        //   }
        //   addItem(response[0])
        //   return setCurrentFile(null)
        // })
      }
      reader.readAsArrayBuffer(file)
    })
  }

  const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop})

  return (
    <div className="m-4">
      <div className="credit-card p-4 w-full lg:w-1/2 sm:w-auto shadow-lg mx-auto rounded-xl bg-white">
      <div {...getRootProps()} className=" w-full dropZone-container text-slate-700">
        <input {...getInputProps()} />
        {
          isDragActive ?
            <p>Drop the files here ...</p> :
            <p>Drag 'n' drop some files here, or click to select files</p>
        }
      </div>

      <div className=" w-full p-4  text-slate-700">
        {isLoading ? <p> LOADING... </p> :
          curretnFiles === null ? <p> select files </p> :
            curretnFiles.map((file) => <p key={file.path}>{ file.path }</p>)}
      </div>

      <button onClick={ uploadFiles }
              disabled={ curretnFiles === null }
              className="input input-bordered p-1 text-slate-700 border-2 border-gray-700 rounded-md block w-full focus:ring focus:outline-none"
      >
        upload
      </button>
      </div>
    </div>

  )
}
export default FileUpload