import React from 'react';
import './componentList.css';

export function Input(props) {
  return (
    <div className="com-input borderBottom">
      <input placeholder={props.placeholder} value={props.val} onChange={e => props.value && props.value(e.target.value)} />
    </div>
  );
}

export function TextArea(props) {
  return (
    <div className="com-textarea borderBottom">
      <textarea placeholder={props.placeholder} value={props.val} onChange={e => props.value && props.value(e.target.value)}></textarea>
    </div>
  );
}

export function PublicTitle(props) {
  return (
    <div className="com-publicTitle borderBottom">
      {props.val}
    </div>
  );
}

export function BotGoHomeBtn(props) {
  let goHomeHistory = window.sessionStorage.getItem('goHomeHistory') === 'Y';
  if (goHomeHistory) return null;
  return (
    <div className="com-gome" onClick={() => props.history.push('/home')}>回首页</div>
  );
}
