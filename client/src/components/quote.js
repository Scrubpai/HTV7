import axios from 'axios';
import pos from 'parts-of-speech';
import './quote.css';
import React, { Children, useState, useEffect } from 'react';

const Quote = (props) => {
    const [quote, setQuote] = useState("");
    const lang = "fr";

    function getQuote() {
        console.log(props.passed)
        const options = {
            method: 'GET',
            url: 'https://quotes15.p.rapidapi.com/quotes/random/',
            params: { language_code: lang },
            headers: {
                'X-RapidAPI-Key': 'd807233e58mshe4172cb22b44dcfp1c1a72jsnc0d9956b5770',
                'X-RapidAPI-Host': 'quotes15.p.rapidapi.com'
            }
        };
        axios.request(options).then(function (response) {
            var out = {
                firstPart: "",
                noun: "",
                original: "",
                lastPart: ""
            };

            if (lang == "fr") {
                var NlpjsTFr = require('nlp-js-tools-french');
                var config = {
                    tagTypes: ['art', 'ver', 'nom'],
                    strictness: false,
                    debug: true
                };
                var nlpToolsFr = new NlpjsTFr(response.data.content, config);
                var taggedWords = nlpToolsFr.posTagger();
                const nounIndices = [];
                for (let i = 0; i < taggedWords.length; i++) {
                    var tag = taggedWords[i]["pos"][0];
                    console.log(tag);
                    if (tag == "NOM") {
                        nounIndices.push(i);
                    }
                }
                var replaceIndex = Math.floor(Math.random() * nounIndices.length);
                var passed = false;
                for (let i = 0; i < taggedWords.length; i++) {
                    if (i == nounIndices[replaceIndex]) {
                        out.noun = "(NOM) "
                        out.original = taggedWords[i]["word"] + " ";
                        passed = true;
                    }
                    else {
                        var toAdd = taggedWords[i]["word"] + " ";
                        if (!passed) {
                            out.firstPart += toAdd;
                        }
                        else {
                            out.lastPart += toAdd;
                        }
                    }
                }
            }
            else {
                var words = new pos.Lexer().lex(response.data.content);
                var tagger = new pos.Tagger();
                var taggedWords = tagger.tag(words);
                const nounIndices = [];
                for (let i = 0; i < taggedWords.length; i++) {
                    var tag = taggedWords[i][1];
                    if (tag.indexOf("NN") > -1 && i > 0 && taggedWords[i - 1][1] !== '\"') {
                        nounIndices.push(i);
                    }
                }
                var replaceIndex = Math.floor(Math.random() * nounIndices.length);
                var passed = false;
                for (let i = 0; i < taggedWords.length; i++) {
                    if (i == nounIndices[replaceIndex]) {
                        out.noun = "(NOUN)"
                        if (",.!?'\"\;\:".indexOf(words[i + 1]) == -1) {
                            out.noun += " ";
                        }
                        if (",.!?'\;\:".indexOf(words[i + 1]) > -1 || "'\"".indexOf(words[i]) > -1) {
                            out.original = words[i];
                        }
                        else {
                            out.original = words[i] + " ";
                        }
                        passed = true;
                    }
                    else {
                        var toAdd = "";
                        if (",.!?'\;\:".indexOf(words[i + 1]) > -1 || "'\"".indexOf(words[i]) > -1) {
                            toAdd = words[i];
                        }
                        else {
                            toAdd = words[i] + " ";
                        }
                        if (!passed) {
                            out.firstPart += toAdd;
                        }
                        else {
                            out.lastPart += toAdd;
                        }
                    }
                }
            }
            setQuote(out);
        }).catch(function (error) {
            console.error(error);
        });
    }

    useEffect(()=>{
        getQuote();
        if (props.passed){
            getQuote();
        }
    }, [])

    const [hover, setHover] = useState(false);
    function formatQuote(quote) {
        return (<p>
            {quote.firstPart}
            <span className="quote" onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
                {hover ? quote.original : quote.noun}</span>
            {quote.lastPart}
        </p>);
    }
    return (
        <div className="all">
            {formatQuote(quote)}
        </div>
    );
}

export default Quote