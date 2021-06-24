import React, { useEffect, useState } from "react"
import { Container, Grow, Grid, Paper } from "@material-ui/core"
import { useDispatch } from "react-redux"

import { getPosts } from "../../redux/actions/posts"
import Posts from "../Posts/Posts"
import Form from "../Form/From"
import Pagination from "../Pagination"
import useStyles from "./styles"

const Home = () => {
  const classes = useStyles()

  const dispatch = useDispatch()
  const [currentId, setCurrentId] = useState(null)

  useEffect(() => {
    dispatch(getPosts())
    /* Change this. to update after changing currentId */
    if (currentId === null) {
      dispatch(getPosts())
    }
  }, [currentId, dispatch])

  return (
    <Grow in>
      <Container>
        <Grid
          container
          className={classes.mainContainer}
          justify="space-between"
          alignItems="stretch"
          spacing={4}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            <Paper elevation={6}>
              <Pagination />
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Grow>
  )
}

export default Home
