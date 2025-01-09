export const gradients = {
  blueGreen: {
    gradient: "from-blue-500 via-teal-400 to-green-400",
    titleColor: "text-teal-400"
  },
  
  yellow: {
    gradient: "from-yellow-400 via-yellow-500 to-amber-600",
    titleColor: "text-yellow-400"
  },
  
  pinkPurple: {
    gradient: "from-pink-500 via-purple-500 to-indigo-500",
    titleColor: "text-pink-400"
  },
  
  lightBlue: {
    gradient: "from-sky-400 via-blue-400 to-cyan-400",
    titleColor: "text-sky-400"
  },
  
  greenYellow: {
    gradient: "from-green-400 via-lime-400 to-yellow-400",
    titleColor: "text-lime-400"
  },
  
  bluePurple: {
    gradient: "from-blue-600 via-indigo-500 to-purple-500",
    titleColor: "text-indigo-400"
  },
  
  orangeYellow: {
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    titleColor: "text-orange-400"
  },
  
  redPink: {
    gradient: "from-red-500 via-rose-500 to-pink-500",
    titleColor: "text-rose-400"
  },

  cyanGreen: {
    gradient: "from-cyan-400 via-green-400 to-lime-400",
    titleColor: "text-cyan-400"
  }
}; 

// Add this function to create gradient variations
export const createGradientVariant = (gradient, opacity = 50) => {
  return {
    gradient: gradient.gradient.replace(/from-|via-|to-/g, (match) => `${match}opacity-${opacity} `),
    titleColor: gradient.titleColor
  };
};

// Usage example:
// const softBlueGreen = createGradientVariant(gradients.blueGreen, 75);
// const subtlePinkPurple = createGradientVariant(gradients.pinkPurple, 25); 