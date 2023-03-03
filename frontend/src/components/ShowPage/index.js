import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSongs } from '../../store/song';
import { fetchOneShow, loadOneShow } from '../../store/show';
import { useLocation, useParams } from 'react-router-dom';
import { loadVotes, updateVote } from '../../store/vote';
import './ShowPage.css';

const ShowPage = () => {
  const dispatch = useDispatch(),
    location = useLocation(),
    params = useParams(),
    showId = params.id;
  let show = useSelector((state) => state.shows.data[showId]),
    songs = useSelector((state) => state.songs.data)[showId],
    votes = useSelector((state) => state.votes.data),
    sessionId = useSelector((state) => state.session.user.id);

  useEffect(() => {
    if (location.state && show) {
      show = location.state.show;
    } else {
      dispatch(fetchOneShow(showId));
    }
    dispatch(fetchSongs(showId));
  }, [dispatch]);

  useEffect(() => {
    if (songs) {
      Object.keys(songs).forEach((key) => {
        const song = songs[key];
        dispatch(loadVotes(song.votes));
      });
    }
  }, [songs]);

  const countVotes = (vote, song) => {
    if (!vote) return '';
    const sum = vote.reduce((acc, cur) => (acc += cur.vote), 0);
    return sum;
  };
  // TO DO - be able to update the votes but only if one of the votes belongs to the current user
  const handleUpvote = (e) => {
    console.log(sessionId);
    const songId = parseInt(e.target.dataset.songId);
    const data = { songId, userId: sessionId, newVote: 1 };
    dispatch(updateVote(data));
    // debugger;
  };

  const handleDownvote = (e) => {
    console.log(sessionId);
    const songId = parseInt(e.target.dataset.songId);
    const data = { songId, userId: sessionId, newVote: -1 };
    dispatch(updateVote(data));
    // debugger;
  };
  const songsHTML = !songs
    ? null
    : Object.keys(songs).map((key) => {
        const song = songs[key];
        return (
          <li key={song.id} className="song-list-item">
            <p className="song-title">{song.title}</p>
            {Object.keys(votes).length === 0 ? null : (
              <div className="vote-container">
                <div className="vote-sum">
                  {countVotes(votes[song.id], song)}
                </div>
                <div className="up-downvote-container">
                  <div className="upvote" onClick={handleUpvote}>
                    <i
                      className="fa-solid fa-chevron-up fa-2xl"
                      data-song-id={song.id}
                    ></i>
                  </div>
                  <div className="downvote" onClick={handleDownvote}>
                    <i className="fa-solid fa-chevron-down fa-2xl"></i>
                  </div>
                </div>
              </div>
            )}
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
