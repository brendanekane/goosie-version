import { useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllShows } from '../../store/show';

const ShowsIndex = () => {
  const dispatch = useDispatch(),
    shows = useSelector((state) => state.shows);

  useEffect(() => {
    dispatch(getAllShows());
  }, [dispatch]);

  console.log(shows);
  if (!shows) return <h1>hi</h1>;
  return (
    <>
      <ol>
        {Object.keys(shows).map((key) => {
          return <li>{shows[key].venue}</li>;
        })}
      </ol>
    </>
  );
};

export default ShowsIndex;
