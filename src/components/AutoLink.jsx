import React from 'react';
import { Link } from 'react-router-dom';

// Utility function to check if the value is an email
const isEmail = (value) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(value);
};

// Utility function to check if the value is a phone number
const isPhoneNumber = (value) => {
  const phoneRegex = /^\+?\d[\d\s]+$/;
  return phoneRegex.test(value);
};

// Utility function to check if the value is a location (assuming a string with spaces or specific characters)
const isLocation = (value) => {
  const locationRegex = /^[a-zA-Z0-9\s,.-]+$/;
  return locationRegex.test(value) && !isPhoneNumber(value);
};

// The AutoLink Component
const AutoLink = ({ value }) => {
  if (isEmail(value)) {
    return <Link to={`mailto:${value}`}>{value}</Link>;
  }

  if (isPhoneNumber(value)) {
    return <Link to={`tel:${value}`} target="_blank">{value}</Link>;
  }

  if (isLocation(value)) {
    const googleMapsLink = `https://www.google.com/maps/place/${encodeURIComponent(value)}`;
    return <Link to={googleMapsLink} target="_blank" rel="noopener noreferrer">{value}</Link>;
  }

  return <span>{value}</span>; // Fallback in case it's neither
};

export default AutoLink;
