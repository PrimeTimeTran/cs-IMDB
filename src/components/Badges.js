import React from "react";
import { Badge } from "react-bootstrap";

function Badges(props) {
  const filteredGenres = props.genres.filter(genre =>
    props.movie.genre_ids.includes(genre.id)
  );
  const names = filteredGenres.map(({ name }) => name);
  return (
    <div>
      {names.map(name => (
        <Badge pill key={name} variant="success" style={{ margin: 5 }}>
          {name}
        </Badge>
      ))}
    </div>
  );
}

export default Badges;
