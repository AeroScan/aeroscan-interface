import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { QuestionCircleFilled  } from '@ant-design/icons';
import { Tooltip } from 'antd';
import 'antd/dist/antd.css';
import { GlobalContext } from '../../context';
import { ApplyAlignment } from '../../services/api';

const Alignment = ({ setCloudFolderName }) => {

    const { setApplicationStatus } = useContext(GlobalContext);

    const { handleSubmit, register, formState: { errors } } = useForm();
    const { setLoadings } = useContext(GlobalContext);

    const onSubmit = async(data) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[0] = true;
            return newLoadings;
        });
        setTimeout(async() => {
            try {
                const response = await ApplyAlignment();
                if (!response) {
                    setApplicationStatus('Failed to apply alignment');
                }
                setApplicationStatus('Alignment applied');
                setCloudFolderName(response);
            } catch (error) {
                console.error(error);
                setApplicationStatus('Failed to apply alignment');
            }
            
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[0] = false;
                
                return newLoadings;
            });
        }, 2000)
    }

    return(
        <form onSubmit={handleSubmit(onSubmit)} id="modalForm">
            {/* <div className='formContainer'>
                <label htmlFor=''>Align:</label>
                <select 
                    aria-label="alignment"
                    {...register("alignment")}    
                >
                    <option value="" hidden>Select</option>
                    <option value="true">True</option>
                    <option value="false">False</option>
                </select>
                <Tooltip placement="right" title={'The select set the alignment.'} overlayStyle={{ fontSize: '3rem' }}>
                    <QuestionCircleFilled />
                </Tooltip>
            </div> */}
            {/* <span className='error'>{errors.email.type.custom}</span> */}
        </form>
    );
}

export default Alignment;