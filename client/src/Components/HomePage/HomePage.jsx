import React from 'react';
import "./HomePage.css";
import blog from './blog';

const HomePage = () => {
  return (
    <div id="home">
      <h1>Blogs</h1>
      {blog.map((content, index) => (
        <div key={`blog-${index}`} className="blog-box">
          <p className="date">{content.date}</p>
          <h4 className='title'>{content.title}</h4>
          <p className="content">{content.content}</p>
        </div>
      ))}
    </div>
  );
};

export default HomePage;
