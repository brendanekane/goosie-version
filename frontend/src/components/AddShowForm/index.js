import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createOneShow } from '../../store/show';

const AddShowForm = () => {
  const dispatch = useDispatch(),
    [venue, setVenue] = useState(''),
    [date, setDate] = useState(''),
    [name, setName] = useState('');

  const reset = () => {
    setVenue('');
    setDate('');
    setName('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formInput = {
      venue,
      date,
      name,
    };
    dispatch(createOneShow(formInput));
    reset();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="new-show-venue-container">
        <label htmlFor="new-show-venue-input">Venue</label>
        <input
          type="text"
          id="new-show-venue-input"
          value={venue}
          onChange={(e) => setVenue(e.target.value)}
        />
      </div>
      <div className="new-show-date-container">
        <label htmlFor="new-show-date-input">Date</label>
        <input
          type="date"
          id="new-show-date-input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>
      <div className="new-show-name-container">
        <label htmlFor="new-show-name-input">Name</label>
        <input
          type="text"
          id="new-show-name-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
    </form>
  );
};

export default AddShowForm;
