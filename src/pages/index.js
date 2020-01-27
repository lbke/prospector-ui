import React, { PureComponent } from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import ProjectCard from "../components/ProjectCard";
import Actions from "../components/Actions";
import { getTodayFromParam, humanizeFromParam } from "../utils/utils";

//import { Link } from "gatsby"

import Layout from "../components/layout"
//import Image from "../components/image"
import SEO from "../components/seo"

const styles = theme => ({
    unstyledLink: {
        "&:link": {
            textDecoration: "none"
        }
    }
});

const baseUrl = process.env.API_URL
const scrapUrl = baseUrl + "/query";
const getUrl = baseUrl + "";
const withProjects = C => {
    class ProjectsContainer extends PureComponent {
        state = {
            projects: [],
            scrapingProjects: false,
            loadingProjects: false,
            from: getTodayFromParam()
        };
        componentDidMount() {
            this.init();
        }
        init = async () => {
            this.getProjects(getTodayFromParam());
            //await this.scrapProjects(getTodayFromParam());
        };
        scrapProjects = async from => {
            this.setState({ scrapingProjects: true });
            const res = await fetch(`${scrapUrl}?from=${from}`).then(res =>
                res.json()
            );
            this.setState({ scrapingProjects: false });
            this.getProjects(from);
        };
        getProjects = async from => {
            this.setState({ loadingProjects: true });
            const projects = await fetch(`${getUrl}?from=${from}`).then(res =>
                res.json()
            );
            await this.setState({
                projects
            });
            this.setState({ loadingProjects: false, from });
            return projects;
        };
        render() {
            return (
                <C
                    {...this.props}
                    {...this.state}
                    getProjects={this.getProjects}
                    scrapProjects={this.scrapProjects}
                />
            );
        }
    }
    return ProjectsContainer;
};

const ProjectLink = withStyles(styles)(({ url, children, classes }) => (
    <a className={classes.unstyledLink} href={url} target="_blank">
        {children}
    </a>
));
const ProjectsPage = ({
    getProjects,
    scrapProjects,
    scrapingProjects,
    loadingProjects,
    projects,
    from
}) => (
        <Layout>
            <SEO title="Projects" />
            <Grid container spacing={16}>
                <Grid item xs={12}>
                    <Actions getProjects={getProjects} scrapProjects={scrapProjects} />
                </Grid>
                {!loadingProjects && (
                    <Grid item xs={12}>
                        <Typography>Projets postés depuis {humanizeFromParam(from)}</Typography>
                    </Grid>
                )}
                {scrapingProjects && (
                    <Grid item xs={12}>
                        <Typography component="span">Scraping en cours...</Typography>
                    </Grid>
                )}
                {loadingProjects && (
                    <Grid item xs={12}>
                        <span>Loading...</span>
                        <Typography component="span">
                            Chargement des projets en cours...
        </Typography>
                    </Grid>
                )}
                <Grid item xs={12}>
                    <Grid container spacing={8}>
                        {projects.map(project => (
                            <Grid item xs={12} sm={11} md={10} key={project.id}>
                                <ProjectLink url={project.url}>
                                    <ProjectCard project={project} />
                                </ProjectLink>
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
            </Grid>
        </Layout>
    );

const WrappedProjectsPage = withStyles(styles)(withProjects(ProjectsPage));


export default WrappedProjectsPage;
