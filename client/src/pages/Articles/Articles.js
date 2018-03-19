import React, { Component } from "react";
import DeleteBtn from "../../components/DeleteBtn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Link } from "react-router-dom";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";


class Articles extends Component {
  state = {
    articles: [],
    saved: [],
  };

  // componentDidMount() {
  //   this.fetchSaved();
  // }

  fetchSaved = () => {
    API.getArticles()
    .then(res => this.setState({ saved: res.data}) )
    .catch(err => console.log(err));
  }

  saveNewArticle = () => {
    API.saveArticle({
      title: this.state.title,
      author: this.state.author,
      synopsis: this.state.synopsis
    })
      .then(res => this.fetchSaved())
      .catch(err => console.log(err));
  }


  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.fetchSaved())
      .catch(err => console.log(err));
  };


  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.topic) {
      API.queryNYT(this.state.topic, this.state.startYear, this.state.endYear)
      .then(res => { 
          for (var i=0; i<res.data.response.docs.length; i++) {
            this.setState({ articles:  [...this.state.articles, res.data.response.docs[i] ]
             })
          }
       })
      .catch(err => console.log(err));
  };
  };

  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };

  render() {
    return (
      <Container fluid>
        
         
        <Jumbotron>
          <h1>New York Times Article Scrubber</h1>
        </Jumbotron>
          <Row> 

            <Col size="md-6">
              <form>
                <Input
                  value={this.state.topic}
                  onChange={this.handleInputChange}
                  name="topic"
                  placeholder="Topic (required)"
                />
                <Input
                  value={this.state.startYearr}
                  onChange={this.handleInputChange}
                  name="startYear"
                  placeholder="startYear"
                />
                <Input
                  value={this.state.endYear}
                  onChange={this.handleInputChange}
                  name="endYear"
                  placeholder="EndYear"
                />
                <FormBtn
                  disabled={!(this.state.topic)}
                  onClick={this.handleFormSubmit}
                >
                  Search
                </FormBtn>
              </form>

            </Col> 
            <Col size="md-6 sm-12">

              <Jumbotron>
                <h1>Saved Articles</h1>
              </Jumbotron>

              {this.state.articles.length ? (
                <List>
                  {this.state.articles.map(article => (
                    <ListItem key={article._id}>
                    
                    {article.section_name}<br />
                    {article.headline.main}<br />
                    {article.abstract}<br />
                    {article.pub_date}<br />
                    {/* {article.multimedia[2].url}<br /> */}
                    <a target="blank" href={article.web_url}>
                      {article.web_url}<br />
                    </a>
                    {/* {article.byline.original} */}
                  
                    <DeleteBtn onClick={() => this.deleteBook(article._id)} />
                    {/* need save article button here */}

                    </ListItem>
                  ))}
                </List>
              ) : (
                <h3>No Results to Display</h3>
              )}
            </Col>

          </Row>
        </Container>
      );
    }
}

export default Articles;
