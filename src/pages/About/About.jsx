import React from 'react'
import './About.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { useState,useEffect } from 'react';
import Description from '../../components/Description';
import Genre from '../../components/Genre';
import CircleRating from '../../components/CircleRating/CircleRating';
import Status from '../../components/Status';
import Writer from '../../components/Writer';
import { useNavigate, useParams } from 'react-router';

const About = () => {
    const [movies, setMovies] = useState([]);
    const navigate = useNavigate();
	
    const { id } = useParams();

	const getMovieRequest = async () => {
		const url = `https://api.tvmaze.com/shows/${id}`;

		const response = await fetch(url);
        const responseJson = await response.json();
        
        if (responseJson) {
			setMovies(responseJson);
		}

    };
    
    useEffect(() => {
		getMovieRequest();
    }, []);
    
    useEffect(() => {
        localStorage.setItem("moviesData",JSON.stringify(movies));
	},[movies])
    
    const year = movies?.premiered?.slice(0, 4);
    const description = movies?.summary?.replace(/<p>|<b>|/gi,'');

    const rating = movies?.rating?.average;
        
    const handleClick = () => {
        navigate('/');
    }

    const handleBook = () => {
        navigate('/register');
    }

    return (
        <>
            {/* <div className="container"> */}
                <div className='row mt-2'>
                    <div className='col-xs-6 col-sm-10 col-md-7 col-lg-6 col-xl-5 mt-5 px-5'>
                        <img src={movies?.image?.original} className='img' alt="" />
                    </div>
 
                    <div className='px-5 col-xs-8 col-sm-8 col-md-4 col-lg-5 col-xl-6 px-2 mx-sm-auto mx-md-auto  mt-5'>
                        <h1 className="modal-title title text-white">{movies.name} <span>({year})</span></h1>
                        <Genre genres={movies?.genres} />
                        <div className='mt-2 my-4'>
                            {rating && <CircleRating rating={rating?.toFixed(1)} />}
                            {!rating && <span class="badge bg-info">No Rating</span>}
                        </div>
                    
                        <Description description={description} />

                        <div className='mt-5'>
                            <Status data={movies} />
                        </div>
                        
                        <Writer data={movies} />

                        <button onClick={handleBook} type="button" class="btn btn-dark mt-2 my-3 mx-2">Book Tickets</button>
                        <button onClick={handleClick} type="button" class="btn btn-dark mt-2 my-3">Home</button>
                        
                        <div>
                            
                        </div>
                    
                    

                    </div>
                </div>            
        </>
            
    )
}

export default About