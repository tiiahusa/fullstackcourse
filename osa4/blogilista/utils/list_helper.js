const blog = require("../models/blog")

const dummy = (blogs) => {
    return 1
  }

const totalLikes = (blogs) => {
    return blogs.reduce((sum, blog) => sum + blog.likes, 0)
  }

const favoriteBlog = (blogs) => {
    if(blogs.length === 0) {
        return 0
    }
    return blogs.reduce((max, blog) => (blog.likes > max.likes ? blog : max), blogs[0])
  }

  const mostBlogs = (blogs) => {
    if (blogs.length === 0) {
      return { author: '', blogs: 0 };
    }
  
    // Lasketaan blogien määrä kirjoittajaa kohden
    const blogCountByAuthor = blogs.reduce((acc, blog) => {
      acc[blog.author] = (acc[blog.author] || 0) + 1;
      return acc;
    }, {});
  
    // Löydetään kirjoittaja, jolla on eniten blogeja
    const mostBlogsAuthor = Object.entries(blogCountByAuthor).reduce((max, [author, blogs]) => {
      return blogs > max.blogs ? { author, blogs } : max;
    }, { author: '', blogs: 0 });
  
    return mostBlogsAuthor;
}

const mostLikes = (blogs) => {
    if (blogs.length === 0) {
        return { author: '', blogs: 0 };return 0;
      }
    
      // Lasketaan tykkäysten määrä kirjoittajaa kohden
      const likesByAuthor = blogs.reduce((acc, blog) => {
        acc[blog.author] = (acc[blog.author] || 0) + blog.likes;
        return acc;
      }, {});
    
      // Löydetään kirjoittaja, jolla on eniten tykkäyksiä
      const mostLikesAuthor = Object.entries(likesByAuthor).reduce((max, [author, likes]) => {
        return likes > max.likes ? { author, likes } : max;
      }, { author: '', likes: 0 });
    
      return mostLikesAuthor;
}  

  module.exports = {
    dummy, totalLikes, favoriteBlog, mostBlogs, mostLikes
  }