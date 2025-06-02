import React, { useEffect, useState } from 'react'
import { Button, Card, CardBody, Container, Form, Input, Label, Row, Col } from 'reactstrap'
import { loadAllCategories } from '../services/category-service'
// import JoditEditor from 'jodit-react';
import { createPost as doCreatePost, uploadPostImage } from '../services/post-service'
import { getCurrUser } from '../Auth/Auth'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import { FaEdit, FaImage, FaTag, FaPaperPlane } from 'react-icons/fa'
import './Post.css'

const Post = () => {

  // const editor = useRef(null);
	// const [content, setContent] = useState('');

  const [post,setPost] = useState({
    title:'',
    postContent:'',
    categoryId:''
  })

  const navigate = useNavigate()

  const [categories,setCategories] = useState([])
  const [user,setUser] = useState(undefined)

  const [image,setImage] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(
    ()=>{
      setUser(getCurrUser())
      loadAllCategories().then((data)=>{
        // console.log(data)
        setCategories(data)
      }).catch(error=>{
        console.error('Error loading categories:', error)
        toast.error('Error loading categories')
      })
    },[]
  )

  //feild changed
  const feildChanged=(event,property)=>{
    const getValue = event.target.value
    //  console.log(event.target.value)
    setPost({...post,[property]:getValue})
  }

  //submit function
  const createPost = async (event) => {
    event.preventDefault()
    
    if (post.title.trim() === '') {
      toast.error('Please add a title to your post')
      return
    }
    if (post.postContent.trim() === '') {
      toast.error('Please fill in the content')
      return
    }
    if (post.categoryId === '') {
      toast.error('Please select a category')
      return
    }

    try {
      setLoading(true)
      post['userId'] = user.id
      const data = await doCreatePost(post)

      if (image) {
        try {
          await uploadPostImage(image, data.postId)
          toast.success('Image uploaded successfully')
        } catch (error) {
          console.error('Error uploading image:', error)
          toast.error('Error uploading image')
        }
      }

      toast.success('Post created successfully')
      navigate('/home')
    } catch (error) {
      console.error('Error creating post:', error)
      toast.error('Error creating post')
    } finally {
      setLoading(false)
    }
  }


//handling file change

const handleFileChange=(event)=>{
  const file = event.target.files[0]
  if (file) {
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
      toast.error('Image size should be less than 5MB')
      return
    }
    setImage(file)
  }
}


  return (
    <div className="create-post-page">
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={10} lg={8}>
            <Card className="fade-in">
              <CardBody className="p-4">
                <div className="d-flex align-items-center mb-4">
                  <FaEdit size={24} className="text-primary me-2" />
                  <h3 className="mb-0">Create Post</h3>
                </div>

                <Form onSubmit={createPost}>
                  <div className="mb-4">
                    <Label for="title" className="form-label">Title</Label>
                    <Input
                      type="text"
                      id="title"
                      className="form-control"
                      onChange={(e) => feildChanged(e, 'title')}
                      name="title"
                      placeholder="Enter post title"
                    />
                  </div>

                  <div className="mb-4">
                    <Label for="postContent" className="form-label">Content</Label>
                    <Input
                      type="textarea"
                      id="postContent"
                      className="form-control"
                      style={{ minHeight: '200px' }}
                      name="postContent"
                      onChange={(e) => feildChanged(e, 'postContent')}
                      placeholder="Write your post content here..."
                    />
                    {/* <JoditEditor
                      ref={editor}
                      value={content}
                      // config={config}
                      tabIndex={1} // tabIndex of textarea
                      onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                      onChange={newContent => {}}
                    /> */}
                  </div>

                  <div className="mb-4">
                    <Label for="image" className="form-label d-flex align-items-center">
                      <FaImage className="me-2" />
                      Add Media
                    </Label>
                    <Input
                      id="image"
                      type="file"
                      className="form-control"
                      onChange={handleFileChange}
                      accept="image/*"
                    />
                    <small className="text-muted">Maximum file size: 5MB</small>
                  </div>

                  <div className="mb-4">
                    <Label for="categoryId" className="form-label d-flex align-items-center">
                      <FaTag className="me-2" />
                      Category
                    </Label>
                    <Input
                      type="select"
                      id="categoryId"
                      className="form-control"
                      name="categoryId"
                      onChange={(e) => feildChanged(e, 'categoryId')}
                    >
                      <option value="" disabled>Select a category</option>
                      {categories.map((category) => (
                        <option value={category.categoryId} key={category.categoryId}>
                          {category.categoryName}
                        </option>
                      ))}
                    </Input>
                  </div>

                  <div className="d-grid gap-2">
                    <Button
                      color="primary"
                      type="submit"
                      className="d-flex align-items-center justify-content-center"
                      disabled={loading}
                    >
                      {loading ? (
                        <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
                      ) : (
                        <FaPaperPlane className="me-2" />
                      )}
                      Create Post
                    </Button>
                    <Button
                      color="light"
                      type="button"
                      onClick={() => navigate('/home')}
                    >
                      Cancel
                    </Button>
                  </div>
                </Form>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Post
