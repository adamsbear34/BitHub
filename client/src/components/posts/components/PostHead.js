import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types'


//Material UI
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import CssBaseline from "@material-ui/core/CssBaseline";
import Button from "@material-ui/core/Button";

//CSS
const useStyles = makeStyles((theme) => ({

    postCoverImage:{
        width: "100%"
    },
    btn_upload: {
        marginBottom: theme.spacing(3),
    }

}));

const PostHead = ({current_image, getUpdatedData }) => {
    const classes = useStyles();
    const [updated_image, setImage ] = useState();
    const [selectedFile, setSelectedFile] = useState();
    

    useEffect(() => {
        if (!selectedFile){
            setImage(current_image);
            return;
        }
        const objectUrl = URL.createObjectURL(selectedFile);
        setImage(objectUrl);
        getUpdatedData({ image: selectedFile});

        return () => URL.revokeObjectURL(objectUrl);

    }, [selectedFile]);



    const handleImageUpload = e => {
        if (!e.target.files || e.target.files.length === 0) {
            setSelectedFile(undefined);
            return;
        }
        setSelectedFile(e.target.files[0]);
    };

    return (
        <Fragment>
            <div
                style={{
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
            >
             
                <img src={updated_image} className={classes.postCoverImage} />      
            </div>
            <Button
            variant="contained"
            color="primary"
            component="label"
            className={classes.btn_upload}
            >
            <input 
            type="file"
            accept="image/*"
            onChange={e => handleImageUpload(e)}
            hidden
            />
                Upload Image
            </Button>
        </Fragment>
    )
}

PostHead.propTypes = {
    current_image: PropTypes.string.isRequired,
    getUpdatedData: PropTypes.func.isRequired,
}

export default PostHead
