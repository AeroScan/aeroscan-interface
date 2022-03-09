import React, { useEffect, useState } from 'react';
import { Container } from './style';
// import { legendItems } from './labels'

const Footer = () => {

    const[status, setStatus] = useState("Nuvem carregada");

    const [planes, setPlanes] = useState(0);
    const [spheres, setSpheres] = useState(0);
    const [cylinders, setCylinders] = useState(0);
    const [cones, setCones] = useState(0);

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
            <div>
                {legendItems.map((element, index) => (
                    <p key={index} style={{ color: element.color }}>{element.value} {element.label}</p>
                ))}
            </div>
            <span><strong>Status:</strong> {status}</span>
        </Container>
    );
}

export default Footer;