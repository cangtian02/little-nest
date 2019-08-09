import React from 'react';
import './componentList.css';

export function Input(props) {
  return (
    <div className="com-input">
      <input placeholder={props.placeholder} value={props.val} onChange={e => props.value && props.value(e.target.value)} />
    </div>
  );
}

export function TextArea(props) {
  return (
    <div className="com-textarea">
      <textarea placeholder={props.placeholder} value={props.val} onChange={e => props.value && props.value(e.target.value)}></textarea>
    </div>
  );
}
