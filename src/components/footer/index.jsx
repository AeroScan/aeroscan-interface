import React, { useContext, useState } from 'react';
import { GlobalContext } from '../../context';
import { Container } from './style';
// import { legendItems } from './labels'

const Footer = () => {

    const[status, setStatus] = useState("Started");

    const {planes, setPlanes} = useContext(GlobalContext);
    const {spheres, setSpheres} = useContext(GlobalContext);
    const {cylinders, setCylinders} = useContext(GlobalContext);
    const {cones, setCones} = useContext(GlobalContext);

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