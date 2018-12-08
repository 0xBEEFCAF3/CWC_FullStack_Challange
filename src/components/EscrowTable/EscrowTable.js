import React, { Component } from 'react';

import {
  DateField,
  TimeField,
} from './DateTimePicker.styles';

class DateTimePicker extends Component {

  render() {
    return (
      <div>
        <DateField
          onChange={(date) => this.props.onChange({date, time: this.props.time})}
          value={this.props.value.date}
        />
        <TimeField
          onChange={(time) => this.props.onChange({date: this.props.date, time})}
          value={this.props.value.time}
        />
      </div>
    );
  }
}

export default DateTimePicker;
