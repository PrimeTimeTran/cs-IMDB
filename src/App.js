import React from 'react'
import {
  Col,
  Row,
  Button,
  ButtonGroup,
  Pagination,
  ListGroup,
} from 'react-bootstrap'

import ReactModal from 'react-modal'
import YouTube from '@u-wave/react-youtube'


import { NavBar } from './components/NavBar'
import { MovieCard } from './components/MovieCard'

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
    }
    this.getMovies()
    this.getGenres()
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

    this.setState({ pageNumber: pageNumber + 1, movies: newMovies, allMovies: newMovies })
  }

  onSortLeastToMostPopular = () => {
    let { allMovies } = this.state
    allMovies = allMovies.sort((a, b) => a.popularity - b.popularity)

    this.setState({ movies: allMovies })
  }

  onSortMostToLeastPopular = () => {
    let { allMovies } = this.state
    allMovies = allMovies.sort((a, b) => b.popularity - a.popularity)

    this.setState({ movies: allMovies })
  }

  onResetGenres = () => this.setState({ movies: this.state.allMovies })

  onFilterForGenre = genreId => {
    const filteredMovies = this.state.allMovies.filter(movie => movie.genre_ids.includes(genreId))
    this.setState({ movies: filteredMovies })
  }

  onSearchMovies() {
    const { search, allMovies } = this.state
    const filteredMovies = allMovies.filter(({ title, overview }) => title.includes(search) || overview.includes(search))
    this.setState({ movies: filteredMovies, search: '' })
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

  getGenreCount(id) {
    const allMovies = this.state.allMovies.filter(({ genre_ids }) => genre_ids.includes(id))
    return allMovies.length
  }

  renderGenreSelectionButtons() {
    const { genres } = this.state 
    return genres.map(({ name, id, }) => {
      if (this.getGenreCount(id) === 0) return
      return (
        <Button 
          onClick={() => this.onFilterForGenre(id)} 
          style={{ 
            margin: 0, 
            padding: 0, 
            fontSize: 20, 
            width: '30%', 
            height: '5rem', 
            fontWeight: 'bold', 
            backgroundColor: '#9F9FED' ,
          }}>
          {this.getGenreCount(id)}
          <br />
          {name}
        </Button>
      )
    })
  }

  renderToolbar() {
    return (
      <ButtonGroup aria-label="Basic example" style={{ marginTop: 15, marginBottom: 15 }}>
        <Button onClick={this.onSortMostToLeastPopular} style={{ backgroundColor: '#E3C5BB', fontSize: 30, fontWeight: 'bold', marginRight: 15 }}>Most Popular -> Least Popular</Button>
        <Button onClick={this.onSortLeastToMostPopular} style={{ backgroundColor: '#E3C5BB', fontSize: 30, fontWeight: 'bold'}}>Least Popular -> Most Popular</Button>
      </ButtonGroup>
    )
  }

  renderMovieListData() {
    const { allMovies, movies } = this.state

    if (allMovies.length > movies.length) {
      return (
        <Button onClick={this.onResetGenres} variant="success" style={{ marginTop: 300, height: 100, width: '100%', marginBottom: 15, fontWeight: 'bold', fontSize: 30, }}>
          See All {this.getTotalMoviesCount()} 
        </Button>
      )
    }
    return (
      <div style={{ marginTop: 300, height: 100, width: '100%', marginBottom: 15, fontWeight: 'bold', fontSize: 100, color: 'white' }}>
        {`Total: ${this.getTotalMoviesCount()}`} 
      </div>
    )
  }

  renderCategories() {
    return (
      <div style={{ width: '100%', height: '5%', marginBottom: 100, marginTop: 20 }}>
        <ListGroup>
          <ListGroup.Item>Most Popular</ListGroup.Item>
          <ListGroup.Item>New</ListGroup.Item>
          <ListGroup.Item>Highest Grossing</ListGroup.Item>
          <ListGroup.Item>Actors</ListGroup.Item>
          <ListGroup.Item>Genres</ListGroup.Item>
        </ListGroup>
      </div>
    )
  }

  renderMovies() {
    const { movies, genres } = this.state 
    return movies.map(movie => <MovieCard {...movie} genres={genres} movie={movie}/>)
  }

  handleOpenModal = () => {
    this.setState({ showModal: true });
  }
  
  handleCloseModal = () => {
    this.setState({ showModal: false });
  }
  

  renderPaginationBar() {
    const active = this.state.pageNumber - 1
    const pageItems = [<Pagination.First />]

    for (let number = 1; number <= 5; number++) {
      pageItems.push(
        <Pagination.Item id={number} onClick={this.onPageClick} key={number} active={number === active}>
          {number}
        </Pagination.Item>
      );
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
          <Col lg="3" style={sidebarStyle}>
            {this.renderCategories()}
            {this.renderMovieListData()}
            {this.renderGenreSelectionButtons()}
          </Col>
          <Col>
            {this.renderToolbar()}
            <Row style={movieContainerStyle}>
              {this.renderMovies()}
              <Button onClick={this.getMovies} variant="secondary" style={getMoreMoviesButtonStyle}>
                Get More
              </Button>
              {this.renderPaginationBar()}
            </Row>
          </Col>
          <ReactModal 
            isOpen={false}
            style={{
              overlay: {
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0, 0, 0, 0.75)',
              height: '100%',
              width: '100%',
              },
              content: {
                position: 'absolute',
                width: '50%',
                height: '50%',
                top: '30%',
                left: '30%',
                right: '30%',
                bottom: '30%',
                border: '1px solid #ccc',
                background: '#fff',
                overflow: 'auto',
                WebkitOverflowScrolling: 'touch',
                borderRadius: '4px',
                outline: 'none',
                padding: '20px'
              }
            }}
          >
          <button onClick={this.handleCloseModal}>Close Modal</button>
          <YouTube
            autoplay
            width="100%"
            height="100%"
            video="GOwfLBDMUHg"
          />
        </ReactModal>
        <button onClick={this.handleOpenModal}>Trigger Modal</button>
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
    display: 'flex', 
    flexWrap: 'wrap', 
    flexDirection: 'row', 
    backgroundColor: '#736CED', 
    justifyContent: 'space-around' 
  },
  movieContainerStyle: { 
    height: '100vh',
    overflowY: 'scroll', 
    justifyContent: 'space-around', 
  },
  getMoreMoviesButtonStyle: { 
    height: 100, 
    width: '90%', 
    marginBottom: 30 
  }
}