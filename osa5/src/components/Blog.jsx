import Togglable from "./Toggable"

const Blog = ({ blog }) => (
  <div>
    <p class="blog">
      {blog.title} 
      <Togglable buttonLabelOn="view" buttonLabelOff="hide">
        <p>{blog.url}</p>
        <p>{blog.author}</p>
        <p>Likes {blog.likes}
          <button>like</button>
        </p>
      </Togglable>
    </p>
    
  </div>  
)

export default Blog