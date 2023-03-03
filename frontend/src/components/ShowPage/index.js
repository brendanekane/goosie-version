import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs } from '../../store/song';
import { getOneShow, fetchOneShow } from '../../store/show';
import { useLocation, useParams } from 'react-router-dom';
import './ShowPage.css';

const ShowPage = () => {
  const dispatch = useDispatch(),
    location = useLocation(),
    params = useParams(),
    showId = params.id,
    songs = useSelector((state) => state.songs.data)[showId];
  let show = useSelector((state) => state.shows.data[showId]);

  useEffect(() => {
    if (location.state && show) {
      show = location.state.show;
    } else {
      dispatch(fetchOneShow(showId));
    }
    dispatch(fetchSongs(showId));
  }, [dispatch]);

  const countVotes = (vote) => {
    const sum = vote.reduce((acc, cur) => (acc += cur.vote), 0);
    return sum;
  };

  // TO DO - be able to update the votes but only if one of the votes belongs to the current user
  const handleUpvote = () => {};
  const handleDownvote = () => {};
  const songsHTML = !songs
    ? null
    : songs.map((song) => {
        return (
          <li key={song.id} className="song-list-item">
            <p className="song-title">{song.title}</p>
            {/* <div className="vote-container">
              <div className="vote-sum">{voteSum}</div>
              <div className="up-downvote-container">
                <div className="upvote" onClick={handleUpvote}>
                  <i className="fa-solid fa-chevron-up fa-2xl"></i>
                </div>
                <div className="downvote" onClick={handleDownvote}>
                  <i className="fa-solid fa-chevron-down fa-2xl"></i>
                </div>
              </div>
            </div> */}
          </li>
        );
      });
  console.log(show);
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
