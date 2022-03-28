import React, { useContext, useEffect, useState } from 'react';
import MyContext from '../../context';
import { Container } from './style';
// import { legendItems } from './labels'

const Footer = () => {

    const[status, setStatus] = useState("Started");

    const {planes, setPlanes} = useContext(MyContext);
    const {spheres, setSpheres} = useContext(MyContext);
    const {cylinders, setCylinders} = useContext(MyContext);
    const {cones, setCones} = useContext(MyContext);

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