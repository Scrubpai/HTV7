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
            <h3 className="title2">Select a GameMode:</h3>
            
                <a href='.\main' style={{ textDecoration: "none" }}>
                        <div className="gamemode">
                            <h1>Free for all 🫂</h1>
                            <p style={{fontSize: "20px"}}>
                                Practice speaking about any topic with a partner in the language you choose. You decide!
                            </p>
                        </div>
                    </a>
                    <a href='.\main' style={{ textDecoration: "none" }}>
                        <div className="gamemode">
                            <h1>Ad libs 👄</h1>
                            <p style={{fontSize: "20px"}}>
                                Given a quote, can you fill in the noun that's missing? Our most popular teaching game!
                            </p>
                        </div>
                    </a>
                    <a href='.\main' style={{ textDecoration: "none" }}>
                        <div className="gamemode">
                            <h1>Book Race 📚</h1>
                            <p style={{fontSize: "20px"}}>
                                Read the book excerpt faster than your partner. No time to waste, GO GO GO!
                            </p>
                        </div>
                    </a>
        </div>
    );
}