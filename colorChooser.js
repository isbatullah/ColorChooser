class InputSlider extends React.Component{
  constructor(props){
    super(props);
  }
  render(){
    return(
      <div>
        <b>{this.props.label}: </b>
        <input type = "text"
               value = {this.props.value}
               size = "6"
               onInput = {(arg) => this.props.onChange(Math.floor(arg.target.value))}
        />
        <input type = "range"
               value = {this.props.value}
               onInput = {(arg) => this.props.onChange(Math.floor(arg.target.value))}
               min = {0}
               max = {this.props.max}
        />
      </div>
    )
  }
}


function updateHSL(state){
  var hslVal = rgbToHsl(state.red, state.green, state.blue);
  return{...state,
    hue: hslVal[0],
    sat: hslVal[1],
    light: hslVal[2],
  };
}

function updateRGB(state){
  var rgbVal = hslToRgb(state.hue, state.sat, state.light);
  return{...state,
    red: rgbVal[0],
    green: rgbVal[1],
    blue: rgbVal[2]
  };
}

class ColorChooser extends React.Component {
    constructor(props) {
        super(props)
        this.state = updateHSL({red:127, green: 127, blue: 127})
    }
    render() {
        return (
          <div className="row" align="center" style={{width:"70%", border:"solid 2px black"}}>

            <div className = "col-sm-4">
              <div id="swatch" style={{width:"150", height:"150", background:"rgb("+this.state.red+","+this.state.green+","+ this.state.blue+")" }}> </div>

              <h4> {rgbToHex(this.state.red,this.state.green,this.state.blue)}</h4>
              <h5>  RGB({this.state.red},{this.state.green},{this.state.blue})</h5>
              <br/>
              <h5>  HSL({this.state.hue},{this.state.sat}%,{this.state.light}%)</h5>


            </div>


            <div className = "col-sm-8">
            <br/>
              <InputSlider
                label="Red"
                value={this.state.red}
                max="255"
                onChange={v => {
                  if(v>255){
                    v = 255
                  }
                  if(v<0){
                    v=0
                  }
                  if(isNaN(v)){
                    v=127
                  }
                    this.setState(prev => {
                        return updateHSL({...prev, red:v})
                    })
                }}
                />
                <br/>
                <InputSlider
                  label="Green"
                  value={this.state.green}
                  max="255"
                  onChange={v => {
                    if(v>255){
                      v = 255
                    }
                    if(v<0){
                      v=0
                    }
                    if(isNaN(v)){
                      v=127
                    }
                      this.setState(prev => {
                          return updateHSL({...prev, green:v})
                      })
                  }}
                  />
                  <br/>
                  <InputSlider
                    label="Blue"
                    value={this.state.blue}
                    max="255"
                    onChange={v => {
                      if(v>255){
                        v = 255
                      }
                      if(v<0){
                        v=0
                      }
                      if(isNaN(v)){
                        v=127
                      }
                        this.setState(prev => {
                            return updateHSL({...prev, blue:v})
                        })
                    }}
                    />
                    <br/>
              <InputSlider
                label="Hue"
                value={this.state.hue}
                max="360"
                onChange={v => {
                  if(v>360){
                    v = 360
                  }
                  if(v<0){
                    v=0
                  }
                  if(isNaN(v)){
                    v=180
                  }
                    this.setState(prev => {
                      return updateRGB({...prev, hue:v})
                    })
                }}
                />
                <br/>
                <InputSlider
                  label="Sat"
                  value={this.state.sat}
                  max="100"
                  onChange={v => {
                    if(v>100){
                      v = 100
                    }
                    if(v<0){
                      v=0
                    }
                    if(isNaN(v)){
                      v=50
                    }
                      this.setState(prev => {
                        return updateRGB({...prev, sat:v})
                      })
                  }}
                  />
                  <br/>
              <InputSlider
                label="Light"
                value={this.state.light}
                max="100"
                onChange={v => {
                  if(v>100){
                    v = 100
                  }
                  if(v<0){
                    v=0
                  }
                  if(isNaN(v)){
                    v=50
                  }
                    this.setState(prev => {
                      return updateRGB({...prev, light:v})
                    })
                }}
                />
                <br/>
                  </div>
            </div>
        )
    }
}


    ReactDOM.render(
        (<ColorChooser/>),
        document.getElementById("container"));





//https://stackoverflow.com/questions/2353211/hsl-to-rgb-color-conversion
// modified so parameters are converted to decimal format
function hslToRgb(h, s, l){
    var r, g, b;

    h /= 360    // Convert to decimals
    s /= 100
    l /= 100

    if(s == 0){
        r = g = b = l; // achromatic
    }else{
        var hue2rgb = function hue2rgb(p, q, t){
            if(t < 0) t += 1;
            if(t > 1) t -= 1;
            if(t < 1/6) return p + (q - p) * 6 * t;
            if(t < 1/2) return q;
            if(t < 2/3) return p + (q - p) * (2/3 - t) * 6;
            return p;
        }

        var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        var p = 2 * l - q;
        r = hue2rgb(p, q, h + 1/3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1/3);
    }

    return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}


function rgbToHsl(r, g, b){
    r /= 255, g /= 255, b /= 255;
    var max = Math.max(r, g, b), min = Math.min(r, g, b);
    var h, s, l = (max + min) / 2;

    if(max == min){
        h = s = 0; // achromatic
    }else{
        var d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch(max){
            case r: h = (g - b) / d + (g < b ? 6 : 0); break;
            case g: h = (b - r) / d + 2; break;
            case b: h = (r - g) / d + 4; break;
        }
        h /= 6;
    }

    return [Math.round(h*360), Math.round(s*100), Math.round(l*100)];
}

//for rgb to hexa
//https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function componentToHex(c) {
    var hex = c.toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

//for rgb to hexa
//https://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
function rgbToHex(r, g, b) {
    return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}
