import {cloneTemplate} from "../lib/utils.js";

/**
 * Инициализирует таблицу и вызывает коллбэк при любых изменениях и нажатиях на кнопки
 *
 * @param {Object} settings
 * @param {(action: HTMLButtonElement | undefined) => void} onAction
 * @returns {{container: Node, elements: *, render: render}}
 */
export function initTable(settings, onAction) {
    const {tableTemplate, rowTemplate, before, after} = settings;
    const root = cloneTemplate(tableTemplate);

    before.reverse().forEach(subName => {
        root[subName] = cloneTemplate(subName);
        root.container.prepend(root[subName].container);
    });

    after.forEach(subName => {
        root[subName] = cloneTemplate(subName);
        root.container.append(root[subName].container);
    });

    root.container.addEventListener('change', (e) => {onAction()});
    root.container.addEventListener('reset', (e) => {
      setTimeout(() => onAction(e));

    });
    root.container.addEventListener('submit', (e) => {
      e.preventDefault();
      onAction(e.submitter);
    });

    const render = (data) => {
        const nextRows = data.map(item => {
          const {container, elements} = cloneTemplate('row');
          Object.keys(item).forEach(key => {
            if(elements[key]){
              elements[key].textContent = item[key];
            }
          })
          return container;
        })
        root.elements.rows.replaceChildren(...nextRows);
    }


    return {...root, render};
}
