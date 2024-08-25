import Togglable from "./Toggable"

const Blog = ({ blog, update }) => {

  const updateBlog = (event) => {
    event.preventDefault()
    update(blog)
  }
  return (
    <div className="blog">
      <p>
        {blog.title}
      </p>
      <Togglable buttonLabelOn="view" buttonLabelOff="hide">
        <div>
          <p>{blog.url}</p>
          <p>{blog.author}</p>
          <p>
            Likes {blog.likes}
            <button onClick={updateBlog}>like</button>
          </p>
        </div>
      </Togglable>
    </div>
  )

}



export default Blog