import React, { useState, useEffect } from 'react';
import Button from '@mui/material/Button';
import './homepage.css';
import logo from './imgs/logo.png';
import en from './imgs/en.png';
import fr from './imgs/fr.png';
import cn from './imgs/cn.png';
import ru from './imgs/ru.png';
import id from './imgs/in.png';
import es from './imgs/es.png';
import sl from './imgs/sl.png';

export default function Question2() {
    return (
        <div>
            <img src={logo} className="logo"></img>
            <h3 className="title2">What Language do You Want to Learn?</h3>
            <div className="cntybuttons">
                <div>
                    <a href='.\question3' style={{ textDecoration: "none" }}><img src={en} className="btnc" width="180px" height="120px"></img></a>
                    <p className='txtc'>English</p>
                </div>
                <div>
                <a href='.\question3' style={{ textDecoration: "none" }}><img src={fr} className="btnc" width="180px" height="120px"></img></a>
                    <p className='txtc'>French</p>
                </div>
                <div>
                <a href='.\question3' style={{ textDecoration: "none" }}><img src={cn} className="btnc" width="180px" height="120px"></img></a>
                    <p className='txtc'>Chinese</p>
                </div>
                <div style={{ marginTop: "3%" }}>
                <a href='.\question3' style={{ textDecoration: "none" }}><img src={ru} className="btnc" width="180px" height="120px"></img></a>
                    <p className='txtc'>Russian</p>
                </div>
                <div style={{ marginTop: "3%" }}>
                <a href='.\question3' style={{ textDecoration: "none" }}><img src={id} className="btnc" width="180px" height="120px"></img></a>
                    <p className='txtc'>Hindi</p>
                </div>
                <div style={{ marginTop: "3%" }}>
                <a href='.\question3' style={{ textDecoration: "none" }}><img src={es} className="btnc" width="180px" height="120px"></img></a>
                    <p className='txtc'>Spanish</p>
                </div>
                <div style={{ marginTop: "3%" }}>
                <a href='.\question3' style={{ textDecoration: "none" }}><img src={sl} className="btnc" width="180px" height="120px"></img></a>
                    <p className='txtc'>Slovakian</p>
                </div>
            </div>
        </div>
    );
}