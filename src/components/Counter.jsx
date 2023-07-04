import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

const Counter = () => {
  const count = useSelector((state) => state.counter);
  const dispatch = useDispatch();

  return (
    <div>
      <h2>Counter</h2>
      <p>Count: {count}</p>
      <button onClick={() => dispatch({ type: 'counter/increment' })}>
        Increment
      </button>
      <button onClick={() => dispatch({ type: 'counter/decrement' })}>
        Decrement
      </button>
    </div>
  );
};

export default Counter;