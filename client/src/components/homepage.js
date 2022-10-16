import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import './homepage.css';

export default function Homepage() {
    return (
        <div>
            <div className="titledef">
                <h1 className='title'>P
                    <span style={{ color: "#75cadd" }}>o</span>
                    lygl
                    <span style={{ color: "#06c2a4" }}>o</span>
                    t.i
                    <span style={{ color: "#ffa602" }}>o</span>
                </h1>
                <i><h4 style={{marginBottom: "1%"}}>noun</h4></i>
                <h3>a person who knows and is able to use several languages</h3>
                <a href='.\question1' style={{ textDecoration: "none" }}>
                    <div><Button className='button' variant="contained" style={{ backgroundColor: "#b3cde0" }}>शुरू करना</Button></div>
                </a>
                <a href='.\question1' style={{ textDecoration: "none" }}>
                    <div><Button className='button' variant="contained" style={{ backgroundColor: "#6497b1" }}>начинать</Button></div>
                </a>
                <a href='.\question1' style={{ textDecoration: "none" }}>
                    <div><Button className='button button-large' variant="contained" style={{ backgroundColor: "#015b96" }}>Begin</Button></div>
                </a>
                <a href='.\question1' style={{ textDecoration: "none" }}>
                    <div><Button className='button' variant="contained" style={{ backgroundColor: "#00396c" }}>Commencer</Button></div>
                </a>
                <a href='.\question1' style={{ textDecoration: "none" }}>
                    <div><Button className='button' variant="contained" style={{ backgroundColor: "#011f4b" }}>开始</Button></div>
                </a>
            </div>
        </div>
    );
}