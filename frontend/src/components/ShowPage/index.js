import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs } from '../../store/song';
import { getOneShow } from '../../store/show';
import { useLocation, useParams } from 'react-router-dom';

const ShowPage = () => {
  const dispatch = useDispatch(),
    location = useLocation(),
    params = useParams(),
    showId = params.id,
    songs = useSelector((state) => state.songs)[showId];
  let show = useSelector((state) => state.shows[showId]);

  useEffect(() => {
    if (location.state && show) {
      show = location.state.show;
    } else {
      dispatch(getOneShow(showId));
    }

    dispatch(fetchSongs(showId));
  }, [dispatch]);

  const countVotes = (votes) => {
    const sum = votes.reduce((acc, cur) => (acc += cur.vote), 0);
    return sum;
  };

  const songsHTML = !songs
    ? null
    : songs.map((song) => {
        const voteSum = countVotes(song.votes);
        return (
          <li key={song.id}>
            <h3>{song.title}</h3>
            <div>{voteSum}</div>
          </li>
        );
      });

  const showPageHTML = !show ? null : (
    <>
      <h1>{show.venue}</h1>
      <h3>{show.location}</h3>
      <h3>{show.date}</h3>
      <ol>{songsHTML}</ol>
    </>
  );

  return showPageHTML;
};

export default ShowPage;
