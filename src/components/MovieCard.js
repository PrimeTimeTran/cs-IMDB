import React from 'react'
import {
  Card,
  Badge,
  Button,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap'

import moment from 'moment'

const renderBadges = (genres, movie) => {
  const filteredGenres = genres.filter((genre) => movie.genre_ids.includes(genre.id))
  const names = filteredGenres.map(({ name }) => name)
  return names.map((name) => <Badge pill key={name} variant="success" style={{ margin: 5 }}>{name}</Badge>)
}

const MovieCard = ({
  title,
  movie,
  genres,
  overview,
  popularity,
  onClickMovie,
  vote_count: voteCount,
  release_date: releaseDate,
  vote_average: voteAverage,
  backdrop_path: backdropPath,
}) => {
  return (
    <Card key={title} style={{ width: '20rem', marginBottom: 20, marginTop: 20 }}>
      <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${backdropPath}?api_key=4c5b4a5e627748117d4b24082672a9b4`} />
      <Card body>
        <Card.Title style={{ fontWeight: 'bold', fontSize: 30, height: 100 }}>
          {title}
        </Card.Title>
        {renderBadges(genres, movie)}
        <Card.Text style={{ fontSize: 20, height: '15rem', overflowY: 'scroll', marginTop: 10 }}>
          {overview}
        </Card.Text>
          <Button className="btn btn-success btn-lg" onClick={() => onClickMovie(movie.id)} style={{ marginBottom: 15 }}>
            Red
          </Button>
        <ListGroup className="list-group-flush">
          <ListGroupItem style={{ fontSize: 15 }}>
            <span style={{ fontWeight: 'bold', fontSize: 20 }}>
              Ratings: {voteAverage}
            </span> from {voteCount} votes
          </ListGroupItem>
          <ListGroupItem style={{ fontSize: 15 }}>
            <span style={{ fontWeight: 'bold', fontSize: 20 }}>
              Popularity:
            </span> {popularity}
          </ListGroupItem>
          <ListGroupItem style={{ fontSize: 15 }}><span style={{ fontWeight: 'bold', fontSize: 20 }}>
            Release Date: </span> {moment(releaseDate).format('LL')}<br /> <span style={{ fontWeight: 'lighter', fontSize: 30 }}>{moment(releaseDate).fromNow()}</span>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </Card>
  )
}

export { MovieCard }
