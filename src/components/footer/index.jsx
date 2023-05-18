import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../context';
import { Container } from './style';
// import { legendItems } from './labels'

const Footer = () => {
    const { applicationStatus } = useContext(GlobalContext);

    const { planes } = useContext(GlobalContext);
    const { spheres } = useContext(GlobalContext);
    const { cylinders } = useContext(GlobalContext);
    const { cones } = useContext(GlobalContext);

    const legendItems = [
        {
            value: planes,
            label: 'Planes',
            color: '#FF0000'
        },
        {
            value: spheres,
            label: 'Spheres',
            color: '#008000'
        },
        {
            value: cylinders,
            label: 'Cylinders',
            color: '#0000FF'
        },
        {
            value: cones,
            label: 'Cones',
            color: '#DDDD00'
        }
    ];

    return(
        <Container>
            <div data-tut="fourteenth-step">
                {legendItems.map((element, index) => (
                    <p key={index} style={{ color: element.color }}>{element.value} {element.label}</p>
                ))}
            </div>
            <span><strong>Status:</strong> {applicationStatus}</span>
        </Container>
    );
}

export default Footer;