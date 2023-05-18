import React, { useContext } from 'react';
import { useForm } from "react-hook-form";
import 'antd/dist/antd.css';
import { GlobalContext } from '../../context';
import { ApplyAlignment } from '../../services/api';

const Alignment = ({ setCloudFolderName }) => {
  const { handleSubmit } = useForm();
  const { setApplicationStatus, setLoadings } = useContext(GlobalContext);
  const { sessionID, cloudFolderName } = useContext(GlobalContext);

  const onSubmit = async () => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[0] = true;
      return newLoadings;
    });
    setTimeout(async () => {
      try {
        const response = await ApplyAlignment({ session: sessionID, uuid: cloudFolderName });
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

  return (
    <form onSubmit={handleSubmit(onSubmit)} id="modalForm">
    </form>
  );
}

export default Alignment;