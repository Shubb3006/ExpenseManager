"use client";
import { useState } from "react";

export default function DateFilterForm({ onFilter }) {
  const [date, setDate] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    onFilter(date);
  }

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        required
      />
      <button type="submit">Filter</button>
    </form>
  );
}
