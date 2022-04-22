import loudCloudLogo from '../../assets/img/archives/load-cloud.png';
import saveCloudLogo from '../../assets/img/archives/save-cloud.png';
import saveResultsLogo from '../../assets/img/archives/save-results.png';
import cropBoxLogo from '../../assets/img/pre-processing/crop-box.png';
import voxelGridLogo from '../../assets/img/pre-processing/voxel-grid.png';
import sRemovalLogo from '../../assets/img/pre-processing/statistical-removal.png';
import nEstimationLogo from '../../assets/img/pre-processing/normal-estimation.png';
import reescaleLogo from '../../assets/img/pre-processing/reescale.png';
import centralizationLogo from '../../assets/img/pre-processing/centralization.png';
import alignmentLogo from '../../assets/img/pre-processing/alignment.png';
import ransacLogo from '../../assets/img/processing/efficient-ransac.png';
import parametersLogo from '../../assets/img/viewer/parameters.png';
import rAllocationLogo from '../../assets/img/configuration/resource-allocation.png';
import tourLogo from '../../assets/img/help/tour.png';
import aboutLogo from '../../assets/img/help/about.png';
import ModalComponet from '../modal';
import * as ModalActions from '../modal/actions';


export const tabs = [
  {
    name: 'Files',
    procedures: [
      {
        logo: loudCloudLogo,
        label: 'Load Cloud', 
      },
      {
        logo: saveCloudLogo,
        label: 'Save Cloud'
      },
      {
        logo: saveResultsLogo,
        label: 'Save Results'
      }
    ]
  },
  {
    name: 'Pre-Processing',
    procedures: [
      {
        logo: cropBoxLogo,
        label: 'Crop Box Filter',
        component: <ModalComponet 
          title={'Crop Box Filter'} 
          content={[
            {
              id: 'startingPoint',
              label: 'Starting Point:',
              input: ['x', 'y', 'z'],
              inputType: 'text',
              tooltipMessage: 'These fields set the minimum coordinates.',
              errorMessage: 'Invalid Fields'
            },
            {
              id: 'endingPoint',
              label: 'Ending Point:',
              input: ['x', 'y', 'z'],
              inputType: 'text',
              tooltipMessage: 'These fields set the maximum coordinates.',
              errorMessage: 'Invalid Fields'
            }
          ]}
          buttonLabel={'Process'}
          submitCode={ModalActions.CROP_BOX}
        />
      },
      {
        logo: voxelGridLogo,
        label: 'Voxel Grid Filter',
        component: <ModalComponet 
          title={'Voxel Grid Filter'} 
          content={[
            // {
            //   id: 'leafSize',
            //   label: 'Leaf Size:',
            //   input: ['x', 'y', 'z'],
            //   inputType: 'text',
            //   tooltipMessage: 'These fields set the minimum distance between neighboring points in the cloud equally'
            // },
            {
              id: 'leafSize',
              label: 'Leaf Size:',
              input: ['float'],
              inputType: 'text',
              tooltipMessage: 'This field set the minimum distance between neighboring points in the cloud equally.',
              errorMessage: 'Invalid Field'
            }
          ]}
          buttonLabel={'Process'}
          submitCode={ModalActions.VOXEL_GRID}
        />
      },
      {
        logo: sRemovalLogo,
        label: 'Statistical Removal',
        component: <ModalComponet 
          title={'Statistical Removal'} 
          labels={['Mean:', 'Standard Deviation:']} 
          content={[
            {
              id: 'mean',
              label: 'Mean:',
              input: ['float'],
              inputType: 'text',
              tooltipMessage: 'This field set the average.',
              errorMessage: 'Invalid Field'
            },
            {
              id: 'standardDeviation',
              label: 'Standard Deviation:',
              input: ['float'],
              inputType: 'text',
              tooltipMessage: 'This field set the standard deviation.',
              errorMessage: 'Invalid Field'
            }
          ]}
          buttonLabel={'Process'}
          submitCode={ModalActions.STATISTICAL_REMOVAL}
        />
      },
      {
        logo: nEstimationLogo,
        label: 'Normal Estimation',
        component: <ModalComponet 
          title={'Normal Estimation'} 
          content={[
            {
              id: 'k',
              label: 'K:',
              input: ['k'],
              inputType: 'text',
              tooltipMessage: 'This field estimates a normal to the surface around each point.',
              errorMessage: 'Invalid Field'
            },
            // {
            //   id: 'radius',
            //   label: 'Radius:',
            //   input: ['float'],
            //   inputType: 'text',
            //   tooltipMessage: 'This field set the'
            // }
          ]}
          buttonLabel={'Process'}
          submitCode={ModalActions.NORMAL_ESTIMATION}
        />
      },
      {
        logo: reescaleLogo,
        label: 'Reescale',
        component: <ModalComponet 
          title={'Reescale'} 
          labels={['Scale:']} 
          content={[
            {
              id: 'scale',
              label: 'Scale:',
              input: ['float'],
              inputType: 'text',
              tooltipMessage: 'This field update the scale of all cloud points.',
              errorMessage: 'Invalid Field'
            }
          ]}
          buttonLabel={'Process'}
          submitCode={ModalActions.REESCALE}
        />
      },
      {
        logo: centralizationLogo,
        label: 'Centralization',
        component: <ModalComponet 
          title={'Centralization'} 
          labels={['Centralize:']} 
          content={[
            {
              id: 'centralize',
              label: 'Centralize:',
              inputType: 'select',
              tooltipMessage: 'The select set the centralization.',
              errorMessage: 'Invalid Field'
            }
          ]}
          buttonLabel={'Process'}
          submitCode={ModalActions.CENTRALIZATION}
        />
      },
      {
        logo: alignmentLogo,
        label: 'Alignment',
        component: <ModalComponet 
          title={'Alignment'} 
          content={[
            {
              id: 'align',
              label: 'Align:',
              inputType: 'select',
              tooltipMessage: 'The select set the alignment.',
              errorMessage: 'Invalid Field'
            }
          ]}
          buttonLabel={'Process'}
          submitCode={ModalActions.ALIGNMENT}
        />
      }
    ]     
  },
  {
    name: 'Processing',
    procedures: [
      {
        logo: ransacLogo,
        label: 'Efficient Ransac',
        component: <ModalComponet 
          title={'Alignment'} 
          content={[
            {
              id: 'scale',
              label: 'Probability:',
              input: ['float'],
              inputType: 'text',
              tooltipMessage: 'This field set the method stop condition, probability of losing the largest primitive at each iteration.',
              errorMessage: 'Invalid Field'
            },
            {
              id: 'scale',
              label: 'Min Points:',
              input: [''],
              inputType: 'text',
              tooltipMessage: 'This field set the minimum number of points for a sample to be considered a possible individual primitive.',
              errorMessage: 'Invalid Field'
            },
            {
              id: 'scale',
              label: 'Cluster Epsilon:',
              input: [''],
              inputType: 'text',
              tooltipMessage: 'This field set the distance used for two neighboring points to be considered adjacent or not.',
              errorMessage: 'Invalid Field'
            },
            {
              id: 'scale',
              label: 'Epsilon:',
              input: [''],
              inputType: 'text',
              tooltipMessage: 'This field set the minimum distance between a primitive and a point for it to be considered belonging to it.',
              errorMessage: 'Invalid Field'
            },
            {
              id: 'scale',
              label: 'Normal Threshold:',
              input: ['K'],
              inputType: 'text',
              tooltipMessage: 'This field limits how much the normal of a point can angularly differ from the normal of the primitive at the projection position of that point.',
              errorMessage: 'Invalid Field'
            }
          ]}
          buttonLabel={'Process'}
          submitCode={ModalActions.ALIGNMENT}
        />
      }
    ]    
  },
  // {
  //   name: 'Viewer',
  //   key: '4',
  //   logos: [parametersLogo],
  //   texts: ['Primitive Parameters'],
  // },
  // {
  //   name: 'Settings',
  //   procedures: [
  //     {
  //       logo: rAllocationLogo,
  //       label: 'Resource Allocation'
  //     }
  //   ]
  // },
  {
    name: 'Help',
    procedures: [
      // {
      //   logo: tourLogo,
      //   label: 'Interface Tour'    
      // },
      {
        logo: aboutLogo,
        label: 'About Software'
      }
    ]
  },
  {
    name: 'Admin',
    procedures: [
      {
        logo: rAllocationLogo,
        label: 'Generate Password',
        component: <ModalComponet 
        title={'Generate Password'} 
        labels={['Email', 'Password']} 
        inputs={'text'}
        content={[
          {
            id: 'email',
            label: 'E-mail:',
            input: ['Type your e-mail'],
            inputType: 'text',
            tooltipMessage: 'This field generate a password through the e-mail.',
            errorMessage: 'Invalid Email'
          },
          {
            id: 'password',
            label: 'Password:',
            input: [''],
            inputType: 'text',
            tooltipMessage: 'This field show the password generated by md5.'
          }
        ]}
        buttonLabel={'Generate'}
        submitCode={ModalActions.GENERATE_PASSWORD}
        />
      }
    ]
  },
  {
    name: 'Account',
    procedures: [
      {
        logo: rAllocationLogo,
        label: 'Logout', 
      }
    ]
  }
];

