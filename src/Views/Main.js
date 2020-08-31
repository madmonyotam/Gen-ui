import React, { useState, useCallback, useEffect } from "react";
import { useBranch } from "baobab-react/hooks";
import { LinearProgress, Paper, Typography } from "@material-ui/core";
import styled from "styled-components";

import * as access from "plugins/access";
import * as libsActions from "tree/actions/libs";

import MenuPanel from "Views/MenuPanel";
import SchemaPanel from "Views/SchemaPanel";
import Mask from "plugins/tools/Mask";
import Wrapper from "plugins/tools/Wrapper";
import MainCanvas from "plugins/canvases/MainCanvas";
import Menu from "plugins/menuModal/Menu";
import Project from "Views/Project";
import TopPanel from 'plugins/tools/TopPanel';

import Request from 'plugins/request';

const InitMask = styled(Mask)`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

function Main() {
  const { viewKey } = useBranch({ viewKey: ["viewKey"] });
  const { libs, dispatch } = useBranch({ libs: ["libs"] });
  const [loading, setLoading] = useState(true);
  const [projects, setProjects] = useState([])
  const userName = localStorage.getItem('gen-user-name');
  const email = localStorage.getItem('gen-user-email');
  const stableDispatch = useCallback(dispatch, [])

  useEffect(() => { 
    Request.get(`https://us-central1-mocking-gen-dev.cloudfunctions.net/projectRestAPI-projectRestAPI/project/users/${email}`)
      .then(({ data }) => { 
        if (data.status.toLowerCase() === 'success') {
          setProjects(data.projects)
        }
      })
  }, [])

  // useEffect(() => {
  //   Request.get('/getAllLibraries')
  //     .then(res => {
  //       stableDispatch(libsActions.setLibs, res.data);
  //     })
  // }, [stableDispatch]);


  useEffect(() => {
     
    const t = setTimeout(() => {
      setLoading(false);
    }, 1500);
    return () => {
      clearTimeout(t);
    };
  }, []);

  if (loading) {
    return (
      <InitMask opacity={1} mask={access.color("backgrounds.secondary")}>
        <img alt="logo" src={process.env.PUBLIC_URL + "/gen_logo.png"} />
        <div style={{ width: 400 }}>
          <LinearProgress value={50} color={"primary"} />
        </div>
      </InitMask>
    );
  }
  console.log('projects', projects)
  return (
    <Wrapper>
      <TopPanel user={{ userName, email }} />
      <div style={{ position: 'absolute', display: 'flex', flexDirection:'column', top: 60, bottom: 0, left: 0, right: 0, padding: 25 }}>
        {
          projects.map(project => 
            <Paper
              key={project.id} 
              style={{ marginBottom: 15, height: 90, padding: 15, background: access.color("backgrounds.primary") }} 
              elevation={2}>
                <Typography style={{ color: '#fff' }}>
                  { project.name }
                </Typography>
            </Paper>
          )
        } 
      </div>
      {/* <Project />
      <div>
        Dashboard
      </div> */}
    </Wrapper>
  );
}

export default Main;
