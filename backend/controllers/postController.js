const Post = require('../models/Post');
const User = require('../models/User');

// Get all posts
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('author', 'username profilePicture')
      .sort({ createdAt: -1 });
    
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching posts' });
  }
};

// Get single post by ID
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id)
      .populate('author', 'username profilePicture bio');
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.status(200).json({ post });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching post' });
  }
};

// Create new post
exports.createPost = async (req, res) => {
  try {
    const { title, content, category, image } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: 'Please provide title and content' });
    }

    const post = new Post({
      title,
      content,
      category,
      image,
      author: req.user._id
    });

    await post.save();
    await post.populate('author', 'username profilePicture');

    res.status(201).json({ message: 'Post created successfully', post });
  } catch (error) {
    console.error('Create post error:', error);
    res.status(500).json({ message: 'Error creating post' });
  }
};

// Update post
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    const { title, content, category, image } = req.body;

    post.title = title || post.title;
    post.content = content || post.content;
    post.category = category || post.category;
    post.image = image || post.image;

    await post.save();
    await post.populate('author', 'username profilePicture');

    res.status(200).json({ message: 'Post updated successfully', post });
  } catch (error) {
    res.status(500).json({ message: 'Error updating post' });
  }
};

// Delete post
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    // Check if user is the author
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: 'Not authorized to delete this post' });
    }

    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting post' });
  }
};

// Like/Unlike post
exports.likePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    const userIndex = post.likes.indexOf(req.user._id);

    if (userIndex === -1) {
      // Like the post
      post.likes.push(req.user._id);
      post.likesCount = post.likes.length;
      await post.save();
      res.status(200).json({ message: 'Post liked', likes: post.likesCount });
    } else {
      // Unlike the post
      post.likes.splice(userIndex, 1);
      post.likesCount = post.likes.length;
      await post.save();
      res.status(200).json({ message: 'Post unliked', likes: post.likesCount });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error liking post' });
  }
};

// Get posts by user
exports.getPostsByUser = async (req, res) => {
  try {
    const posts = await Post.find({ author: req.params.userId })
      .populate('author', 'username profilePicture')
      .sort({ createdAt: -1 });
    
    res.status(200).json({ posts });
  } catch (error) {
    res.status(500).json({ message: 'Error fetching user posts' });
  }
};
