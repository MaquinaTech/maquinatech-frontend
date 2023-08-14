import React, { useState, useEffect } from 'react';
import { Field, ErrorMessage } from 'formik';
import PropTypes from 'prop-types';
import styles from '../../styles/Input.module.scss';

const Input = ({ labelText, type, name }) => {

  const [isActive, setIsActive] = useState(false);

  const handle = (value) => {
    if(value){
      setIsActive(true)
    }
    else{
      setIsActive(false)
    }
    
  };
  

  return (
    <div className={styles.field}>
      <label className={styles.label}>{labelText}</label>
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
      <ErrorMessage name={ name } component="div" className={styles.input__error} />
    </div>
  );
};

Input.propTypes = {
  labelText: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,

};

export default Input;
