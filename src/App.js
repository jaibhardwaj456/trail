'use client'

import React from 'react';
import { useState } from 'react';
import {useEffect} from 'react';
import MovieCard from './MovieCard';
import './App.css';
import axios from 'axios';
import SearchIcon from './search.svg';

const API_URL = 'http://www.omdbapi.com/?apikey=8da2be68';

const App = () => {

    const [movies,setMovies] = useState([]);
    const [searchTerm,setSearchTerm] = useState('');
    const searchMovies = async (title) => {
        // alert('Data Found');
        const response = await axios.get(`${API_URL}&s=${title}`);
        // const response = await fetch(`${API_URL}&s=${title}`);
        console.log(response);
        const data = await response.data;
        setMovies(data.Search);
    }
    useEffect(()=> {
        searchMovies('Ironman');
    },[]);
    return (
        <div className="app">
            <h1>MovieLand</h1>

            <div className="search">
                <input
                    placeholder="Search for movies"
                    value={searchTerm}
                    onChange={(e)=> setSearchTerm(e.target.value)}
                />
                <img
                    src={SearchIcon}
                    alt='search'
                    onClick={() => searchMovies(searchTerm)}
                />
            </div>
            {
                movies?.length>0
                ? (
                    <div className="container">
                        {movies.map((movie) => (
                            <MovieCard movie = {movie}/>
                        ))}
                    </div>  
                ) : (
                    <div className="empty">
                        <h2>No movies found</h2>
                    </div>
                )

            }
            
        </div>

        
    );
}

export default App;