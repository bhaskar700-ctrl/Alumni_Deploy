import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const CommentList = ({ comments }) => {
  return (
    <div className="mt-4">
      {comments.map((comment) => {
        // Extracting personalDetails here for clarity
        const personalDetails = comment.author?.personalDetails;

        if (!personalDetails) {
          return null; // Skip rendering if personalDetails are not available
        }

        const { firstName, lastName, profilePicture } = personalDetails;

        return (
          <div
            key={comment._id}
            className="mt-2 p-2 bg-gray-100 rounded flex items-center"
          >
            {profilePicture ? (
              <img
                src={profilePicture}
                alt={`${firstName} ${lastName}`}
                className="h-10 w-10 rounded-full mr-2"
              />
            ) : (
              <FontAwesomeIcon
                icon={faUser}
                className="h-10 w-10 rounded-full mr-2 text-gray-400"
              />
            )}
            <div>
              <p className="text-sm text-gray-600">
                Author: {firstName} {lastName}
              </p>
              <p>{comment.content}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default CommentList;
