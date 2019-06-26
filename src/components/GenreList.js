import React from 'react'
import {
  Button,
} from 'react-bootstrap'


class GenreList extends React.Component {
  onFilterForGenre = genreId => {
    const filteredMovies = this.props.allMovies.filter(movie => movie.genre_ids.includes(genreId))
    this.props.updateForGenres(filteredMovies)
  }

  getGenreCount(id) {
    const allMovies = this.props.allMovies.filter(({ genre_ids }) => genre_ids.includes(id))
    return allMovies.length
  }

  render() {
    return (
      this.props.genres.map(({ name, id, }) => {
        if (this.getGenreCount(id) === 0) return null
        return (
          <Button
            onClick={() => this.onFilterForGenre(id)} 
            style={{
              fontSize: 12, 
              width: '30%',
              marginTop: 10,
              fontWeight: 'bold',
              backgroundColor: '#9F9FED',
            }}>
            <span style={{ fontSize: 25 }}>{this.getGenreCount(id)}</span>
            <br />
            {name}
          </Button>
        )
      })
    )
  }
}

export default GenreList


