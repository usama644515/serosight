/* eslint-disable @next/next/no-img-element */
import React, { useState } from 'react';
import styles from './Slider.module.css';

const SliderWithMenu = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const menuItems = [
    { title: 'Electrical', image: '/images/slider1.png' },
    { title: 'Excitation & Detection', image: '/images/slider2.png' },
    { title: 'Optical', image: '/images/slider3.png' },
    { title: 'Mechanical', image: '/images/slider4.png' },
    { title: 'Interface & Processing', image: '/images/slider5.png' },
  ];

  const handleNavigation = (direction) => {
    if (direction === 'up') {
      setActiveIndex((prevIndex) =>
        prevIndex === 0 ? menuItems.length - 1 : prevIndex - 1
      );
    } else if (direction === 'down') {
      setActiveIndex((prevIndex) =>
        prevIndex === menuItems.length - 1 ? 0 : prevIndex + 1
      );
    }
  };

  return (
    <div className={styles.container}>
      {/* Left Menu */}
      <div className={styles.menu}>
        <h2>Technical Details</h2>
        <button
          className={styles.arrow}
          onClick={() => handleNavigation('up')}
        >
          <img src="/images/arrow-up2.png" alt="" />
        </button>
        <div className={styles.menuItems}>
          {menuItems.map((item, index) => {
            const isActive = index === activeIndex;
            const isVisible =
              index === activeIndex ||
              index === activeIndex - 1 ||
              index === activeIndex + 1 ||
              (activeIndex === 0 && index === menuItems.length - 1) ||
              (activeIndex === menuItems.length - 1 && index === 0);

            return isVisible ? (
              <div
                key={index}
                className={`${styles.menuItem} ${
                  isActive ? styles.active : styles.inactive
                }`}
                onClick={() => setActiveIndex(index)}
              >
                {item.title}
              </div>
            ) : null;
          })}
        </div>
        <button
          className={styles.arrow}
          onClick={() => handleNavigation('down')}
        >
          <img src="/images/arrow-down2.png" alt="" />
        </button>
      </div>

      {/* Right Content */}
      <div className={styles.content}>
        <img
          src={menuItems[activeIndex].image}
          alt={menuItems[activeIndex].title}
          className={styles.image}
        />
      </div>
    </div>
  );
};

export default SliderWithMenu;
