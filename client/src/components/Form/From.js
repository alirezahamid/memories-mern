import React, { useState, useEffect } from "react"
import { TextField, Button, Typography, Paper } from "@material-ui/core"
import useStyles from "./styles"
import FileBase from "react-file-base64"
import { useDispatch, useSelector } from "react-redux"
import { createPost, updatePost } from "../../redux/actions/posts"

// Get the Current ID

const From = ({ setCurrentId, currentId }) => {
  const classes = useStyles()
  const user = JSON.parse(localStorage.getItem("profile"))
  const [postData, setPostData] = useState({
    title: "",
    message: "",
    tags: "",
    selectedFile: "",
  })
  const dispatch = useDispatch()
  const post = useSelector((state) =>
    currentId ? state.posts.find((p) => p._id === currentId) : null
  )

  useEffect(() => {
    if (post) setPostData(post)
  }, [post])

  const handleSubmit = (e) => {
    e.preventDefault()
    if (currentId) {
      dispatch(updatePost(currentId, { ...postData, name: user?.result?.name }))
    } else {
      dispatch(createPost({ ...postData, name: user?.result?.name }))
    }
    clearFromHandler()
  }
  const clearFromHandler = () => {
    setCurrentId(null)
    setPostData({
      title: "",
      message: "",
      tags: "",
      selectedFile: "",
    })
  }

  if (!user?.result?.name) {
    return (
      <Paper className={classes.paper}>
        <Typography variant="h6" align="center">
          Please Sign In to create your own memories and like other's memories.
        </Typography>
      </Paper>
    )
  }

  return (
    <Paper className={classes.paper} spacing={2}>
      <form
        autoComplete="off"
        noValidate
        className={`${classes.root},${classes.form}`}
        onSubmit={handleSubmit}
      >
        <Typography variant="h6">
          {currentId ? "Editing" : "Creating"} a Memory
        </Typography>
        {/* <TextField
          style={{ padding: "10px 0 0 0" }}
          name="creator"
          variant="outlined"
          label="Creator"
          fullWidth
          value={postData.creator}
          onChange={(e) =>
            setPostData({ ...postData, creator: e.target.value })
          }
        /> */}
        <TextField
          name="title"
          variant="outlined"
          style={{ padding: "10px 0 0 0" }}
          label="Title"
          fullWidth
          value={postData.title}
          onChange={(e) => setPostData({ ...postData, title: e.target.value })}
        />
        <TextField
          name="message"
          variant="outlined"
          style={{ padding: "10px 0 0 0" }}
          label="Message"
          fullWidth
          value={postData.message}
          onChange={(e) =>
            setPostData({ ...postData, message: e.target.value })
          }
        />
        <TextField
          name="tags"
          variant="outlined"
          style={{ padding: "10px 0 0 0" }}
          label="Tags"
          fullWidth
          value={postData.tags}
          onChange={(e) =>
            setPostData({ ...postData, tags: e.target.value.split(",") })
          }
        />
        <div className={classes.fileInput}>
          <FileBase
            type="file"
            multiple={false}
            onDone={({ base64 }) =>
              setPostData({ ...postData, selectedFile: base64 })
            }
          />
        </div>
        <Button
          className={classes.buttonSubmit}
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          fullWidth
        >
          Post
        </Button>
        <Button
          variant="contained"
          color="secondary"
          size="small"
          onClick={clearFromHandler}
          fullWidth
        >
          Clear
        </Button>
      </form>
    </Paper>
  )
}

export default From
