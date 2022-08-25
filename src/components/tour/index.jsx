import React, { useState } from "react"
import Tour from 'reactour'

const steps = [ 
    { 
        selector: ".tour-first-step", 
        content: ({ goTo, inDOM }) => (
            <div>
              Lorem ipsum <button onClick={() => goTo(4)}>Go to Step 5</button>
              <br />
              {inDOM && '🎉 Look at your step!'}
            </div>
        ),
        position: [160, 250], 
    },
    {
        selector: '.tour-second-step',
        content: "This is my second step",
    },
]

const InterfaceTour = () => {
    const [isTourOpen, setIsTourOpen] = useState(true);
  
    return (
      <>
        <h1 id="heading">Hello world</h1>
        <p>This is a page</p>
        <img id="picture" src="https://via.placeholder.com/300" />
        <p id="explainer">Click here to start the tour.</p>
        <Tour
          steps={steps}
          isOpen={isTourOpen}
          onRequestClose={() => setIsTourOpen(false)}
          onAfterOpen={(target) => (document.body.style.overflowY = 'hidden')}
        />
      </>
    );
};

export default InterfaceTour;