import {createComparison, defaultRules} from "../lib/compare.js";

const compare = createComparison(defaultRules);

export function initFiltering(elements, indexes) {

    Object.keys(indexes).forEach((elementName) => {
      elements[elementName].append(
        ...Object.values(indexes[elementName]).map(name => {
            const option = document.createElement('option');
            option.value = name;
            option.textContent = name;
            option.selected = false;
            return option;
          })
      )
    })

    return (data, state, action) => {
        if (action && action.type === 'reset') {
          Object.keys(indexes).forEach((elementName) => {
            [...elements[elementName].children].forEach((item) => {
              state[elements[elementName].name] = '';
              item.selected = item.value;
            })
          })
        }

        return data.filter(row => compare(row, state));
    }
}

export function initRangeFiltering(data, state, action) {
  return (data, state, action) => {

    const {totalFrom, totalTo} = state;

    return data.filter(row => {

      if (totalFrom && totalTo) {
        return row.total >= totalFrom && row.total <= totalTo;
      }
      if (totalFrom) {
        return row.total >= totalFrom;
      }
      if (totalTo) {
        return row.total <= totalTo;
      }

      return true;
    });
  }
}

