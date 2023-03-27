import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { QuestionCircleFilled  } from '@ant-design/icons';
import { Tooltip } from 'antd';
import 'antd/dist/antd.css';
import * as yup from 'yup';
import { yupResolver } from "@hookform/resolvers/yup";
import { GlobalContext } from '../../context';
import { ApplyNormalEstimation } from '../../services/api';

const NormalEstimation = ({ setCloudFolderName }) => {

    const { setApplicationStatus } = useContext(GlobalContext);
    const normalEstimationSchema = yup.object().shape({
        radius: yup.number().typeError('A number is required')
    });
    const { handleSubmit, register, formState: { errors } } = useForm({ resolver: yupResolver(normalEstimationSchema) });
    const { loadings, setLoadings } = useContext(GlobalContext);

    const onSubmit = async(data) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[0] = true;
            return newLoadings;
        });
        setTimeout(() => {
            normalEstimationSchema.validate(data)
            .then( async() => {
                try {
                    const response = await ApplyNormalEstimation({ radius: data.radius });
                    if (!response) {
                        setApplicationStatus('Failed to apply normal estimation');
                    }
                    setApplicationStatus('Normal estimation applied');
                    setCloudFolderName(response);
                } catch (error) {
                    console.error(error);
                    setApplicationStatus('Failed to apply normal estimation');
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
                <label htmlFor='radius'>Radius:</label>
                <input 
                type='text' 
                id='radius' 
                placeholder='float'
                {...register("radius")}
                />
                <Tooltip placement="right" title={'This field set the radius.'} overlayStyle={{ fontSize: '3rem' }}>
                    <QuestionCircleFilled />
                </Tooltip>
            </div>
            <span className='error'>{errors.radius?.message}</span>
        </form>
    );
}

export default NormalEstimation;