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



const TextEditor = ({currentBody, getUpdatedData}) => {
    const classes = useStyles();

    //Body state
    const [body, setBody] = useState(currentBody);


    /*
    * UseEffect  
    * Setting body state    
    * 
    */
    useEffect(() => {
        setBody(currentBody);
    }, [currentBody]);

    //Text Editor Params
    const modules = {
        toolbar: [
          [{ 'header': [1, 2, false] }],
          ['bold', 'italic', 'underline','strike', 'blockquote'],
          [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
          ['link'],
          ['clean']
        ],
      };
  
   const formats = [
        'header',
        'bold', 'italic', 'underline', 'strike', 'blockquote',
        'list', 'bullet', 'indent',
        'link'
      ] 
    
    
    /**
     * 
     * @param {*} e
     * Setting body state from the input 
     */  
    const handleBody = (e) =>{
        setBody(e);
    };

    /**
     * UseEffect
     * Sending body to the parent componet
     */
    useEffect(() => {
        getUpdatedData({body: body});
    }, [handleBody]);

    return (
        <Fragment>
            <ReactQuill 
                value={body} 
                defaultValue={body} 
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
    getUpdatedData: PropTypes.func.isRequired,

}
export default TextEditor
