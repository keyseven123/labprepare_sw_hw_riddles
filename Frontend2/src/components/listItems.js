import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import DashboardIcon from '@material-ui/icons/Dashboard';
import InfoTwoToneIcon from '@material-ui/icons/InfoTwoTone';
import AssignmentIcon from '@material-ui/icons/Assignment';
import InfoIcon from '@material-ui/icons/Info';
import HelpIcon from '@material-ui/icons/Help';
import { Link } from 'react-router-dom';

export const mainListItems = (
    <div>
        <Link to="/">
            <ListItem button>
                <ListItemIcon>
                    <DashboardIcon />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
            </ListItem>
        </Link>
        <Link to="/task">
            <ListItem button>
                <ListItemIcon>
                    <AssignmentIcon />
                </ListItemIcon>

                <ListItemText primary="Task" />
            </ListItem>
        </Link>
        <Link to="/hint">
            <ListItem button>
                <ListItemIcon>
                    <HelpIcon />
                </ListItemIcon>
                <ListItemText primary="Hint" />
            </ListItem>
        </Link>
        <Link to="/explanation">
            <ListItem button>
                <ListItemIcon>
                    <InfoIcon />
                </ListItemIcon>
                <ListItemText primary="Explanation" />
            </ListItem>
        </Link>
    </div>
);

export const secondaryListItems = (
    <div>
        <Link to="/about">
            <ListItem button>
                <ListItemIcon>
                    <InfoTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary="About" />
            </ListItem>
        </Link>
    </div>
);