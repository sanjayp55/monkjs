import * as React from 'react';
import PropTypes from 'prop-types';

export default function AbstractFrontRight({ color, ...props }) {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="502" height="376" fill="none" {...props}>
      <path stroke={color} strokeWidth="3.35061" d="m16.7787 121.836-2.2337-14.519-22.89558-2.234c-11.61542-1.787-14.51952-4.839-14.51962-6.1425-4.9142-6.7011-.1861-19.5452 2.7922-25.1296 9.3817-6.2545 28.48018-5.9567 36.8567-5.026 6.7012.4468 16.9392 28.8525 21.2205 42.9991l-6.1428 16.753-10.0518-2.233-5.0259-4.468Z" />
      <path stroke={color} strokeWidth="3.35061" d="M-14.4937 12.9415C1.14251 12.0108 44.477 30.6997 92.7258 112.901l-56.4019-8.376M231.775 25.2275C170.124 6.01739 68.3399 7.91607 25.1543 11.2667 43.4709 15.2875 102.032 69.53 129.023 96.1486c79.968-6.7012 197.872.1861 246.828 4.4674L231.775 25.2275ZM466.875 227.38l-96.051 6.702v32.389l96.051-6.701v-32.39ZM114.503 356.937l45.234-3.35c4.095-1.49 14.296-9.605 22.337-30.156" />
      <path stroke={color} strokeWidth="3.35061" d="M-1.64961 2.33153C52.5185-1.76366 176.379-3.3645 238.477 22.9936c43.744 24.3849 132.126 73.3781 135.7 74.2716 3.574.8935 55.471 23.4538 80.973 34.6228l30.714 13.403 15.636 57.518-7.26 103.311c-70.735 13.216-233.872 34.846-320.541 15.636-9.121-44.116-36.075-133.131-70.921-136.258-22.5239-3.165-62.3216 11.727-41.3245 96.609l-84.3236-21.22" />
      <path stroke={color} strokeWidth="3.35061" d="M151.104 276.349c1.887 21.185-1.335 40.72-7.985 55.165-6.672 14.493-16.612 23.536-28.03 24.553-11.418 1.017-22.7998-6.126-31.9285-19.212-9.098-13.041-15.7223-31.7-17.6095-52.885-1.8872-21.184 1.3347-40.72 7.9842-55.164 6.6719-14.494 16.612-23.536 28.0298-24.553 11.418-1.018 22.8 6.126 31.929 19.211 9.098 13.042 15.722 31.7 17.61 52.885ZM242.385 145.291 134.049 120.72l47.467 62.544 111.128 15.078-7.818-21.779-42.441-31.272Z" />
    </svg>
  );
}
AbstractFrontRight.propTypes = {
  color: PropTypes.string,
};
AbstractFrontRight.defaultProps = {
  color: '#fff',
};