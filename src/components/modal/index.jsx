import React, { useContext } from 'react';
import GeneratePassword from '../generatePassword';
import CropBoxFilter from '../cropBoxFilter';
import VoxelGridFilter from '../voxelGridFilter';
import StatisticalRemoval from '../statisticalRemoval';
import NormalEstimation from '../normalEstimation';
import Reescale from '../reescale';
import Centralization from '../centralization';
import Alignment from '../alignment';
import NoiseAdd from '../noiseAdd';
import CubeReescale from '../cubeReescale';
import EfficientRansac from '../efficientRansac';
import { GlobalContext } from '../../context';
import * as ModalActions from './actions';
import { Container } from './style';
import { CloseOutlined } from '@ant-design/icons';
import { Modal, Button } from 'antd';
import 'antd/dist/antd.css';

const ModalComponet = ({ modalContent, setModalContent, setGlobalLoading, setCylinders, setCones, setSpheres, setPlanes }) => {
    
    const { loadings } = useContext(GlobalContext);

    const handleModalContent = () => {
        switch(modalContent.submitCode){
            case ModalActions.CROP_BOX:
                return(<CropBoxFilter />);
            case ModalActions.VOXEL_GRID:
                return(<VoxelGridFilter />);
            case ModalActions.STATISTICAL_REMOVAL:
                return(<StatisticalRemoval/>);
            case ModalActions.NORMAL_ESTIMATION:
                return(<NormalEstimation />);
            case ModalActions.REESCALE:
                return(<Reescale />);
            case ModalActions.CENTRALIZATION:
                return(<Centralization />);
            case ModalActions.ALIGNMENT:
                return(<Alignment />);
            case ModalActions.NOISE_ADD:
                return(<NoiseAdd />);
            case ModalActions.CUBE_REESCALE:
                return(<CubeReescale />);
            case ModalActions.RANSAC:
                return(<EfficientRansac />);
            case ModalActions.GENERATE_PASSWORD:
                return(<GeneratePassword />);
            default:
                break;
        }
    }

    const handleCloseModal = () => {
        setModalContent(null);
    }

    return (
        <Modal 
            open={modalContent !== null} 
            footer={null} width={'40%'} 
            closable={false} 
            maskClosable={true}
            centered
            destroyOnClose
        >
            <Container>
                <CloseOutlined className='closeIcon' onClick={handleCloseModal}/>
                <h1>{modalContent.label}</h1>
                    {handleModalContent()}
                <div className="buttons-container">
                    <Button loading={loadings[0]} htmlType='submit' form="modalForm">
                        Process
                    </Button>
                    <Button className='cancel' onClick={handleCloseModal}>
                        Cancel
                    </Button>
                </div>
            </Container>
        </Modal>
    );
}
 
export default ModalComponet;
