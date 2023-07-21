import classNames from 'classnames';
import { Search } from 'lucide-react';
import React, { forwardRef, InputHTMLAttributes } from 'react';
import './Input.scss';
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  search?: boolean;
}

const Input = forwardRef<HTMLInputElement, InputProps>(({ search, label, className, type, ...props }, ref) => {
  const combinedClassName = classNames('default-input', {
    className,
  });
  return (
    <div className="app-input">
      {label && <label htmlFor="AppInput">{label}</label>}
      {search && <Search className="search-icon" color="#7d7d7d" size={20} />}
      <input type={type} {...props} className={combinedClassName} ref={ref} id="AppInput" />
    </div>
  );
});

Input.displayName = 'Input';
export default Input;
