import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { QuestionCircleFilled  } from '@ant-design/icons';
import { Tooltip } from 'antd';
import 'antd/dist/antd.css';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { GlobalContext } from '../../context';
import { ApplyCropBox } from '../../services/api';

const CropBoxFilter = ({ setCloudFolderName }) => {

    const { setApplicationStatus } = useContext(GlobalContext);
    const cropBoxSchema = yup.object().shape({
        startinPoint_x: yup.number().typeError('A number is required'),
        startinPoint_y: yup.number().typeError('A number is required'),
        startinPoint_z: yup.number().typeError('A number is required'),
        endingPoint_x: yup.number().typeError('A number is required'),
        endingPoint_y: yup.number().typeError('A number is required'),
        endingPoint_z: yup.number().typeError('A number is required')
    });
    const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(cropBoxSchema) });
    const { setLoadings } = useContext(GlobalContext);

    const onSubmit = async(data) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[0] = true;
            return newLoadings;
        });
        setTimeout(() => {
            cropBoxSchema.validate(data)
            .then( async() => {
                try {
                    const response = await ApplyCropBox({
                    min_x: data.startinPoint_x,
                    min_y: data.startinPoint_y,
                    min_z: data.startinPoint_z,
                    max_x: data.endingPoint_x,
                    max_y: data.endingPoint_y,
                    max_z: data.endingPoint_z,
                    });
                    if (!response) {
                        setApplicationStatus('Failed to apply crop box');
                    }
                    setApplicationStatus('Crop box applied');
                    setCloudFolderName(response);
                } catch (error) {
                    console.error(error);
                    setApplicationStatus('Failed to apply crop box');
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
                <label htmlFor='startinPoint'>Starting Point:</label>
                <input 
                type='text' 
                id='startinPoint' 
                placeholder='x'
                {...register("startinPoint_x")}
                />
                <input 
                type='text' 
                id='startinPoint' 
                placeholder='y'
                {...register("startinPoint_y")}
                />
                <input 
                type='text' 
                id='startinPoint'
                placeholder='z'
                {...register("startinPoint-z")}
                />
                <Tooltip placement="right" title={'These fields set the minimum coordinates.'} overlayStyle={{ fontSize: '3rem' }}>
                    <QuestionCircleFilled />
                </Tooltip>
            </div>
            {/* <span className='error'>{errors.startinPoint_x?.message}</span> */}
            <div className='formContainer'>
                <label htmlFor='endingPoint'>Ending Point:</label>
                <input 
                type='text' 
                id='endingPoint'
                placeholder='x'
                {...register("endingPoint-x")}
                />
                <input 
                type='text' 
                id='endingPoint'
                placeholder='y'
                {...register("endingPoint-y")}
                />
                <input 
                type='text' 
                id='endingPoint'
                placeholder='z'
                {...register("endingPoint-z")}
                />
                <Tooltip placement="right" title={'These fields set the maximum coordinates.'} overlayStyle={{ fontSize: '3rem' }}>
                    <QuestionCircleFilled />
                </Tooltip>
            </div>
            {/* <span className='error'>{errors.endingPoint?.message}</span> */}
        </form>
    );
}

export default CropBoxFilter;