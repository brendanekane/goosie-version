import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs } from '../../store/song';
import { getOneShow } from '../../store/show';
import { useLocation, useParams } from 'react-router-dom';
import { updateVote } from '../../store/vote';
import './ShowPage.css';

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

  // TO DO - be able to update the votes but only if one of the votes belongs to the current user

  const handleUpvote = () => {};
  const handleDownvote = () => {};

  const songsHTML = !songs
    ? null
    : songs.map((song) => {
        const voteSum = countVotes(song.votes);
        return (
          <li key={song.id} className="song-list-item">
            <p className="song-title">{song.title}</p>
            <div className="vote-container">
              <div className="vote-sum">{voteSum}</div>
              <div className="up-downvote-container">
                <div className="upvote" onClick={handleUpvote}>
                  {/* fa-2xl gives the icon the sizing */}
                  <i class="fa-solid fa-chevron-up fa-2xl"></i>
                </div>
                <div className="downvote" onClick={handleDownvote}>
                  <i class="fa-solid fa-chevron-down fa-2xl"></i>
                </div>
              </div>
            </div>
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
