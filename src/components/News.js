import React, { Component } from "react";
import NewsItem from "./NewsItem";
import Spinner from "./Spinner";
//impt
import PropTypes from "prop-types";

import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  articles = [
    // {
    //   source: {
    //     id: "google-news-in",
    //     name: "Google News (India)",
    //   },
    //   author: "Livemint",
    //   title:
    //     "Punjab: AAP scores another big win; all 5 candidates elected unopposed to Rajya Sabha",
    //   description:
    //     "The AAP nominees for the Rajya Sabha from Punjab included former cricketer Harbhajan Singh, party leader Raghav Chadha, LPU founder Ashok Mittal, IIT Delhi professor Sandeep Pathak and industrialist Sanjeev Arora for the March 31 elections",
    //   url: "https://www.livemint.com/elections/punjab-aap-scores-another-win-all-5-members-elected-unopposed-to-rajya-sabha-11648127796620.html",
    //   urlToImage:
    //     "https://images.livemint.com/img/2022/03/24/600x338/Raghav_Chadha_1646897306290_1648128891875.jpg",
    //   publishedAt: "2022-03-24T13:37:11+00:00",
    //   content:
    //     "In another big boost to Aam Aadmi Party (AAP) unit in Punjab, all its five nominees for the Rajya Sabha have been elected unopposed from the state. The AAP nominees for the Rajya Sabha from Punjab in… [+1954 chars]",
    // },
    // {
    //   source: {
    //     id: "espn-cric-info",
    //     name: "ESPN Cric Info",
    //   },
    //   author: null,
    //   title:
    //     "PCB hands Umar Akmal three-year ban from all cricket | ESPNcricinfo.com",
    //   description:
    //     "Penalty after the batsman pleaded guilty to not reporting corrupt approaches | ESPNcricinfo.com",
    //   url: "http://www.espncricinfo.com/story/_/id/29103103/pcb-hands-umar-akmal-three-year-ban-all-cricket",
    //   urlToImage:
    //     "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1099495_800x450.jpg",
    //   publishedAt: "2020-04-27T11:41:47Z",
    //   content:
    //     "Umar Akmal's troubled cricket career has hit its biggest roadblock yet, with the PCB handing him a ban from all representative cricket for three years after he pleaded guilty of failing to report det… [+1506 chars]",
    // },
    // {
    //   source: {
    //     id: "espn-cric-info",
    //     name: "ESPN Cric Info",
    //   },
    //   author: null,
    //   title:
    //     "What we learned from watching the 1992 World Cup final in full again | ESPNcricinfo.com",
    //   description:
    //     "Wides, lbw calls, swing - plenty of things were different in white-ball cricket back then | ESPNcricinfo.com",
    //   url: "http://www.espncricinfo.com/story/_/id/28970907/learned-watching-1992-world-cup-final-full-again",
    //   urlToImage:
    //     "https://a4.espncdn.com/combiner/i?img=%2Fi%2Fcricket%2Fcricinfo%2F1219926_1296x729.jpg",
    //   publishedAt: "2020-03-30T15:26:05Z",
    //   content:
    //     "Last week, we at ESPNcricinfo did something we have been thinking of doing for eight years now: pretend-live ball-by-ball commentary for a classic cricket match. We knew the result, yes, but we tried… [+6823 chars]",
    // },
  ];

  capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  constructor(props) {
    super(props);
    this.state = {
      articles: this.articles,
      loading: true,
      page: 1,
      totalResults:0
    };
    document.title = `${this.capitalizeFirstLetter(
      this.props.category
    )} - NewsMonkey`;
  }

  async update() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ba837b0e1b6947a5b57357905829f54c&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: true });
    let data = await fetch(url);
    this.props.setProgress(30);
    let parsedData = await data.json();
    this.props.setProgress(70);
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
      loading: false,
    });
    this.props.setProgress(100);
  }

  fetchMoreData = async() => {
    this.setState({page:this.state.page+1})
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ba837b0e1b6947a5b57357905829f54c&page=${this.state.page}&pageSize=${this.props.pageSize}`;
    this.setState({ loading: false });
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: this.state.articles.concat(parsedData.articles),
      totalResults: parsedData.totalResults,
      loading: false,
    });
  };

  async componentDidMount() {
      let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=ba837b0e1b6947a5b57357905829f54c&page=${this.state.page}&pageSize=${this.props.pageSize}`;
      this.setState({loading:true});
      let data = await fetch(url);
      let parsedData = await data.json()
      console.log(parsedData);
      this.setState({ articles: parsedData.articles ,
        totalResults:parsedData.totalResults,
      loading:false
    })
    this.update();
  }

  // handlePreviousClick = async () => {
  //     let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page - 1}&pageSize=${this.props.pageSize}`;
  //     this.setState({loading:true});
  //     let data = await fetch(url);
  //     let parsedData = await data.json()
  //     this.setState({
  //     page : this.state.page - 1,
  //     articles: parsedData.articles,
  //     loading:false
  //   })
  //   this.setState({ page: this.state.page - 1 });
  //   this.update();
  // };

  // handleNextClick = async () => {
  //   if(!(this.state.page + 1 > Math.ceil(this.state.totalResults/this.props.pageSize))){
  //         let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=${this.props.apiKey}&page=${this.state.page + 1}&pageSize=${this.props.pageSize}`;
  //         this.setState({loading:true});
  //         let data = await fetch(url);
  //         let parsedData = await data.json()
  //         this.setState({
  //         page : this.state.page + 1,
  //         articles: parsedData.articles,
  //         loading:false
  //       })
  //   }
  //   this.setState({ page: this.state.page + 1 });
  //   this.update();
  //};

  render() {
    return (
      <>
        <h2 className="text-center" style={{ margin: "40px" }}>
          NewsMonkey - Top {this.capitalizeFirstLetter(this.props.category)}{" "}
          Headlines
        </h2>
        {this.state.loading && <Spinner></Spinner>}
        <InfiniteScroll
          dataLength={this.state.articles.length}
          next={this.fetchMoreData}
          hasMore={this.state.articles.length!==this.state.totalResults}
          loader={<Spinner/>}
        >
          <div className="container">

          
        <div className="row">
          {this.state.articles.map((element) => {
              return (
                <div className="col-md-4" key={element.url}>
                  <NewsItem
                    title={element.title ? element.title.slice(0, 45) : ""}
                    description={
                      element.description
                        ? element.description.slice(0, 88)
                        : ""
                    }
                    imageUrl={
                      element.urlToImage
                        ? element.urlToImage
                        : "https://banner2.cleanpng.com/20180702/oga/kisspng-newspaper-computer-icons-symbol-news-icon-5b3add8cb3a9a8.8956674115305844607359.jpg"
                    }
                    newsUrl={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                  />
                </div>
              );
            })}
        </div>
        </div>
        </InfiniteScroll>
      </>
    );
  }
}

export default News;
