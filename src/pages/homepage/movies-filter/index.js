import React, { useState } from "react";
import { Select } from "antd";

const { Option } = Select;

function MoviesFilter({ categories, filterMovies }) {
  return (
    <div className="container">
      <h3>Filter movies</h3>
      <Select
        mode="multiple"
        allowClear
        style={{ width: "100%" }}
        placeholder="Please select"
        onChange={filterMovies}
      >
        {categories.map((movie) => (
          <Option key={movie}>{movie}</Option>
        ))}
      </Select>
      <br />
    </div>
  );
}

export default MoviesFilter;
