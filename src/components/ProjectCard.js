import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

import { getFromParam } from "../utils/utils"

const styles = theme => ({
    button: {
        margin: theme.spacing.unit
    }
});


const Actions = ({ scrapProjects, getProjects, classes }) => (
    <React.Fragment>
        <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => getProjects(getFromParam(1))}
        >
            Reload
    </Button>
        <Button
            className={classes.button}
            variant="outlined"
            onClick={() => scrapProjects(getFromParam(1))}
        >
            Scrap
    </Button>
        <Button
            className={classes.button}
            variant="contained"
            color="primary"
            onClick={() => getProjects(getFromParam(7))}
        >
            Reload week
    </Button>
        <Button
            className={classes.button}
            variant="outlined"
            onClick={() => scrapProjects(getFromParam(7))}
        >
            Scrap week
    </Button>
        <Button
            className={classes.button}
            variant="outlined"
            onClick={() => window.open("https://www.codeur.com", "_blank")}
        >
            Open Codeur.com
    </Button>
    </React.Fragment>
);

export default withStyles(styles)(Actions);
