import React, { useEffect, useState, useMemo } from "react";
import { useDropzone } from "react-dropzone";
import { styles } from "../../utils/DndStyles";

export default function DragnDrop({ form, editable, oldImg }) {
  const [files, setFiles] = useState([]);
  const oldImgHash = oldImg.split("ipfs://");
  if(files.length>0){
    editable=false;
  }


  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: {
        "image/*": [],
      },
      onDrop: (acceptedFiles) => {
        setFiles(
          acceptedFiles.map((file) =>
            Object.assign(file, {
              preview: URL.createObjectURL(file),
            })
          )
        );
      },
    });

  const thumbs = files.map((file) => (
    <div style={styles.thumb} key={file.name}>
      <div style={styles.thumbInner}>
        <img
          src={file.preview}
          style={styles.img}
          // Revoke data uri after image is loaded
          onLoad={() => {
            URL.revokeObjectURL(file.preview);
            form.setValue("multimedia", files);
          }}
        />
      </div>
    </div>
  ));

  useEffect(() => {
    return () =>
      files.forEach((file) => {
        URL.revokeObjectURL(file.preview);
      });
  }, []);

  const style = useMemo(
    () => ({
      ...styles.baseStyle,
      ...(isFocused ? styles.focusedStyle : {}),
      ...(isDragAccept ? styles.acceptStyle : {}),
      ...(isDragReject ? styles.rejectStyle : {}),
    }),
    [isFocused, isDragAccept, isDragReject]
  );

  return (
    <section style={styles.container}>
      <div {...getRootProps({ style })}>
        <input {...getInputProps()} />
        <p className="text-bold ">
          Drag 'n' drop some files here, or click to select files
        </p>
      </div>
      <aside style={styles.thumbsContainer}>
        {editable ? (
          <div style={styles.thumb}>
            <img
              src={`https://ipfs.io/ipfs/${oldImgHash[1]}`}
              style={styles.img}
            />
          </div>
        ) : (
          thumbs
        )}
      </aside>
    </section>
  );
}
