import React, { useState } from "react"
import Tour from 'reactour'
import { StepButton } from './style';

// 'guide' link para o manual

const tourConfig = [ 
  { 
    selector: "[data-tut='first-step']", 
    content: "Let's start the tour by te main page!"
  },
  {
    selector: "[data-tut='second-step']",
    content: () => (
      <p style={{fontSize: "1.6rem"}}>
        So right here you have the tabs where you can navigate through it. Starting with 
        the files tab, here you will find the functionalities of: <br/> ● Load Cloud <br/> 
        ● Save Cloud <br/> ● Save CAD <br/>
      </p>
    )
  },
  {
    selector: "[data-tut='third-step']",
    content: ({ goTo }) => (
      <div>
        <p style={{fontSize: "1.6rem"}}>
          Each tab has some buttons whose functionality is described in the guide. If you 
          already know the functions that each tab present, you can go straight to step 7 
          by clicking the button below.
        </p>
        <StepButton style={{ textAlign: 'center' }} onClick={() => goTo(7)}> Step 7 </StepButton>
      </div>
    )
  },
  {
    selector: "[data-tut='fourth-step']",
    content: () => (
      <p style={{fontSize: "1.6rem"}}>
        This tab presents all pre-processing functions as: <br/> ● Crop Box Filter <br/> ● Voxel Grid Filter 
        <br/> ● Statistical Removal <br/> ● Normal Estimation <br/> ● Reescale <br/> ● Centralization <br/> ● Alignment 
      </p>
    )
  },
  {
    selector: "[data-tut='fifth-step']",
    content: "The processing one shows the Efficient Ransac function."
  },
  {
    selector: "[data-tut='sixth-step']",
    content: () => (
      <p style={{fontSize: "1.6rem"}}>
        This tab brings the functions of: <br/> ● Interface Tour <br/> ● About Software
      </p>
    )
  },
  {
    selector: "[data-tut='seventh-step']",
    content: "The last one presents the logout functionality."
  },
  {
    selector: "[data-tut='eighth-step']",
    content: "This is the viewer where the point clouds will be loaded and displayed."
  },
  {
    selector: "[data-tut='ninth-step']",
    content: "The sidebar has some tools, such as compass, distance measurement, front view, which can be used within the viewer."
  },
  {
    selector: "[data-tut='ninth-step']",
    content: "Inside each one of the following menus you are going to find these tools. If you hover the option, it will show you a tooltip to know what it is."
  },
  {
    selector: "[data-tut='tenth-step']",
    content: ({ goTo }) => (
      <div>
        <p style={{fontSize: "1.6rem"}}>
        In this menu you are able to change some parameters of the viewer like the background color and the points budget.
        </p>
        <StepButton style={{ textAlign: 'center' }} onClick={() => goTo(13)}> Step 13 </StepButton>
      </div>
    )
  },
  {
    selector: "[data-tut='eleventh-step']",
    content: "In this menu we can found some useful tools to measure the cloud parameters like angles, distances, lengths. We also found some navigation tools."
  },
  {
    selector: "[data-tut='twelfth-step']",
    content: "In this menu we have a tool to export the scene with the desired information."
  },
  {
    selector: "[data-tut='thirteenth-step']",
    content: "In this menu we have a way to filter the efficient ransac results (when they exist)."
  },
  {
    selector: "[data-tut='fourteenth-step']",
    content: "Here you can see the quantity of planes, spheres, cylinders and cones."
  },
]

const InterfaceTour = () => {

    const [isTourOpen, setIsTourOpen] = useState(true);
  
    return (
        <Tour
          steps={tourConfig}
          isOpen={isTourOpen}
          rounded={5}
          className="helper"
          onRequestClose={() => setIsTourOpen(false)}
          scrollDuration
          accentColor="#084502"
          disableInteraction={true}
        />
    );
};

export default InterfaceTour;