import React from 'react';
import './App.css';



class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resolve = this.resolve.bind(this);
    this.clear = this.clear.bind(this);
    this.numbers= ["1","2","3","4","5","6","7","8","9","."];
      this.operators= ["+","-","*","/"];
    this.state = {
      all: [],
      current:"",
      answer:""
    };
  }

clear(){
  this.setState({
    all:[],
    current:"",
    answer:""
  })
}
  resolve(){
    //console.log(eval("1+2*3"))
    if(this.state.current !==""){
      this.setState({

        all:[...this.state.all,this.state.current],
        current:""
      },() => this.resolve());   //fancy pantsy callback on setState
      
    }
    else{
      this.setState({
        answer:eval(this.state.all.join("")),
        all:[],
        current:""

      })

    }
  
  //let b = eval(cur) ; 
//console.log(eval(cur))

    /*let temp =[...this.state.all].map(val => {

if(!isNaN(val)) console.log(val)

      })
    console.log("resolve"+temp)*/
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
  handleSubmit(operation) {
    if(this.state.current !== ""){
      this.setState({

        all:[...this.state.all,this.state.current,operation],
        current:""
      })
      
    }
    else if(this.state.current === ""&& this.state.all.length>0){
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
          {this.operators.map(symbol =>
            <button key={symbol} onClick={() => this.handleSubmit(symbol)}>
              {symbol}
            </button>
          )}
        </div>
        <div>
          {this.numbers.map(num =>
            <button key={num} onClick={() => this.getNum(num)}>
              {num}
            </button>
          )}
        </div>
          <div>
            <button key="=" onClick={this.resolve}>
              =
            </button>
            <button key="AC" onClick={this.clear}>
              AC
            </button>
          </div>
      </div>
    )
  }
}


export default App;
