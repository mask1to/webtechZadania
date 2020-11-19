/*
 *  Javascript by Samuel Adler
 */

/*
 *  Declared global variables
 */

let graph, content, amplitude = 1;
let isSinusVisible = true, isCosinusVisible = true;
let isTextValueVisible = false, isIntervalSliderVisible = false;
let graphDone = false;

/*
 *  Document Listener
 */

document.addEventListener("DOMContentLoaded", ()=> {
    content = document.getElementById('the-graph').getContext('2d');
    graph = new Chart(content, {
        type: 'line',
        data: {
            labels: [],
            datasets: [
                {
                    label: 'Zasumeny sinus',
                    borderColor: 'chocolate',
                    fill: false,
                    hidden: false,
                    data: [],
                },
                {
                    label: 'Zasumeny kosinus',
                    borderColor: 'lightseagreen',
                    fill: false,
                    hidden: false,
                    data: [],
                },
            ]
        },
        options: {
            legend: {
                labels: {
                    filter: function(item){
                        if(item === 0)
                        {
                            return isSinusVisible;
                        }
                        else if(item === 1)
                        {
                            return isCosinusVisible;
                        }
                        else
                        {
                            return true;
                        }
                    }
                }
            },
            plugins: {
                zoom: {
                    zoom: {
                        drag: true,
                        enabled: true,
                        speed: 0.05,
                        threshold: 1,
                        sensitivity: 2,
                        mode: 'xy',
                    }
                }
            }
        }
    });
    if(typeof(EventSource) === "undefined")
    {
        document.getElementById('container-result').innerHTML = 'We are truly sorry for inconvenience, but your ' +
            'browser or the version of browser, which you are using does not support events sent by server.';
    }
    else if(typeof(EventSource) !== "undefined")
    {
        let src = new EventSource("http://vmzakova.fei.stuba.sk/sse/sse.php");
        src.addEventListener("message", function (b){
            if(!(graphDone))
            {
                let mainData = JSON.parse(b.data);
                graph.data.labels.push(mainData.x);
                graph.data.datasets[0].data.push({x: mainData.x, y: mainData.y1 * amplitude});
                graph.data.datasets[1].data.push({x: mainData.x, y: mainData.y2 * amplitude });
                graph.update();
            }
        }, false);
    }
})


/*
 *  Functions
 */

function PlayCosin()
{
    if(!(isCosinusVisible))
    {
        graph.data.datasets[1].hidden = false;
        isCosinusVisible = true;
        graph.update();
    }
    else
    {
        graph.data.datasets[1].hidden = true;
        isCosinusVisible = false;
        graph.update();
    }
}

function PlaySinus()
{
    if(!(isSinusVisible))
    {
        graph.data.datasets[0].hidden = false;
        isSinusVisible = true;
        graph.update();
    }
    else
    {
        graph.data.datasets[0].hidden = true;
        isSinusVisible = false;
        graph.update();
    }
}

function StopProgress()
{
    graphDone = true;
    console.log("Graph is stopped or ended");
}

function DisplayText()
{
    if(isTextValueVisible)
    {
        document.getElementById('textValueDiv').style.display = 'none';
        isTextValueVisible = false;
    }
    else
    {
        document.getElementById('textValueDiv').style.display = 'block';
        isTextValueVisible = true;
    }
}

function DisplayRangeSlide()
{
    if(isIntervalSliderVisible)
    {
        document.getElementById('sliderDiv').style.display = 'none';
        isIntervalSliderVisible = false;
    }
    else
    {
        document.getElementById('sliderDiv').style.display = 'block';
        isIntervalSliderVisible = true;
    }
}

function ModifyRangeSlider(val)
{
    let regex = /^[0-9]+$/;
    if(!(val.match(regex)))
    {
        document.getElementById('TextValue').value = 1;
        val = 1
    }
    else if(val <= 0 || val > 10)
    {
        document.getElementById('TextValue').value = 1;
        val = 1
    }
    document.getElementById('Slider').value = val;
    amplitude = val;
}

function ModifyText(val)
{
    document.getElementById('TextValue').value = val;
    amplitude = val;
}

/*
 *  Created components
 */

class TextValue extends HTMLElement{
    connectedCallback(){
        console.log('TextValue added to DOM');
        this.innerHTML = `
        <div class="checkboxDiv" id="textValueDiv">
                <label class="form-check-label" for="TextValue">
                    Textová hodnota
                </label>
                <input type="number" min="1" max="10" id="TextValue" value="1" onchange="ModifyRangeSlider(this.value);">
        </div>
        `;
    };
}

class Slider extends HTMLElement{
    connectedCallback(){
        console.log('Slider added to DOM');
        this.innerHTML = `
        <div class="checkboxDiv" id="sliderDiv">
                <label class="form-check-label" for="Slider">
                    Intervalový slider
                </label>
                <input type="range" min="1" max="10" id="Slider" value="1" onchange="ModifyText(this.value);">
        </div>`;
    };
}

customElements.define('text-value', TextValue);
customElements.define('slider-component', Slider);