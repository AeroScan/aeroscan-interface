import React, { useState, useEffect, useRef, useContext } from 'react';
import { GlobalContext } from '../../context';
import { Axes, ViewSwitchContainer, Wrapper } from './style';
import $ from 'jquery';
import * as THREE from 'three';
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Radio } from 'antd';

const RadioGroup = Radio.Group;

const Viewer = () => {
  const { Potree } = window;

  const [pageLoaded, setPageLoaded] = useState(false);
  const [viewer, setViewer] = useState(null);
  const [viewerConfigured, setViewerConfigured] = useState(false);
  const [view, setView] = useState('types');

  const potree_render_area = useRef(null);
  const { cloudFolderName, sessionID } = useContext(GlobalContext);
  const { efficientRansacApplied } = useContext(GlobalContext);
  const { tour } = useContext(GlobalContext);

  const potreeAxes = useRef(null);

  useEffect(() => {
    if (Potree && !pageLoaded) {
      const viewerElem = potree_render_area.current
      setViewer(new Potree.Viewer(viewerElem));
      setPageLoaded(true);
    }
  }, [Potree, pageLoaded]);

  if (tour) {
    $("#menu_tools").next().show();
  }

  const onChange = e => {
    setView(e.target.value);
  };

  const radioStyle = {
    display: 'block',
    height: '30px',
    lineHeight: '30px',
    color: 'white',
    marginLeft: '10px',
  };

  useEffect(() => {
    if (efficientRansacApplied && viewer) {
      if (view === 'types') {
        viewer.setClassifications([
          {
            visible: true,
            name: 'unlabeled',
            color: [0, 0, 0, 1]
          },
          {
            visible: true,
            name: 'plane',
            color: [1, 0, 0, 1],
          },
          {
            visible: true,
            name: 'cylinder',
            color: [0, 0, 1, 1],
          }, {
            visible: true,
            name: 'cone',
            color: [1, 1, 0, 1],
          }, {
            visible: true,
            name: 'sphere',
            color: [0, 0.5, 0, 1],
          }
        ]);
      } else if (view === 'instances') {
        viewer.setClassifications([
          {
            visible: true,
            name: 'unlabeled',
            color: [0, 0, 0, 1]
          },
        ]);
      }
    }
  }, [efficientRansacApplied, viewer, view]);

  useEffect(() => {
    if (viewer && !viewerConfigured) {
      viewer.setEDLEnabled(false);
      viewer.setFOV(60);
      viewer.setPointBudget(1 * 1000 * 1000);
      viewer.loadSettingsFromURL();

      viewer.loadGUI(() => {
        viewer.setLanguage('en');
        $("#menu_tools").next().show();
        $(".button-icon:nth-child(3)").first().attr("data-tut", "twelfth-step")
        viewer.toggleSidebar();
        viewer.setClassifications([
          {
            visible: true,
            name: 'unlabeled',
            color: [0, 0, 0, 1]
          }
        ]);
      });

      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.01, 10000000);
      const renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setClearColor(0x000000, 0);
      potreeAxes.current.appendChild(renderer.domElement);

      const controls = new OrbitControls(camera, renderer.domElement);
      scene.add(new THREE.AxesHelper(10000))
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      }
      animate();

      const handleAxes = () => {
        const coordinate = viewer.scene.getActiveCamera().position
        camera.position.set(Math.round(coordinate.x), Math.round(coordinate.y), Math.round(coordinate.z));
        scene.add(camera)
      }

      viewer.addEventListener("update", handleAxes);

      setViewerConfigured(true);
    }
  }, [viewer, viewerConfigured]);

  useEffect(() => {
    if (cloudFolderName && Potree && viewerConfigured && viewer) {
      Potree.loadPointCloud(`${process.env.REACT_APP_SERVER_URL}:${process.env.REACT_APP_FILES_PORT}/clouds/${sessionID}/${cloudFolderName}/output${efficientRansacApplied ? `_${view}` : ''}/metadata.json`).then(e => {
        viewer.scene.scenePointCloud.remove(viewer.scene.pointclouds[0]);
        viewer.scene.pointclouds.pop();
        viewer.scene.addPointCloud(e.pointcloud);
        const { material } = e.pointcloud;
        material.size = 1;
        material.pointSizeType = Potree.PointSizeType.ADAPTIVE;

        e.pointcloud.position.x += 3;
        e.pointcloud.position.y -= 3;
        e.pointcloud.position.z += 4;
        viewer.fitToScreen();
      }, error => console.err(`ERROR: ${error}`));
    }
  }, [sessionID, cloudFolderName, Potree, viewerConfigured, viewer, efficientRansacApplied, view]);

  return (
    <Wrapper id="potree-root">
      <Axes ref={potreeAxes} />
      {efficientRansacApplied ? (
        <ViewSwitchContainer>
          <h1>View type:</h1>
          <RadioGroup onChange={onChange} value={view}>
            <Radio style={radioStyle} value='types'>Types</Radio>
            <Radio style={radioStyle} value='instances'>Instances</Radio>
          </RadioGroup>
        </ViewSwitchContainer>
      ) : null}
      <div ref={potree_render_area} id="potree_render_area" data-tut="eighth-step" />
      <div id="potree_sidebar_container" data-tut="ninth-step" />
    </Wrapper>
  );
}

export default Viewer;
