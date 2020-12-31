import React, { Component } from "react";
import Chart from "react-apexcharts";
import { Row, Nav } from "react-bootstrap";
import './revenue.scss'

class Revenue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [{
        name: "USD",
        data: [120, 249, 569],
      }],
      options: {
        chart: {
          height: 180,
          type: 'line',
          zoom: {
            enabled: true
          },

          dropShadow: {
            enabled: true,
            color: '#000',
            top: 18,
            left: 7,
            blur: 10,
            opacity: 0.2
          },
          toolbar: {
            show: false
          }
        },
        colors: ['#f2994a'],
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth',
        },
        grid: {
          row: {
            colors: ['#f3f3f3', 'transparent'], // takes an array which will be repeated on columns
            opacity: 0.5
          },
        },
        markers: {
          size: 2,
        },
        xaxis: {
          categories: ['Oct', 'Nov', 'Dec'],
          max: 3,
          offsetX: 0,
        },
        yaxis: {
          min: 0,
          max: 800,
          labels: {
            minWidth: 0,
            maxWidth: 1500,
            formatter: function (value) {
              if (parseInt(value) >= 1000) {
                return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              } else {
                return '$' + value;
              }
            }
          }
        }
      },
    }
  }

  render() {
    return (
      <div className="revenue ">
        <div className="w-full px-4 py-2">
          <div className="relative min-w-0 break-words w-full mb-3 my-3 shadow-lg rounded">
            <div className="px-4 pt-3">
              <div className="flex-wrap items-center">
                <div className="relative w-full">
                  <h1 className='fs-30 my-3'><b>Doanh Thu</b></h1>
                  {/* <Nav
                    activeKey="/home"
                    onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}
                  >
                    <Nav.Item>
                      <Nav.Link className='a-custom' eventKey="/home">Weekly</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link className='a-custom' eventKey="/home2">Monthly</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                      <Nav.Link className='a-custom' eventKey="/home3">Yearly</Nav.Link>
                    </Nav.Item>
                  </Nav> */}
                </div>
              </div>
            </div>
            <div className="px-4 w-full">
              {/* Chart */}
              <div className="relative h-full">
                <Row>
                  <Chart
                    options={this.state.options}
                    series={this.state.series}
                    type="line"
                    height='300px'
                    width='900px'
                    className='bieudo mx-3'
                  />
                </Row>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
export default Revenue