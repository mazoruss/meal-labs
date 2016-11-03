/* This code was modified from react-native-chart, which can be found at:
  https://github.com/tomauty/react-native-chart
*/

/* @flow */
import React from 'react';
import { ART, View } from 'react-native';
import Wedge from './Wedge';

const { Group, Surface } = ART;

const getColor = (colors, index) => colors[index] || colors[colors.length % index];

export default class PieChart extends React.Component {
  constructor(props) {
    super(props);
    this.state = { rotation: 0 };
  }

  render() {
    // if (!this.props.width || !this.props.height) return <View />;

    // default colors
    const COLORS = this.props.sliceColors || [
      '#4DC4E6',
      '#333333',
      '#999999',
      '#DF8165',
      '#F5F5F5',
      '#90C456',
      '#374E5C',
      '#4a697c',
    ];
    // TODO: Read stroke width from props?
    const STROKE_WIDTH = 1;
    const radius = (this.props.height / 2) - STROKE_WIDTH;

    const centerX = this.props.width / 2;
    const centerY = this.props.height / 2;

    // Gather sum of all data to determine angles
    let sum = 0;
    const data = this.props.data || [];
    data.forEach((n) => { sum += (n > 0) ? n : 0.001; });
    const sectors = data.map(n => Math.floor(360 * (n / sum)));
    let startAngle = 0;

    const arcs = [];
    const colors = [];
    sectors.forEach((sectionPiece, i) => {
      let endAngle = startAngle + sectionPiece;
      if (endAngle > 360) {
        endAngle = 360;
      }
      if (endAngle - startAngle === 0) {
        startAngle += sectionPiece;
        return;
      }
      if ((i === sectors.length - 1) && endAngle < 360) {
        endAngle = 360;
      }
      arcs.push({ startAngle, endAngle, outerRadius: radius });
      colors.push(getColor(COLORS, i));
      startAngle += sectionPiece;
    });
    return (
      <View>
        <Surface width={this.props.width} height={this.props.height}>
          <Group
            originX={centerX}
            width={this.props.width}
            height={this.props.height}
            originY={centerY}
            rotation={this.state.rotation}
          >
            {arcs.map((arc, i) => (
              <Wedge
                stroke={colors[i]}
                strokeWidth={STROKE_WIDTH}
                fill={colors[i]}
                key={i}
                originX={centerX}
                originY={centerY}
                {...arc}
              />
            ))}
          </Group>
        </Surface>
      </View>
    );
  }
}
