import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types';
import { Bar } from 'react-chartjs-2';



//Material UI 
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

//CSS 
const useStyles = makeStyles((theme) => ({
    summaryCard: {
        margin: 0,
        marginTop: theme.spacing(1),
        flexGrow: 1,
        padding: theme.spacing(3),
        backgroundColor: theme.palette.primary.main
    },
    summaryChart: {
        margin: 0,
        marginTop: theme.spacing(1),
        flexGrow: 1,
        padding: theme.spacing(3),
    }
}));


export function SummaryCard({ title, value, component }) {
    const classes = useStyles();

    return (
      <Paper elevation={3} className={classes.summaryCard} >
        <Typography color={"secondary"} variant="h6" align={"center"} gutterBottom>
          {title}
        </Typography>
        {component || (
          <Typography color={"secondary"} variant="h3" align={"center"}>
            {value}
          </Typography>
        )}
      </Paper>
    );
  }


export function BarChart({ data, title, label }){
    const classes = useStyles();

    return (
        <Paper elevation={12} className={classes.summaryChart}>
            <Typography color={"primary"} variant="h5" gutterBottom>
                    {title}
            </Typography>
            <Bar
                data={{
                    labels: data.lables,
                    datasets: [
                        {
                        label: label,
                        data: data.data
                        },
                    ],
                }}
                height={100}
                width={300}
                options={{
                   
                }}
            />

            
        </Paper>
    );
};


const StatsLyaout = ({data: {total_views, total_vote_count, single_posts_views_stats, single_posts_votes_stats}}) => {
    const classes = useStyles();
    

    const formatData = (dataObjcet) => {
        var lables = [],
            data = [],
            dataSet = {};
        Object.entries(dataObjcet).forEach(([key, val]) => {
            lables.push(key);
            data.push(val);
        });

        dataSet.lables = lables;
        dataSet.data = data;

        return dataSet;
    };


    const postsViews = formatData(single_posts_views_stats);
    const postsVotes = formatData(single_posts_votes_stats);

    return (
        <Fragment>
            <Grid item container xs spaincing={1}>
                <SummaryCard title={"Views"} value={total_views} />
                <SummaryCard title={"Votes"} value={total_vote_count} />
                <Grid item xs={12}>
                    <BarChart   data={postsViews} title={"Most Viwed Articles"} label={"# of Views"} />
                </Grid>
                <Grid item xs={12}>
                    <BarChart  data={postsVotes} title={"Most Voted Articles"} label={"# of Votes"} />
                </Grid>
                
            </Grid>
        </Fragment>
    )
}

StatsLyaout.propTypes = {
    data: PropTypes.object.isRequired,
}

export default StatsLyaout
