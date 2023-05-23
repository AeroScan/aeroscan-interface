import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import 'antd/dist/antd.css';
import { GlobalContext } from '../../context';
import { ApplyCentralization } from '../../services/api';

const Centralization = ({ setCloudFolderName }) => {
  const { handleSubmit } = useForm();
  const { setApplicationStatus, setLoadings } = useContext(GlobalContext);
  const { sessionID, cloudFolderName } = useContext(GlobalContext);

  const onSubmit = async () => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[0] = true;
      return newLoadings;
    });
    try {
      const response = await ApplyCentralization({ session: sessionID, uuid: cloudFolderName });
      if (!response) {
        setApplicationStatus('Failed to apply centralization');
      } else {
        setApplicationStatus('Centralization applied');
      }
      setCloudFolderName(response);
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[0] = false;
        return newLoadings;
      });
    } catch (error) {
      console.error(error);
      setApplicationStatus('Failed to apply centralization');
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[0] = false;
        return newLoadings;
      });
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="modalForm">
      <div className='formContainer'>
      </div>
    </form>
  );
}

export default Centralization;