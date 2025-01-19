import { motion } from 'framer-motion';
import { ClickAnimationProps } from './types';

const AnimatedClick = ({ children, onClick, className }: ClickAnimationProps) => {
  return (
    <motion.div onClick={onClick} whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.9 }} className={`cursor-pointer ${className}`}>
      {children}
    </motion.div>
  );
};

export default AnimatedClick;
