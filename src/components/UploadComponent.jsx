import React from "react";
import { useState } from "react";
import { useMemo } from "react";
import {useDropzone} from 'react-dropzone';
import { useEffect } from "react";




function UploadComponent (props) {
    const [acceptedFiles, setAcceptedFiles] = useState([]);
    const [showUpload, setShowUpload] = useState(true);
  
    
    const {getRootProps, getInputProps, isDragActive, isDragAccept, isDragReject} = useDropzone({
      accept: 'image/jpeg, image/png,',
        onDrop: acceptedFiles => {
        const files = acceptedFiles.map(file => Object.assign(file, {
          preview: URL.createObjectURL(file)
        }));

        setAcceptedFiles(files);
        setShowUpload(false);
        if (props.onFilesAccepted) {
          props.onFilesAccepted(files);          
        }
      }
    });
  
      const activeStyle = {
          borderColor: 'green'
      };
      
      const acceptStyle = {
          borderColor: 'red'
      };
      
      const rejectStyle = {
          borderColor: '#ff1744'
      };

      const dragAreaColor = useMemo(() => {
        return {
          ...(isDragActive ? activeStyle : {}),
          ...(isDragAccept ? acceptStyle : {}),
          ...(isDragReject ? rejectStyle : {}),
        };
      }, [isDragActive, isDragAccept, isDragReject]);
  
      const style = useMemo(() => ({
          ...(isDragActive ? activeStyle : {}),
          ...(isDragAccept ? acceptStyle : {}),
          ...(isDragReject ? rejectStyle : {})
      }), [
          isDragActive,
          isDragAccept,
          isDragReject
      ]);
  
      const files = acceptedFiles.map(file => (
          <li key={file.path}>
              {file.path}
          </li>
      ));

      
      useEffect(() => {
        return () => {
          acceptedFiles.forEach((file) => URL.revokeObjectURL(file.preview));
        };
      }, [acceptedFiles]);
    
      const images = acceptedFiles.map((file) => (
        <div key={file.path}>
          <img className="max-w-[150px] max-h-[100px]"  src={file.preview} alt="preview" />
        </div>
      ));


      // preview image 
      const thumbsContainerClasses = "flex flex-row flex-wrap align-center  items-center justify-center";
      const thumbClasses = "inline-flex border rounded border-black  mb-8 mr-8 w-24 h-20 p-1 box-border";
      const thumbInnerClasses = "flex items-center justify-center w-full h-full overflow-hidden flex-col";
      const imgClasses = "flex object-cover w-full h-full align-center justify-center text-center";




      const thumbs = files.map(file => (
        <div className={thumbClasses} key={file.name}>
        <div className={thumbInnerClasses}>
          <img
            src={file.preview}
            className={imgClasses}
            onLoad={() => { URL.revokeObjectURL(file.preview) }}
          />
        </div>
      </div>
    ));



      useEffect(() => {
        return () => files.forEach(file => URL.revokeObjectURL(file.preview));
      }, []);

    return (
      <div className="flex flex-col border-2 rounded-lg border-dashed border-black justify-center mx-8 md:mx-0 mt-6 h-40 bg-neutral-200" {...getRootProps({style: {...dragAreaColor, ...style}})}>
            <div className="flex justify-center"> 
                <input {...getInputProps()} />         
                    <div className="flex flex-row  items-center justify-center">
                        {showUpload && (
                            <div className="mt-8 md:mt-1 text-center md:text-left md:mx-0 md:w-full lg:h-full flex flex-col items-center justify-center">
                              <form className="w-[80%]"></form>
                                <button className="text-md text-gray-400 underline justify-end">Click to upload</button>
                              <span className="text-md text-gray-400">or drag and drop</span>
                              <div className="text-gray-400 w-10 h-10 m-2">
                                <img src="./Images/uploadd.png" alt="Descrição da imagem" />
                              </div>
                            </div>
                        )}
                    </div>

                <aside className={thumbsContainerClasses} >
                    {images}
                </aside>
            </div>
      </div>
    )
}

export default UploadComponent;