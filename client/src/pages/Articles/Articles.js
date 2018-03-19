import React, { Component } from "react";
import Btn from "../../components/Btn";
import Jumbotron from "../../components/Jumbotron";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";


class Articles extends Component {
  state = {
    articles: [],
    saved: [],
    topic: "",
    startYear: "",
    endYear: ""
  
  };

  // Call funtion to fetch all saved articles once Articles component has mounted
  componentDidMount() {
    this.fetchSaved();
  }

  // Fetch saved articles from database
  fetchSaved = () => {
    API.getArticles()
    .then(res => this.setState({ saved: res.data}) )
    .catch(err => console.log(err));
  };

  // Save selected article to database
  saveNewArticle = (section, headline, abstract, date, url) => {
      API.saveArticle({
        section: section,
        headline: headline,
        abstract: abstract,
        date: date,
       // image: this.state.mutlimedia[2].url,
        url: url
       //by: this.state.byline.orginal
      })
        .then(res => this.fetchSaved())
        .catch(err => console.log(err));

  };

// Delete selected article from database
  deleteArticle = id => {
    API.deleteArticle(id)
      .then(res => this.fetchSaved())
      .catch(err => console.log(err));
  };

// handle the form submission and query NYT API with user parameters
  handleFormSubmit = event => {
    event.preventDefault();
    if (this.state.topic) {
      this.setState({ articles: [] })
      API.queryNYT(this.state.topic, this.state.startYear, this.state.endYear)
      .then(res => { 
          for (var i=0; i<res.data.response.docs.length; i++) {
            this.setState({ articles:  [...this.state.articles, res.data.response.docs[i] ]
             })
          }
          this.setState({ topic: "" })
          this.setState({ startYear: "" })
          this.setState({ endYear: "" })

       })
      .catch(err => console.log(err));
    
    }
  };

// handle changes to form elements as inpurt changes
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  // Render component
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
                  value={this.state.startYear}
                  onChange={this.handleInputChange}
                  name="startYear"
                  placeholder="StartYear"
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

              <Jumbotron>
                <h1>Search results</h1>
              </Jumbotron>

              {this.state.articles.length ? (
                <List>
                  {this.state.articles.map(article => (
                    <ListItem key={article._id}>
                    
                    {article.headline.main}<br />
                    {article.pub_date}<br />

                    <a target="blank" href={article.web_url}>
                      {article.web_url}<br />
                    </a>

                    <Btn text="Save" onClick={() => this.saveNewArticle(
                      article.section_name,
                      article.headline.main,
                      article.abstract,
                      article.pub_date,
                      article.web_url
                  )} /><br />

                    </ListItem>
                  ))}
                </List>
              ) : (
                <h3>No Results to Display</h3>
              )}

            </Col> 
            <Col size="md-6 sm-12">

              <Jumbotron>
                <h1>Saved Articles</h1>
              </Jumbotron>

              {this.state.saved.length ? (
                <List>
                  {this.state.saved.map(article => (
                    <ListItem key={article._id}>
                    
                    {/* {article.section}<br /> */}
                    {article.headline}<br />
                    {/* {article.abstract}<br /> */}
                    {article.date}<br />

                    <a target="blank" href={article.web_url}>
                      {article.url}<br />
                    </a>

                    <Btn text="✗" onClick={() => this.deleteArticle( article._id )} /><br />

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
