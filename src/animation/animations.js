export const slideInLeft = {
  visible: {
    x: 0,
    transition: {
      type: 'spring',
      damping: 30,
      mass: 1,
      stiffness: 250
    }
  },
  hidden: {
    x: '100%'
  },
  exit: {
    x: '100%',
    transition: {
      delay: 0.5
    }
  }
}

export const fadeIn = {
  visible: {
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.2,
      ease: 'linear'
    }
  },
  hidden: {
    opacity: 0
  },
  exit: {
    opacity: 0
  }
}

export const delay = {
  visible: {
    opacity: 1,
    transition: {
      duration: 1,
      delay: 1
    }
  },
  hidden: {
    opacity: 1
  },
  exit: {
    opacity: 1
  }
}

export const maskOutRight = {
  visible: {
    x: 1,
    transition: {
      type: 'tween',
      duration: 5
    }
  },
  hidden: {
    x: 0,
    transition: {
      type: 'tween',
      duration: 5
    }
  },
  exit: {
    x: 0,
    transition: {
      type: 'tween',
      duration: 5
    }
  }
}

export const fadeInLong = {
  visible: {
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.5,
      ease: 'linear'
    }
  },
  hidden: {
    opacity: 0
  },
  exit: {
    opacity: 0
  }
}

export const drawLine = {
  visible: {
    scaleX: 1,
    x: '12rem',
    y: '50%',
    transition: {
      type: 'tween',
      duration: 0.2,
      ease: 'linear'
    }
  },
  hidden: {
    scaleX: 0,
    x: '12rem',
    y: '50%'
  },
  exit: {
    scaleX: 0,
    x: '12rem',
    y: '50%'
  }
}

export const fadeInUp = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 30,
      mass: 1,
      stiffness: 100
    }
  },
  hidden: {
    opacity: 0,
    y: 50
  },
  exit: {
    opacity: 0,
    y: 50,
    transition: {
      type: 'spring',
      damping: 30,
      mass: 1,
      stiffness: 100
    }
  }
}

export const fadeInUpDelayed = {
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 30,
      mass: 1,
      stiffness: 100,
      delay: 0.2
    }
  },
  hidden: {
    opacity: 0,
    y: 50
  }
}

export const staggeredFadeInUp = {
  parent: {
    visible: {
      transition: {
        when: 'beforeChildren',
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    },
    hidden: {
      transition: {
        when: 'afterChildren'
      }
    }
  },
  child: {
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: 'spring',
        damping: 30,
        mass: 1,
        stiffness: 100
      }
    },
    hidden: {
      opacity: 0,
      y: 50
    }
  }
}

export const fadeInSlow = {
  visible: {
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.6,
      ease: 'linear'
    }
  },
  hidden: {
    opacity: 0
  },
  exit: {
    opacity: 0
  }
}

export const fadeInSlowDelayed = {
  visible: {
    opacity: 1,
    transition: {
      type: 'tween',
      duration: 0.6,
      ease: 'linear',
      delay: 0.3
    }
  },
  hidden: {
    opacity: 0
  },
  exit: {
    opacity: 0
  }
}

export const fadeInLeft = {
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: 'spring',
      damping: 30,
      mass: 1,
      stiffness: 100
    }
  },
  hidden: {
    opacity: 0,
    x: -20
  },
  exit: {
    opacity: 0,
    x: -20,
    transition: {
      type: 'spring',
      damping: 30,
      mass: 1,
      stiffness: 100
    }
  }
}
