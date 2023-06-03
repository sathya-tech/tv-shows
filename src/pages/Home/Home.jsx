import React, { useState, useEffect } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './Home.css';
import MovieList from '../../components/MovieList';
import MovieListHeading from '../../components/MovieListHeading';
import SearchBox from '../../components/SearchBox';
import { useNavigate } from 'react-router';

const Home = () => {
	const [movies, setMovies] = useState([]);
	const [searchValue, setSearchValue] = useState('all');
	const [item, setItems] = useState();
	const [id, setId] = useState();

	
	const navigate = useNavigate();


	function clicked(id) {
		setId(id);
		navigate(`/${id}`);
	}

	const getMovieRequest = async (searchValue) => {
		const url = `https://api.tvmaze.com/search/shows?q=${searchValue}`;

		const response = await fetch(url);
		const responseJson = await response.json();

		if (responseJson) {
			setMovies(responseJson);
		}
	};

	useEffect(() => {
		getMovieRequest(searchValue);
	}, [searchValue]);


  return (
		<div className='container-fluid movie-app mt-5'>
			<div className='row d-flex align-items-center mt-4 mb-4'>
				<MovieListHeading heading='TV SHOWS' />
				<SearchBox searchValue={searchValue} setSearchValue={setSearchValue} />
			</div>
			<div className='row'>
			  	<MovieList
				  	onClick={clicked}
				  	movies={movies}
				  	setId={setId}
			  	/>
			</div>
		 </div>
	);
};

export default Home;
