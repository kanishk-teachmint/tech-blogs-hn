import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css';

const App = () => {
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        // Replace this URL with the actual endpoint of the API providing the dev blogs
        const response = await axios.get('http://localhost:3000/api/articles');
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching the dev blogs:', error);
      }
    };

    fetchPosts();

    const interval = setInterval(() => {
      fetchPosts();
    }, 21600000); // 6 hours in milliseconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="App">
      <header>
        <h1>Hacker News Style Dev Blogs</h1>
      </header>
      <main>
        {loading ? (
          <p>Loading...</p>
        ) : (
          <ul>
            {posts.map((post, index) => (
              <li key={index}>
                <span className="post-number">{index + 1}.</span>
                <div className="post-details">
                  <a href={post.link} target="_blank" className="post-title">
                    {post.title}
                  </a>
                  <span className="post-url">({new URL(post.link).hostname})</span>
                </div>
              </li>
            ))}
          </ul>
        )}
      </main>
      <footer>
        <a href="https://news.ycombinator.com/">Hacker News</a>
      </footer>
    </div>
  );
};

export default App;


// [
//   {
//     "title": "Understanding React Hooks",
//     "url": "https://blog.company.com/react-hooks",
//     "excerpt": "A deep dive into React hooks and how to use them effectively in your applications."
//   },
//   {
//     "title": "10 Tips for Writing Clean Code",
//     "url": "https://blog.anothercompany.com/clean-code-tips",
//     "excerpt": "Improve your code quality with these 10 tips for writing clean, maintainable code."
//   },
//   {
//     "title": "Introduction to TypeScript",
//     "url": "https://devblog.example.com/typescript-introduction",
//     "excerpt": "Get started with TypeScript, a typed superset of JavaScript that compiles to plain JavaScript."
//   },
//   {
//     "title": "How to Use Docker for Local Development",
//     "url": "https://techblog.example.com/docker-local-development",
//     "excerpt": "Learn how to set up Docker for local development environments to ensure consistency across different stages of your project."
//   },
//   {
//     "title": "Scaling Your Node.js Applications",
//     "url": "https://engineering.example.com/scaling-nodejs",
//     "excerpt": "Techniques and best practices for scaling Node.js applications to handle large traffic volumes."
//   },
//   {
//     "title": "A Guide to CSS Grid",
//     "url": "https://frontend.example.com/css-grid-guide",
//     "excerpt": "Master CSS Grid layout with this comprehensive guide, including practical examples and use cases."
//   },
//   {
//     "title": "Building RESTful APIs with Express",
//     "url": "https://backend.example.com/restful-apis-express",
//     "excerpt": "Step-by-step tutorial on building RESTful APIs using the Express framework in Node.js."
//   },
//   {
//     "title": "An Introduction to GraphQL",
//     "url": "https://api.example.com/graphql-introduction",
//     "excerpt": "Learn the basics of GraphQL and how it differs from traditional REST APIs."
//   },
//   {
//     "title": "Effective Debugging Techniques",
//     "url": "https://devblog.example.com/debugging-techniques",
//     "excerpt": "Tips and tools for debugging your code more effectively and efficiently."
//   },
//   {
//     "title": "Understanding Asynchronous JavaScript",
//     "url": "https://jsblog.example.com/async-javascript",
//     "excerpt": "A comprehensive look at asynchronous programming in JavaScript, including callbacks, promises, and async/await."
//   },
//   {
//     "title": "Modern Front-End Development with React",
//     "url": "https://frontend.example.com/react-modern-development",
//     "excerpt": "Explore modern front-end development techniques with React, including hooks and context."
//   },
//   {
//     "title": "Database Optimization Tips",
//     "url": "https://datablog.example.com/database-optimization",
//     "excerpt": "Optimize your database performance with these practical tips and best practices."
//   },
//   {
//     "title": "Microservices Architecture: Pros and Cons",
//     "url": "https://arch.example.com/microservices-pros-cons",
//     "excerpt": "An in-depth look at the advantages and disadvantages of adopting a microservices architecture."
//   },
//   {
//     "title": "Getting Started with Kubernetes",
//     "url": "https://container.example.com/kubernetes-getting-started",
//     "excerpt": "Learn how to get started with Kubernetes, the popular container orchestration platform."
//   },
//   {
//     "title": "The Future of Web Development",
//     "url": "https://webdev.example.com/future-web-development",
//     "excerpt": "Trends and predictions for the future of web development."
//   },
//   {
//     "title": "Using WebAssembly for High-Performance Web Apps",
//     "url": "https://techblog.example.com/webassembly-performance",
//     "excerpt": "Discover how WebAssembly can be used to build high-performance web applications."
//   },
//   {
//     "title": "Continuous Integration and Deployment with Jenkins",
//     "url": "https://devops.example.com/ci-cd-jenkins",
//     "excerpt": "A guide to setting up continuous integration and deployment pipelines with Jenkins."
//   },
//   {
//     "title": "Building Serverless Applications with AWS Lambda",
//     "url": "https://cloud.example.com/serverless-aws-lambda",
//     "excerpt": "Get started with serverless application development using AWS Lambda."
//   },
//   {
//     "title": "Understanding Machine Learning Algorithms",
//     "url": "https://ml.example.com/machine-learning-algorithms",
//     "excerpt": "A beginner's guide to understanding the most common machine learning algorithms."
//   },
//   {
//     "title": "Implementing Authentication in Web Applications",
//     "url": "https://security.example.com/web-app-authentication",
//     "excerpt": "Learn about different authentication methods and how to implement them in your web applications."
//   }
// ]