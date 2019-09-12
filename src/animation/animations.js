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
    x: '100%'
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
    width: '10rem',
    transition: {
      type: 'tween',
      duration: 0.2,
      ease: 'linear'
    }
  },
  hidden: {
    width: 0
  },
  exit: {
    width: 0
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
    y: -50,
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

export const header = {
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
