import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { QuestionCircleFilled  } from '@ant-design/icons';
import { Tooltip } from 'antd';
import 'antd/dist/antd.css';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { GlobalContext } from '../../context';
import { ApplyVoxelGrid } from '../../services/api';

const VoxelGridFilter = ({ setCloudFolderName }) => {

    const voxelGridSchema = yup.object().shape({
        leafSize: yup.number().typeError('A number is required')
    });

    const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(voxelGridSchema) });
    const { setApplicationStatus, setLoadings } = useContext(GlobalContext);

    const onSubmit = async(data) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[0] = true;
            return newLoadings;
        });
        setTimeout(() => {
            voxelGridSchema.validate(data)
            .then( async() => {
                try {
                    const response = await ApplyVoxelGrid({ leaf: data.leafSize });
                    if (!response) {
                        setApplicationStatus('Failed to apply voxel grid');
                    }
                    setApplicationStatus('Voxel grid applied');
                    setCloudFolderName(response);
                } catch (error) {
                    console.error(error);
                    setApplicationStatus('Failed to apply voxel grid');
                }
            })
            .catch(err => {
                console.log(err);
            });
            
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[0] = false;
                
                return newLoadings;
            });
        }, 2000)
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} id="modalForm">
            <div className='formContainer'>
                <label htmlFor='leafSize'>Leaf Size:</label>
                <input 
                type='text' 
                id='leafSize' 
                placeholder='float'
                {...register("leafSize")}
                />
                <Tooltip placement="right" title={'This field set the minimum distance between neighboring points in the cloud equally.'} overlayStyle={{ fontSize: '3rem' }}>
                    <QuestionCircleFilled />
                </Tooltip>
            </div>
            <span className='error'>{errors.leafSize?.message}</span>
        </form>
    );
}

export default VoxelGridFilter;