import React, { PureComponent } from "react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
//import CardActionArea from "@material-ui/core/CardActionArea";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import _delay from 'lodash/delay'

const styles = theme => ({
    goodCard: {
        border: "2px solid green",
    },
    card: {
        cursor: "pointer"
    },
    cardContent: {
        padding: 16,
        '&:last-child': {
            padding: 16
        }
    },
});


const withHover = C => {
    class HoverProvider extends PureComponent {
        state = {
            hover: false,
        }
        hover = false
        onEnter = () => {
            this.hover = true
            // change state only if it makes sens
            _delay(() => {
                if (this.hover) {
                    this.setState({ hover: true })
                }
            }, 150)
        }
        onLeave = () => {
            this.hover = false
            this.setState({ hover: false })
        }
        render() {
            return (
                <div onMouseEnter={this.onEnter} onMouseLeave={this.onLeave}>
                    <C {...this.state} {...this.props} />
                </div>
            )
        }
    }
    return HoverProvider
}

const BadCard = ({ title, description, onClick, classes, hover }) => (
    <Card raised={true} onClick={onClick} className={classes.card}>
        <CardContent className={classes.cardContent}>
            <Typography variant="body2">{title}</Typography>
            {hover && <Typography component="p">{description}</Typography>}
        </CardContent>
    </Card>
);
const DefaultCard = ({ title, description, onClick, classes, hover }) => (
    <Card raised={true} onClick={onClick} className={classes.card}>
        <CardContent className={classes.cardContent}>
            <Typography variant="headline">{title}</Typography>
            {hover && <Typography component="p">{description}</Typography>}
        </CardContent>
    </Card>
);
const GoodCard = ({ title, description, onClick, classes, hover }) => (
    <Card raised={true} onClick={onClick} className={`${classes.goodCard} ${classes.card}`}>
        <CardContent className={classes.cardContent}>
            <Typography variant="headline">{title}</Typography>
            <Typography component="p">{description}</Typography>
        </CardContent>
    </Card>
);

const ProjectCard = ({ project, ...otherProps }) => {
    if (project.score < 50) return <BadCard  {...otherProps}  {...project} />;
    if (project.score > 50) return <GoodCard  {...otherProps}  {...project} />;
    return <DefaultCard {...otherProps} {...project} />;
};

export default withStyles(styles)(withHover(ProjectCard));
