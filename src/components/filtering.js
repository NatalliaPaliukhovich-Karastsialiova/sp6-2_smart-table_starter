export function initFiltering(elements, indexes) {

  const updateIndexes = (elements, indexes) => {
    Object.keys(indexes).forEach((elementName) => {
        elements[elementName].append(...Object.values(indexes[elementName]).map(name => {
            const el = document.createElement('option');
            el.textContent = name;
            el.value = name;
            el.selected = false;
            return el;
        }))
    })
  }

  const applyFiltering = (query, state, action) => {

    const filter = {};
    Object.keys(elements).forEach(key => {
        if (elements[key]) {
            if (['INPUT', 'SELECT'].includes(elements[key].tagName) && elements[key].value) { // ищем поля ввода в фильтре с непустыми данными
                filter[`filter[${elements[key].name}]`] = elements[key].value; // чтобы сформировать в query вложенный объект фильтра
            }
        }
    })

    return Object.keys(filter).length ? Object.assign({}, query, filter) : query; // если в фильтре что-то добавилось, применим к запросу
  }

  return {
    updateIndexes,
    applyFiltering
  }
}
