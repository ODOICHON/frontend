export const opacityVariants = {
  initial: {
    opacity: 0,
  },
  mount: {
    opacity: 1,
  },
};

export const toggleVariants = {
  initial: {
    right: -250,
  },
  visiable: {
    right: 0,
  },
  exit: {
    right: -250,
  },
};

export const dropdownVariants = {
  initial: {
    top: 0,
    opacity: 0,
  },
  visiable: {
    top: 30,
    opacity: 1,
  },
  exit: {
    top: 0,
    opacity: 0,
  },
};
export const myPageMenuVariants = {
  initial: {
    height: 0,
    opacity: 0,
    transition: {
      opacity: { delay: 0 },
      height: { delay: 0.12 },
    },
  },
  visiable: {
    height: 'auto',
    opacity: 1,
    transition: {
      opacity: { delay: 0.12 },
      height: { delay: 0 },
    },
  },
  exit: {
    height: 0,
    opacity: 0,
    transition: {
      opacity: { delay: 0 },
      height: { delay: 0.12 },
    },
  },
};

export const tradeDropdownVariants = {
  initial: {
    top: 35,
    opacity: 0,
  },
  visiable: {
    top: 65,
    opacity: 1,
  },
  exit: {
    top: 35,
    opacity: 0,
  },
};

export const DropdownVariants = {
  initial: {
    top: 0,
    opacity: 0,
  },
  visiable: {
    top: 'calc(100% + 1rem)',
    opacity: 1,
  },
  exit: {
    top: 0,
    opacity: 0,
  },
};

export const updownVariants = {
  initial: {
    top: 20,
    opacity: 0,
  },
  visiable: {
    top: 0,
    opacity: 1,
  },
  exit: {
    top: 20,
    opacity: 0,
  },
};
