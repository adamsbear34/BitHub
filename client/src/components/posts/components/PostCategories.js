import React, {Fragment, useState, useEffect} from 'react'
import PropTypes from 'prop-types'




//Material UI
import { makeStyles } from '@material-ui/core/styles';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';


const PostCategories = ({categories, current_categories, getUpdatedData }) => {
  

    //Categories check state
    const [checked, setChecked] = useState([]);



    /*
    * UseEffect   
    * Display all the categories
    */
    useEffect(() => {
        if (current_categories.length === 0 ){
            setChecked([]);
            return;
        }
        current_categories.map((c) => (
            setChecked(checked => [...checked, c._id])
        ));
    },[current_categories]);


    /*
    * handleCheck  
    * handling category select
    */
    const handleCheck = (c) => () =>  {
        const checkCategory = checked.indexOf(c);
        const all = [...checked];
        if (checkCategory == -1){
            all.push(c);
        }else {
            all.splice(checkCategory, 1);
        }
        setChecked(all);
    };

    /*
    * UseEffect   
    * returning selected categories to 
    * parent component
    */
    useEffect(() => {
        getUpdatedData({categories: checked});
    },[handleCheck]);
    

//Display all categires
const showCategories = () => {
    return (
        categories.map((c, i) => (
            <FormControlLabel
                key={c._id}
                control={
                <Checkbox
                    name={c.slug}
                    color="primary"
                    key={i}
                    value={c._id}
                    checked={checked.includes(c._id) ? true : false}
                    onChange={handleCheck(c._id)}
              />
            }
            label={c.name}
          />
        ))
    )
};
   
   
    return (
        <Fragment>
            {showCategories()}   
        </Fragment>
    )
}

PostCategories.propTypes = {
    categories: PropTypes.array.isRequired,
    current_categories: PropTypes.array.isRequired,
    getUpdatedData: PropTypes.func.isRequired,
}

export default PostCategories
