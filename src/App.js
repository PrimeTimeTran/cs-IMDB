import React from 'react'
import {
  Col,
  Row,
  Button,
  ListGroup,
  Pagination,
  ButtonGroup,
} from 'react-bootstrap'

import ReactModal from 'react-modal'
import YouTube from '@u-wave/react-youtube'

import { NavBar } from './components/NavBar'
import { MovieCard } from './components/MovieCard'
import GenreList from './components/GenreList'

import './App.css'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      search: '',
      movies: [],
      genres: [],
      pageNumber: 1,
      allMovies: [],
      showModal: false,
    }
    this.getGenres()
    this.getMovies()
  }

  async componentDidMount() {
    const response = await fetch('https://api.github.com/repos/Facebook/react/issues?page=1')
    const jsonData = await response.json()
  }

  async getGenres() {
    const response = await fetch('https://api.themoviedb.org/3/genre/movie/list?api_key=4c5b4a5e627748117d4b24082672a9b4&language=en-US')
    const { genres } = await response.json()
    this.setState({ genres })
  }

  getMovies = async() => {
    const { pageNumber } = this.state
    const response = await fetch(`https://api.themoviedb.org/3/movie/top_rated?api_key=4c5b4a5e627748117d4b24082672a9b4&page=${pageNumber}`)
    const data = await response.json()
    const movies = data.results
    const newMovies = this.state.movies.concat(movies)

    this.setState({ 
      movies: newMovies, 
      allMovies: newMovies,
      pageNumber: pageNumber + 1, 
    })
  }

  onSortLeastToMostPopular = () => {
    let { allMovies } = this.state
    allMovies = allMovies.sort((a, b) => a.popularity - b.popularity)

    this.setState({ 
      movies: allMovies 
    })
  }

  onSortMostToLeastPopular = () => {
    let { allMovies } = this.state
    allMovies = allMovies.sort((a, b) => b.popularity - a.popularity)

    this.setState({ 
      movies: allMovies 
    })
  }

  onResetGenres = () => this.setState({ movies: this.state.allMovies })

  onSearchMovies() {
    const { search, allMovies } = this.state
    const filteredMovies = allMovies.filter(({ title, overview }) => title.includes(search) || overview.includes(search))
    this.setState({ 
      search: '',
      movies: filteredMovies, 
    })
  }

  onPageClick = async(e) => {
    const id = e.target.id
    const { movies } = this.state
    const response = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=4c5b4a5e627748117d4b24082672a9b4&page=${id}`)
    const data = await response.json()
    this.setState({ movies: movies.concat(data.results), pageNumber: id })
  }

  getTotalMoviesCount() {
    return this.state.allMovies.length || this.state.movies.length
  }

  renderGenreSelectionButtons() {
    const { genres, allMovies } = this.state 
    return <GenreList genres={genres} allMovies={allMovies} updateForGenres={(filteredMovies) => this.setState({ movies: filteredMovies})}/>
  }

  renderToolbar() {
    return (
      <ButtonGroup aria-label="Basic example" style={{ marginTop: 15, marginBottom: 15 }}>
        <Button onClick={this.onSortMostToLeastPopular} style={{ backgroundColor: '#E3C5BB', fontSize: 20, fontWeight: 'bold', marginRight: 15 }}>
          Most Popular -> Least Popular
        </Button>
        <Button onClick={this.onSortLeastToMostPopular} style={{ backgroundColor: '#E3C5BB', fontSize: 20, fontWeight: 'bold'}}>
          Least Popular -> Most Popular
        </Button>
      </ButtonGroup>
    )
  }

  renderMovieListData() {
    const { allMovies, movies } = this.state

    if (allMovies.length > movies.length) {
      return (
        <Button onClick={this.onResetGenres} variant="success" style={{ marginTop: 30, height: 60, width: '100%', marginBottom: 15, fontWeight: 'bold', fontSize: 30, }}>
          See All {this.getTotalMoviesCount()} 
        </Button>
      )
    }
    return (
      <div style={{ marginTop: 20, height: 50, width: '100%', fontWeight: 'bold', fontSize: 30, color: 'white' }}>
        {`Total: ${this.getTotalMoviesCount()}`} 
      </div>
    )
  }

  renderCategories() {
    return (
        <ListGroup>
          <ListGroup.Item>Most Popular</ListGroup.Item>
          <ListGroup.Item>New</ListGroup.Item>
          <ListGroup.Item>Highest Grossing</ListGroup.Item>
          <ListGroup.Item>Actors</ListGroup.Item>
          <ListGroup.Item>Genres</ListGroup.Item>
        </ListGroup>
    )
  }

  onClickMovie = async movieId => {
    const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=4c5b4a5e627748117d4b24082672a9b4`)
    const { results }  = await response.json()

    if (results.length > 0) {
      var item = results[Math.floor(Math.random()*results.length)];
      this.setState({ focusedMovieCode: item.key, showModal: true })
    }
  }

  renderMovieItem = movie => {
    const { genres } = this.state 
    return (
      <MovieCard
        {...movie}
        movie={movie}
        genres={genres}
        onClickMovie={this.onClickMovie}
      />
    )
  }

  renderMovies() {
    const { movies } = this.state 
    return movies.map(this.renderMovieItem)
  }

  renderPaginationBar() {
    const active = this.state.pageNumber - 1
    const pageItems = [<Pagination.First />]

    for (let number = active - 3; number <= active + 3; number++) {
      if (number > 0){
        pageItems.push(
          <Pagination.Item key={number} id={number} onClick={this.onPageClick} active={number === active}>
            {number}
          </Pagination.Item>
        );
      }
    }
    pageItems.push(<Pagination.Last />)
    return <Pagination size="lg">{pageItems}</Pagination>
  }

  render() {
    const { 
      sidebarStyle,
      containerStyle,
      primaryRowStyle,
      movieContainerStyle,
      getMoreMoviesButtonStyle,
    } = styles  

    return (
      <div style={containerStyle}>
        <NavBar />
        <Row style={primaryRowStyle}> 
          <Col lg="2" style={sidebarStyle}>
            {/* {this.renderCategories()} */}
            {/* {this.renderMovieListData()} */}
            <div style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-around' }}>
              {this.renderGenreSelectionButtons()}
            </div>
          </Col>
          <Col>
            {this.renderToolbar()}
            <Row style={movieContainerStyle}>
              {this.renderMovies()}
            </Row>
            <div 
              style={{
                paddingTop: 10,
                display: 'flex',
                alignItems: 'center',
                flexDirection: 'column',
                justifyContent: 'center',
              }}
            >
              <Button onClick={this.getMovies} variant="primary" style={getMoreMoviesButtonStyle}>
                Get More
              </Button>
              {/* {this.renderPaginationBar()} */}
            </div>
          </Col>
          <ReactModal 
            isOpen={this.state.showModal}
            onRequestClose={() => this.setState({ showModal: false })}
            style={{
              overlay: {
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                position: 'fixed',
                backgroundColor: 'rgba(0, 0, 0, 0.75)',
              },
              content: {
                top: '10%',
                left: '10%',
                right: '10%',
                width: '80%',
                bottom: '10%',
                height: '80%',
                outline: 'none',
                padding: '20px',
                overflow: 'auto',
                background: '#fff',
                borderRadius: '4px',
                position: 'absolute',
                border: '1px solid #ccc',
                WebkitOverflowScrolling: 'touch',
              }
            }}
          >
          <YouTube
            autoplay
            width="100%"
            height="100%"
            video={this.state.focusedMovieCode}
          />
        </ReactModal>
        </Row>
      </div>
    )
  }
}

export default App

const styles = {
  containerStyle: { 
    width: '100vw', 
    height: '100%', 
    overflow: 'auto',
    alignItems: 'center',
    justifyContent: 'space-around',
  },
  primaryRowStyle: { 
    marginLeft: 0,
    justifyContent: 'space-around',
  },
  sidebarStyle: { 
    paddingTop: 10,
    backgroundColor: '#736CED', 
    justifyContent: 'space-around',
  },
  movieContainerStyle: { 
    height: '100vh',
    overflowY: 'scroll', 
    justifyContent: 'space-around', 
  },
  getMoreMoviesButtonStyle: { 
    height: 50, 
    width: '50%', 
    marginBottom: 30 
  }
}