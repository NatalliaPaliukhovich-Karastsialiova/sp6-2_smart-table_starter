import {getPages} from "../lib/utils.js";

export const initPagination = ({pages, fromRow, toRow, totalRows}, createPage) => {

    const pageTemplate = pages.firstElementChild.cloneNode(true);
    pages.firstElementChild.remove();

    return (data, state, action) => {

      const rowsPerPage = state.rowsPerPage;
      const pageCount = Math.ceil(data.length / rowsPerPage);
      let page = state.page;

      if (action) switch(action.name) {
          case 'prev': page = Math.max(1, page - 1); break;
          case 'next': page = Math.min(pageCount, page + 1); break;
          case 'first': page = 1; break;
          case 'last': page = pageCount; break;
      }

      if((page - 1) * rowsPerPage > data.length) page = 1;

      const visiblePages = getPages(page, pageCount, 5);
      pages.replaceChildren(...visiblePages.map(pageNumber => {
          const el = pageTemplate.cloneNode(true);
          return createPage(el, pageNumber, pageNumber === page);
      }))


      fromRow.textContent = (page - 1) * rowsPerPage;
      toRow.textContent = (page * rowsPerPage <= data.length) ? page * rowsPerPage : data.length;
      totalRows.textContent = data.length;

      const skip = (page - 1) * rowsPerPage;
      return data.slice(skip, skip + rowsPerPage);
    }
}
