import React, { Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


//Material UI
import { makeStyles } from '@material-ui/core/styles';



//CSS
const useStyles = makeStyles((theme) => ({

    richTextEditor: {
        height: "100%"
    }

}));



const TextEditor = ({currentBody, sentUpdatedBody}) => {
    const classes = useStyles();

    const [body, setBody] = useState("");

    useEffect(() => {

        if (currentBody == null){
            return;
        }

        setBody(currentBody);
    }, [setBody]);

    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link', 'image'],
          ['clean']
        ],
      }

   const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link', 'image'
      ] 
    
      
    const handleBody = (e) =>{
        setBody(e);
        sentUpdatedBody(body);
    }


    return (
        <Fragment>
            <ReactQuill 
                value={body} 
                defaultValue={currentBody} 
                className={classes.richTextEditor}
                modules={modules}
                formats={formats}
                onChange={handleBody}
            />
        </Fragment>
            
    )
}

TextEditor.propTypes = {
    currentBody: PropTypes.string.isRequired,
    sentUpdatedBody: PropTypes.func.isRequired,

}
export default TextEditor
