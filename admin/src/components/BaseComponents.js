import React from 'react';
import './styles.css';

const Card = ({ title, value }) => (
  <div className="card">
    <h3>{title}</h3>
    <p>{value}</p>
  </div>
);

const Button = ({ children, onClick, type = 'button' }) => (
  <button type={type} className="btn" onClick={onClick}>
    {children}
  </button>
);

export { Card, Button };
