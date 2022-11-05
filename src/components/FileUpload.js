import React, { Fragment, useEffect, useRef, useState } from 'react';
import Message from './Message';
import Progress from './Progress';
import axios from 'axios';
import { Contextstate } from '../config';

const FileUpload = (props) => {
  const [file, setFile] = useState('');
  const [filename, setFilename] = useState('');
  const [uploadedFile, setUploadedFile] = useState({});
  const [message, setMessage] = useState('');
  const [uploadPercentage, setUploadPercentage] = useState(0);
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const {click, setClick} = Contextstate();

  const titleInputRef = useRef();
  const descriptionInputRef = useRef();

  const onChange = e => {
    setFile(e.target.files[0]);
    // console.log(e.target.files[0]);
    setFilename(e.target.files[0].name);
  };

  const onSubmit = async e => {
    e.preventDefault();

    const enteredTitle = title;
    const enteredDescription = desc;

    // props.addData(enteredTitle,enteredDescription);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await axios.post('/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        },
        onUploadProgress: progressEvent => {
          setUploadPercentage(
            parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            )
          );
        }
      });

      useEffect(() => {
        const id = setTimeout(() => {
          setUploadPercentage(0)
          setClick(false);
        }, 5000);
      
        return () => {
          clearTimeout(id);
        }
      }, [click])
      
      

      const { fileName, filePath } = res.data;

      setUploadedFile({ fileName, filePath });

      setMessage('File Uploaded');
    } catch (err) {
      if (err.response.status === 500) {
        setMessage('There was a problem with the server');
      } else {
        setMessage(err.response.data.msg);
      }
      setUploadPercentage(0)
    }
  };

  return (
    <Fragment>
      {message ? <Message msg={message} /> : null}
      <form onSubmit={onSubmit}>
        <div className="input-group mb-4 mt-4">
        
          <label className="input-group-text" htmlFor='title'>Title</label>
          <input className="form-control" aria-label="With textarea" onChange={(val)=>setTitle(val)} id='title' ref={titleInputRef}></input>
        </div>

        <div className="input-group input-group-lg mb-4">
          <label className="input-group-text" htmlFor='description'>Description</label>
          <input className="form-control" aria-label="With textarea" onChange={(val)=>setDesc(val)} id='description' ref={descriptionInputRef}></input>
        </div>

        <div className='custom-file mb-4'>
          <input
            type='file'
            className='custom-file-input'
            id='customFile'
            onChange={onChange}
          />
          <label className='custom-file-label' htmlFor='customFile'>
            {filename}
          </label>
        </div>

        <Progress percentage={uploadPercentage} />

        <input
          type='submit'
          value='Upload'
          className='btn btn-primary btn-block mt-4'
        />
      </form>
      {uploadedFile ? (
        <div className='row mt-5'>
          <div className='col-md-6 m-auto'>
            <h3 className='text-center'>{uploadedFile.fileName}</h3>
            <img style={{ width: '100%' }} src={uploadedFile.filePath} alt='' />
          </div>
        </div>
      ) : null}
    </Fragment>
  );
};

export default FileUpload;
