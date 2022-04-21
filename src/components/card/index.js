import React from "react";
import { Card, Avatar } from "antd";
import {
  LikeOutlined,
  DeleteOutlined,
  DislikeOutlined,
} from "@ant-design/icons";

import "./style.css";

const { Meta } = Card;
function MovieCard({ movie, deleteMovie, likeMovie ,disLikeMovie}) {
  return (
    <div className="card-container">
      <Card
        style={{ width: 300 }}
        actions={[
          <LikeOutlined key="like" onClick={() => likeMovie(movie.id)} />,
          <DislikeOutlined key="dislike" onClick={() => disLikeMovie(movie.id)} />,
          <DeleteOutlined key="delete" onClick={() => deleteMovie(movie.id)} />,
        ]}
      >
        <Meta
          title={movie.title}
          description={
            <div className="inline-text">
              <p>{movie.category}</p> &nbsp;
              <p>
                <LikeOutlined key="like" /> {movie.likes}
              </p>
              &nbsp;
              <p>
                <DislikeOutlined key="dislike" /> {movie.dislikes}
              </p>
            </div>
          }
        />
      </Card>
    </div>
  );
}

export default MovieCard;
