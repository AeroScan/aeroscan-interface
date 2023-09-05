import React, { useContext } from 'react';
import { GlobalContext } from '../../context';
import { Container } from './style';

const Footer = () => {
  const { applicationStatus } = useContext(GlobalContext);

  const { planes } = useContext(GlobalContext);
  const { spheres } = useContext(GlobalContext);
  const { cylinders } = useContext(GlobalContext);
  const { cones } = useContext(GlobalContext);

  const legendItems = [
    {
      value: planes.amount,
      label: 'Planes',
      color: '#FF0000'
    },
    {
      value: spheres.amount,
      label: 'Spheres',
      color: '#008000'
    },
    {
      value: cylinders.amount,
      label: 'Cylinders',
      color: '#0000FF'
    },
    {
      value: cones.amount,
      label: 'Cones',
      color: '#DDDD00'
    }
  ];

  return (
    <Container status={applicationStatus.status}>
      {/* <div>
        {legendItems.map((element, index) => (
          <p key={index} style={{ color: element.color }}>{element.value} {element.label}</p>
        ))}
      </div> */}
      <span>Status: <span className='status'>{applicationStatus.message}</span></span>
    </Container>
  );
}

export default Footer;