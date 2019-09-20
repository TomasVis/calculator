import React from 'react';
import './App.css';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleClick = this.handleClick.bind(this);
    this.resolve = this.resolve.bind(this)
    this.state = {
      all: [],
      current:"",
      numbers: "0123456789.".split(""),
      operators:["+","-","*","/"]
    };
  }
  resolve(){
    console.log("resolve")
  }
  getNum(num) {
    if(num ==="0"&&this.state.current ==="0"){
      this.setState({ current: "0"});
    }
    else if(num !=="0"&& this.state.current ==="0"&&num !=="."){
      this.setState({ current: num });
    }
    else if(num==="."&&this.state.current ===""){
      this.setState({ current: "0." });
    }
    else if(num==="." && /\./.test(this.state.current)){
      num="";
    }
    else this.setState({ current: this.state.current+num });
    
  }
  handleClick(operation) {
    if(this.state.current !== ""){
      this.setState({

        all:[...this.state.all,this.state.current,operation],
        current:""
      })
      
    }
    if(this.state.current === ""&& this.state.all.length>0){
      //console.log(this.state.all.pop())
      let temp =[...this.state.all];
      temp.pop();
      //temp.push(operation);
      this.setState({
        all:[...temp,operation]
      })
    }
    console.log(this.state.all)
  }

  render() {
    return (
      <div>
        <div>Display: {this.state.all} </div>

        Current: {this.state.current} 
        <div>
          {this.state.operators.map(symbol =>
            <button key={symbol} onClick={() => this.handleClick(symbol)}>
              {symbol}
            </button>
          )}
        </div>
        <div>
          {this.state.numbers.map(num =>
            <button key={num} onClick={() => this.getNum(num)}>
              {num}
            </button>
          )}
        </div>
          <div>
            <button key="=" onClick={this.resolve}>
              =
            </button>
          </div>
      </div>
    )
  }
}


export default App;
