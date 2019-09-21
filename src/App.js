import React from 'react';
import './App.css';

//ToDo
//Restrict number lenght, or disable expanding display
// resolve bug with dissapearing zero after resolving smth
//add on/off functionality

class App extends React.Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.resolve = this.resolve.bind(this);
    this.clear = this.clear.bind(this);
    this.numbers= ["1","2","3","4","5","6","7","8","9","0","."];
    this.operators= ["+","-","*","/"];
    this.words =["one","two","three","four","five","six","seven","eight", "nine","zero","decimal"]
    this.wordsOfOperators = ["add","subtract","multiply","divide"]
    this.state = {
      all: [],
      current:"0",
      answer:""
    };
  }

clear(){
  this.setState({
    all:[],
    current:"0",
    answer:""
  })
}
  resolve(){

    //if there is a number in state.current, push that number
    if(this.state.current !=="0"&&this.state.current !==""){
      this.setState({

        all:[...this.state.all,this.state.current],
        current:""
      },() => this.resolve());   //fancy pantsy callback on setState
      
    }
    //if last item in aray is /+-* remove last item and call resolve again
    else if(/\/|\*|\+|-/.test(this.state.all[this.state.all.length-1])){

      let temp =[...this.state.all];
      temp.pop();

      this.setState({
        all:[...temp]
      },() => this.resolve()); 
    }
    else if(this.state.answer !== ""){
        //do nothing 
    }
    else {
      this.setState({
        answer:eval(this.state.all.join("")),
        all:[],
        current:""

      })

    }

  }
  getNum(num) {
    if(this.state.answer !== ""){
      this.setState({
        answer:""
      },() => this.getNum(num));
    }
    else if(num ==="0"&&this.state.current ==="0"){
      this.setState({ current: "0"});
    }
    else if(num !=="0"&& this.state.current ==="0"&&num !=="."){
      this.setState({ current: num });
    }
    else if(num==="."&&(this.state.current ==="0"||this.state.current ==="")){
      this.setState({ current: "0." });
    }
    else if(num==="." && /\./.test(this.state.current)){
      num="";
    }
    else this.setState({ current: this.state.current+num });
    
  }
  handleSubmit(operation) {
    // if answer exists, push it to array and then push operator
    if(this.state.answer !==""){
      this.setState({

        all:[...this.state.all,this.state.answer,operation],
        answer:""
      })
    }
    // if current number exists, push that number to array and then push operator
    else if(this.state.current !== ""){
      this.setState({

        all:[...this.state.all,this.state.current,operation],
        current:""
      })
      
    }
    // there is no number in current but there are in "all",remove last element
    //from aray and push the most recently entered.
    else if(this.state.current === ""&& this.state.all.length>0){
      // if most recent operator is "-" than take the the operator from array and concat it
      // with the "-"
      if(operation === "-"){
        let tempOp = this.state.all[this.state.all.length-1]+"-";
        let temp =[...this.state.all];
        temp.pop();
      this.setState({
        all:[...temp,tempOp]
      })

      }

       else{ let temp =[...this.state.all];
      temp.pop();
      this.setState({
        all:[...temp,operation]
      })
    }
    }
    console.log(this.state.all)
  }

  render() {
    return (
      <div className="outerContainer">
      <hr className="line1"/>
      <hr className="line2"/>
      <hr className="line3"/>
      <div className = "container">
        <div className="display" id="display">{this.state.all}{this.state.current}{this.state.answer}
        </div>
        <div className="allButtons">
       
          <div className="numButtons">
            {this.numbers.map((num,index) =>
              <button className="button" key={num} id={this.words[index]} onClick={() => this.getNum(num)}>
                {num}
              </button>
            )}
          </div>
          <div className="operatorButtons">
            {this.operators.map((symbol,index) =>
              <button className="button" key={symbol} id={this.wordsOfOperators[index]} onClick={() => this.handleSubmit(symbol)}>
                {symbol}
              </button>
            )}
          </div>
          <div className="onOffButtons">
              <button className="button" key="=" id="equals" onClick={this.resolve}>
                =
              </button>
              <button className="button" key="AC" id="clear" onClick={this.clear}>
                AC
              </button>
              <button className="button" key="onOff" id="onOff" >
                On
              </button>

          </div>
      </div>
      </div>
      </div>
    )
  }
}


export default App;



