const initialState = {
  tooltipData: [{
    label: 'B\'day Celebration Office',
    selected: true,
  }, {
    label: 'Home Grocery Daily Life',
    selected: false,
  }, {
    label: 'Marriage Anniversary',
    selected: false,
  }, {
    label: 'Daily Life Grocery',
    selected: false,
  }],
};

const tooltip = (state = initialState, action) => {
  switch (action.type) {
    case 'TOOLTIP_CHANGE': {
      const tooltipData = action.enableSelector ? state.tooltipData.map((param, i) => {
        const newData = param;
        if (i === action.value) {
          newData.selected = true;
          return newData;
        }
        newData.selected = false;
        return newData;
      }) : state.tooltipData;
      return { ...state, tooltipData };
    }
    case 'TOOLTIP_DATA': {
      const { tooltipData } = action;
      return { ...state, tooltipData };
    }
    default:
      return state;
  }
};

export default tooltip;
