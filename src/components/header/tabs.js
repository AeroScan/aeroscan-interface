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
              label: 'Starting Point:',
              input: ['x', 'y', 'z'],
              inputType: 'text'
            },
            {
              label: 'Ending Point:',
              input: ['x', 'y', 'z'],
              inputType: 'text'
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
            {
              label: 'Leaf Size:',
              input: ['x', 'y', 'z'],
              inputType: 'text'
            },
            {
              label: 'Leaf Size:',
              input: ['float'],
              inputType: 'text'
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
              label: 'Mean:',
              input: ['float'],
              inputType: 'text'
            },
            {
              label: 'Standard Deviation:',
              input: ['float'],
              inputType: 'text'
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
              label: 'K:',
              input: ['k'],
              inputType: 'text'
            },
            {
              label: 'Radius:',
              input: ['float'],
              inputType: 'text'
            }
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
              label: 'Scale:',
              input: ['float'],
              inputType: 'text'
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
              label: 'Centralize:',
              inputType: 'select'
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
              label: 'Align:',
              inputType: 'select'
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
        label: 'Efficient Ransac'
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
      {
        logo: tourLogo,
        label: 'Interface Tour'    
      },
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
            label: 'E-mail:',
            input: ['Type your e-mail'],
            inputType: 'text'
          },
          {
            label: 'Password:',
            input: ['teste'],
            inputType: 'text'
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

