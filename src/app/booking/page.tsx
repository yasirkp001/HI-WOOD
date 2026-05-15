import React from 'react';
import { Metadata } from 'next';
import BookingClient from './BookingClient';

export const metadata: Metadata = {
  title: 'Book a Consultation | HI WOOD Timber Services',
  description: 'Schedule a precision milling session, furniture design consultation, or timber supply inquiry with our expert sawyers. Expert guidance for your next project.',
  openGraph: {
    title: 'Book Your Consultation | HI WOOD',
    description: 'Schedule a session with our expert timber craftsmen.',
  },
};

export default function BookingPage() {
  return <BookingClient />;
}
