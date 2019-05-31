import React from 'react'
import {
  Card,
  Badge,
  ListGroup,
  ListGroupItem,
} from 'react-bootstrap'

import moment from 'moment'

const renderBadges = (genres, movie) => {
  const filteredGenres = genres.filter((genre) => movie.genre_ids.includes(genre.id))
  const names = filteredGenres.map(({ name }) => name)
  return names.map((name) => <Badge pill variant="success" style={{ margin: 5 }}>{name}</Badge>)
}

const MovieCard = ({
  title,
  movie,
  genres,
  overview,
  vote_count,
  popularity,
  release_date,
  vote_average,
  backdrop_path,
}) => {
  return (
    <Card key={title} style={{ width: '27rem', marginBottom: 20, marginTop: 20 }}>
      <Card.Img variant="top" src={`https://image.tmdb.org/t/p/w500/${backdrop_path}?api_key=4c5b4a5e627748117d4b24082672a9b4`} />
      <Card body>
        <Card.Title style={{ fontWeight: 'bold', fontSize: 60, height: 200 }}>
          {title}
        </Card.Title>
        {renderBadges(genres, movie)}
        <Card.Text style={{ fontSize: 40, height: '10rem', overflowY: 'scroll', marginTop: 10 }}>
          {overview}
        </Card.Text>
        <ListGroup className="list-group-flush">
          <ListGroupItem style={{ fontSize: 20}}>
            <span style={{ fontWeight: 'bold', fontSize: 50 }}>
              Ratings: {vote_average}
            </span> from {vote_count} votes
          </ListGroupItem>
          <ListGroupItem style={{ fontSize: 20}}>
            <span style={{ fontWeight: 'bold', fontSize: 50 }}>
              Popularity:
            </span> {popularity}
          </ListGroupItem>
          <ListGroupItem style={{ fontSize: 20}}><span style={{ fontWeight: 'bold', fontSize: 50 }}>
            Release Date: </span> {moment(release_date).format('LL')}<br /> <span style={{ fontWeight: 'lighter', fontSize: 50 }}>{moment(release_date).fromNow()}</span>
          </ListGroupItem>
        </ListGroup>
      </Card>
    </Card>
  )
}

export { MovieCard }
