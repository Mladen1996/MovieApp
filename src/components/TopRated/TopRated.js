import React from 'react';
import {API_URL, API_KEY, IMAGE_BASE_URL,POSTER_SIZE,BACKDROP_SIZE} from '../../config';
import HeroImage from '../elements/HeroImage/HeroImage';
import SearchBar from '../elements/SearchBar/SearchBar';
import FourColGrid from '../elements/FourColGrid/FourColGrid';
import MovieThumb from '../elements/MovieThumb/MovieThumb';
import LoadMoreBtn from '../elements/LoadMoreBtn/LoadMoreBtn';
import Spinner from '../elements/Spinner/Spinner';
import '../Home/Home.css';


class TopRated extends React.Component{

    state = {
        movies: [],
        heroImage: null,
        loader: false,
        currnetPage: 0,
        totalPages: 0,
        searchTerm: ''
      };
    
      componentDidMount() {
        if (localStorage.getItem('TopRatedState')) {
          const state = JSON.parse(localStorage.getItem('TopRatedState'));
          this.setState({ ...state });
        } else {
    
          this.setState({ loader: true });
          const endpoint = `${API_URL}movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
    
          this.fetchItems(endpoint);
        }
      };
    
      searchItems = (searchTerm) => {
        console.log(searchTerm)
        let endpoint = '';
        this.setState({
          movies: [],
          loader: true,
          searchTerm: searchTerm
        })
        if (searchTerm === '') {
          endpoint = `${API_URL}movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`;
        } else {
          endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${searchTerm}`;
        }
        this.fetchItems(endpoint);
      };
    
      loadMoreItems = () => {
        let endpoint = '';
        this.setState({ loader: true });
    
        if (this.state.searchTerm === '') {
          endpoint = `${API_URL}movie/top_rated?api_key=${API_KEY}&language=en-US&page=${this.state.currnetPage + 1}`;
        } else {
          endpoint = `${API_URL}search/movie?api_key=${API_KEY}&language=en-US&query=${this.state.searchTerm}&page=${this.state.currnetPage + 1}`
        }
        this.fetchItems(endpoint);
      };
    
    
      fetchItems = (endpoint) => {
        fetch(endpoint).then(result => result.json())
          .then(result => {
            console.log(result);
            this.setState({
              movies: [...this.state.movies, ...result.results],
              heroImage: this.state.heroImage || result.results[0],
              loader: false,
              currnetPage: result.page,
              totalPages: result.totalPages
            }, () => {
              if (this.state.searchTerm === '') {
                localStorage.setItem('TopRatedState', JSON.stringify(this.state));
              }
            })
          })
      };
    
      render() {
        const { movies, heroImage, loader, searchTerm } = this.state;

        console.log(this.state.movies);
    
        return (
          <div className="rmdb-home">
            {heroImage ?
              <div>
                <HeroImage
                  image={`${IMAGE_BASE_URL}${BACKDROP_SIZE}${heroImage.backdrop_path}`}
                  title={heroImage.original_title}
                  text={heroImage.overview}
                />
                <SearchBar callback={this.searchItems} />
              </div> : null}
            <div className="rmdb-home-grid">
              <FourColGrid
                header={searchTerm ? 'Search Result' : 'Top Rated Movies'}
                loader={loader}
              >
                {
                
                movies.map((element, i) => (
                  
                 <MovieThumb
                    key={i}
                    clickable={true}
                    image={element.poster_path ? `${IMAGE_BASE_URL}${POSTER_SIZE}${element.poster_path}` : './images/no_image.jpg'}
                    movieId={element.id}
                    movieName={element.original_title}
                    category="top-rated"
                /> 
        ))}
    
              </FourColGrid>
              {loader ? <Spinner /> : null}
              <LoadMoreBtn text="Load More" onClick={this.loadMoreItems} />
            </div>
    
          </div>
    
        )
      }
}

export default TopRated;