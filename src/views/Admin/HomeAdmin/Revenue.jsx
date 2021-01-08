import React, { Component } from "react";
import Chart from "react-apexcharts";
import { Row, Form, Col, Button } from "react-bootstrap";
import './revenue.scss'

import { getRevenue } from '../../../lib/api'

class Revenue extends Component {
  constructor(props) {
    super(props);

    this.state = {
      series: [{
        name: "VND",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 249, 569 * 23000],
      }],
      options: {
        chart: {
          height: 300,
          type: 'line',
          zoom: {
            enabled: true
          },

          dropShadow: {
            enabled: true,
            color: '#000',
            top: 22,
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
          categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
          max: 12,
          offsetX: 0,
        },
        yaxis: {
          max: 100000000,
          labels: {
            maxWidth: 1500,
            formatter: function (value) {
              if (parseInt(value) >= 1000) {
                return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") + ' VND';
              } else {
                return value + ' VND';
              }
            }
          }
        }
      },
    }
    this.getNam = this.getNam.bind(this)
    // this.getThang = this.getThang.bind(this)
  }

  getNam(e) {
    getRevenue(e.target.value).then((res) => {
      this.setState({
        series: [{
          name: "VND",
          data:  [res.data.data[0].month1, res.data.data[0].month2, res.data.data[0].month3,
          res.data.data[0].month4, res.data.data[0].month5, res.data.data[0].month6, res.data.data[0].month7,
          res.data.data[0].month8, res.data.data[0].month9, res.data.data[0].month10, res.data.data[0].month11, res.data.data[0].month12]
        }]
      })
    })
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
                  <Form.Group as={Row}>
                    <Col sm={2}>
                      <Form.Control as='select' onChange={this.getNam}>
                        <option>Chọn năm</option>
                        <option value='2020'>2020</option>
                        <option value='2021'>2021</option>
                        <option value='2022'>2022</option>
                      </Form.Control>
                    </Col>
                    {/* <Col sm={2}>
                      <Form.Control as='select' onChange={this.getThang}>
                        <option>Chọn tháng</option>
                        <option value='1'>Tháng 1</option>
                        <option value='2'>Tháng 2</option>
                        <option value='3'>Tháng 3</option>
                        <option value='4'>Tháng 4</option>
                        <option value='5'>Tháng 5</option>
                        <option value='6'>Tháng 6</option>
                        <option value='7'>Tháng 7</option>
                        <option value='8'>Tháng 8</option>
                        <option value='9'>Tháng 9</option>
                        <option value='10'>Tháng 10</option>
                        <option value='11'>Tháng 11</option>
                        <option value='12'>Tháng 12</option>
                      </Form.Control>
                    </Col> */}
                  </Form.Group>
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
                    height='370px'
                    width='1000px'
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