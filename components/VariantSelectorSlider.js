import React, {Component} from 'react';
import Slider from "react-slick";


class VariantSelector extends Component {
  render() {
	   var settings = {
     dots: true,
      infinite: false,
      speed: 500,
      slidesToShow: 5,
      slidesToScroll: 1,
	   responsive: [
       {
         breakpoint: 1026,
         settings: { 
           slidesToShow: 3,
           slidesToScroll: 1,
           infinite: false,
           dots: false
         }
       },
	    {
         breakpoint:800,
         settings: { 
           slidesToShow: 3,
           slidesToScroll: 1,
           infinite: false,
           dots: false
         }
       },
       {
         breakpoint: 767,
         settings: {
        vertical: false,
       verticalSwiping: false,
           slidesToShow: 3,
           slidesToScroll: 1,
           initialSlide: 1
         }
       },
       {
         breakpoint: 480,
         settings: {
        vertical: false,
       verticalSwiping: false,
           slidesToShow: 3,
           slidesToScroll: 1
         }
       }
     ]
    };
    return (
      (this.props.option.name == 'Color') ? 
	   <Slider {...settings}>
       
      {this.props.option.values.map((value, index) => {
        let active = { checked: (index == 0) ? 'checked="checked"' : ''}
        return(
		
          <label className="containerRadio colorVariant" key={`${this.props.option.name}-${value.value}`} title={`${this.props.option.name} - ${value.value}`}>
            <input 
              type="radio" 
              //{...active}
              name={`${this.props.option.name}--${this.props.option.id}`}
              value={value.value} 
              onClick={this.props.handleOptionChange}
            />
            <span className="checkmark" style={{background: value.value}}></span>
          </label>
		   
          )
          })
      }
       
	  </Slider>
      :
     
      <div>
      {this.props.option.values.map((value, index) => {
        if(value.value !== 'Default Title') {
          return(
            <label className={`containerRadio ${this.props.option.name}Variant`} key={`${this.props.option.name}-${value.value}`} title={`${this.props.option.name} - ${value.value}`}>
              <input 
                type="radio" 
                name={`${this.props.option.name}--${this.props.option.id}`}
                value={value.value} 
                onClick={this.props.handleOptionChange}
              />
              <span className="checkmark"></span>
			   <span className="checkmarkvalue">{value.value}</span>
            </label>
            )
          }
      })
      }
      </div>
    );
  }
}

export default VariantSelector;
