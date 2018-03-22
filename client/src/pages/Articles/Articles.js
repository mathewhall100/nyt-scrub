import React, { Component } from "react";
import Btn from "../../components/Btn";
import Jumbotron from "../../components/Jumbotron";
import Card from "../../components/Card";
import API from "../../utils/API";
import { Col, Row, Container } from "../../components/Grid";
import { List, ListItem } from "../../components/List";
import { Input, FormBtn } from "../../components/Form";
import Footer from "../../components/Footer";

import openSocket from 'socket.io-client';
const socket = openSocket('http://localhost:8000');

socket.on('connect', socket => {
  console.log("SOCKET CLIENT CONNECTED");
});

class Articles extends Component {

  state = {
    articles: [],
    saved: [],
    topic: "",
    startYear: "",
    endYear: "",
    searchPanelDisplay: false, 
    savedAlert: false
  
  };

  // Call funtion to fetch all saved articles once Articles component has mounted
  componentDidMount() {
   
    this.fetchSaved(); 
    this.socketRecieve();
  };

  // Fetch saved articles from database
  fetchSaved = () => {
    API.getArticles()
    .then(res => this.setState({ saved: res.data}) )
    .catch(err => console.log(err));
  };


// Function to listen at socket for emitted messages
  socketRecieve = () => {
      socket.on('new saved article', data => {
      console.log(`New article saved: ${data}`);
      alert(`New saved article: ${data}`)

      this.fetchSaved();
    })

  };

  // Save selected article to database
  saveNewArticle = (headline, date, url) => {
      API.saveArticle({
        headline: headline,
        date: date,
        url: url
      })
        .then( res => {

          socket.emit('article saved', res.data.headline);

          this.fetchSaved();

        })
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
        if (res.data.response.docs.length > 0) {

          for (var i=0; i<5; i++) {
            this.setState({ articles:  [...this.state.articles, res.data.response.docs[i] ]
             })
            }
          this.setState({ topic: "" })
          this.setState({ startYear: "" })
          this.setState({ endYear: "" })
          
        } 
        this.setState({ searchPanelDisplay: true })
      })
      .catch(err => console.log(err));
      }
    };

  
// handle changes to form elements as input changes
  handleInputChange = event => {
    const { name, value } = event.target;
    this.setState({
      [name]: value
    });
  };


  // Render component
  render() {

    return (
      <Container>
        
        <Jumbotron />

          <Row> 
            <Col size="md-6"> 
              <Card header={"Search for an article"}>

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
                  <br />
                </form>

              </Card>
              <br /><br />
              <Card style={{ display: this.state.searchPanelDisplay ? 'block' : 'none'}} header={"Search Results"}>

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
                          article.headline.main,
                          article.pub_date,
                          article.web_url
                        )} /><br />
                      </ListItem>

                    ))}
                  </List>

                ) : (
                  <h3>No Results to Display</h3>
                )}

              </Card>
            </Col> 
            <Col size="md-6 sm-12">
              <Card header={"Saved articles"}>

              {this.state.saved.length ? (

                <List>
                  {this.state.saved.map(article => (

                    <ListItem key={article._id}>
                      {article.headline}<br />
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

              </Card> 
            </Col>
          </Row>

        <Footer />

      </Container>
    );
  }
}

export default Articles;
