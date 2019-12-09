import React, { Component } from "react";
import ItemCard from "./itemCard";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";

export class ItemList extends Component {
  state = {
    items: [],
    count: 2,
    offset: 0,
    type:this.props.type,
    hasMore: true
  };
   componentDidMount() {
    console.log(this.state.type);
    this.fetchItems();
   }

  fetchItems = () => {
    const { count, offset, type } = this.state;
    this.setState({ offset: offset + count });
    console.log(count,offset,type,this.state.items)
    axios
      .get(
        "http://localhost:3000/api/items/withRange/" + type + "/" + count + "/" + offset,
      )
      .then(res => {
        if (res.data.data.length > 0) {
          this.setState({ items: this.state.items.concat(res.data.data) });
          console.log( this.state.items.concat(res.data.data))
        } else {
          this.setState({ hasMore: false });
        }
      });
  };

  render() {
    return (        
        <InfiniteScroll
          hasMore={this.state.hasMore}
          dataLength={this.state.items.length}
          next={this.fetchItems}
          endMessage={
            <h3
              style={{
                width: "100%",
                height: "50px",
                backgroundColor: "#ccc",
                lineHeight: "50px",
                textAlign: "center",
                fontSize: "20px",
                marginBottom: "5px"
              }}
            >
              No More Item
            </h3>
          }
          loader={
            <h3
              style={{
                width: "100%",
                height: "50px",
                backgroundColor: "#ccc",
                lineHeight: "50px",
                textAlign: "center",
                fontSize: "20px",
                marginBottom: "5px"
              }}
            >
              Loading...
            </h3>
          }
        >
          {this.state.items.map(item => (
            <ItemCard key={item._id} item={item}/>
          ))}
        </InfiniteScroll>
    );
  }
}

export default ItemList;
