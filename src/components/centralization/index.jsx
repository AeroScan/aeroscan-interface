import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import { QuestionCircleFilled  } from '@ant-design/icons';
import { Tooltip } from 'antd';
import 'antd/dist/antd.css';
import { GlobalContext } from '../../context';
import { ApplyCentralization } from '../../services/api';

const Centralization = ({ setCloudFolderName }) => {

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
                const response = await ApplyCentralization();
                if (!response) {
                    setApplicationStatus('Failed to apply centralization');
                }
                setApplicationStatus('Centralization applied');
                setCloudFolderName(response);
            } catch (error) {
                console.error(error);
                setApplicationStatus('Failed to apply centralization');
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
            <div className='formContainer'>
                {/* <label htmlFor='scale'>Scale:</label>
                <input 
                type='text' 
                id='scale' 
                placeholder='float'
                {...register("scale", { required: 'Invalid scale' })}
                aria-invalid={errors.scale ? "true" : "false"}
                />
                <Tooltip placement="right" title={'This field update the scale of all cloud points.'} overlayStyle={{ fontSize: '3rem' }}>
                    <QuestionCircleFilled />
                </Tooltip> */}
            </div>
            {/* <span className='error'>{errors.email.type.custom}</span> */}
        </form>
    );
}

export default Centralization;