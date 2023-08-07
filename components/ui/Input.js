import React, { useState, useEffect } from 'react';
import { Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import styles from '../../styles/Input.module.scss';

const Input = ({ labelText, type, name }) => {

  const [isActive, setIsActive] = useState(false);
  const [showAnimation, setShowAnimation] = useState(false);

  const handle = (value) => {
    if (value) {
      setShowAnimation(true);
      //wait 1 seg
      setTimeout(() => {
        setIsActive(value);
        setShowAnimation(false);
      }, 600);
      

    } else {
      setShowAnimation(false);
      setIsActive(value);
      
    }
  };
  

  return (
    <div className={styles.field}>
      <label className={styles.label}>{labelText}</label>
      {isActive && <div className={styles.blank}></div>}
      <Field
        type={type}
        name={name}
        className={isActive ? `${styles.input__active} ${styles.input}` : styles.input}
        onFocus={() => {
          handle(true);
        }}
        onBlur={() => {
          handle(false);
        }}
      />
      {showAnimation && <img src="/push.svg" alt="Animación" className={styles.input__animation} />}
      <ErrorMessage name={ name } component="div" className={styles.input__error} />
    </div>
  );
};

Input.propTypes = {
  labelText: PropTypes.string.isRequired,
  handleFocus: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
};

export default Input;
