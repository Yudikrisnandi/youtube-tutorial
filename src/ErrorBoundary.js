import { Component } from 'react';

class ErrorBoundary extends Component{
  state = {
    isError: false
  }
  static getDerivedStateFromError(error){
    return {
      isError: true
    }
  }
  componentDidCatch(error, info){
    console.log(error)
    console.log(info)
  }
  render(){
    if(this.state.isError){
      return(
        <div>
          <p>Something went wrong</p>
        </div>
      )
    }
    return this.props.children
  }
}

export default ErrorBoundary;
