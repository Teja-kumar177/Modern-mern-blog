import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, MessageCircle, User, Calendar } from 'lucide-react';

const PostCard = ({ post }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
      {/* Post Image */}
      <img
        src={post.image}
        alt={post.title}
        className="w-full h-48 object-cover"
      />

      {/* Post Content */}
      <div className="p-6">
        {/* Category */}
        <span className="inline-block bg-blue-100 text-blue-800 text-sm px-2 py-1 rounded-full mb-3">
          {post.category}
        </span>

        {/* Title */}
        <Link to={`/post/${post._id}`}>
          <h3 className="text-xl font-bold text-gray-900 mb-3 hover:text-blue-600 transition-colors">
            {post.title}
          </h3>
        </Link>

        {/* Content Preview */}
        <p className="text-gray-600 mb-4 line-clamp-3">
          {post.content.substring(0, 150)}...
        </p>

        {/* Author Info */}
        <div className="flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center space-x-2">
            <img
              src={post.author?.profilePicture}
              alt={post.author?.username}
              className="h-6 w-6 rounded-full"
            />
            <span>By {post.author?.username}</span>
          </div>

          <div className="flex items-center space-x-1">
            <Calendar className="h-4 w-4" />
            <span>{formatDate(post.createdAt)}</span>
          </div>
        </div>

        {/* Stats */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t">
          <div className="flex items-center space-x-4 text-sm text-gray-500">
            <div className="flex items-center space-x-1">
              <Heart className="h-4 w-4" />
              <span>{post.likesCount || 0} likes</span>
            </div>
          </div>

          <Link
            to={`/post/${post._id}`}
            className="text-blue-600 hover:text-blue-800 text-sm font-medium"
          >
            Read More →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
