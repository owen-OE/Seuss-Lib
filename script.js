function createElement (type, props, ...children) {
  const $el = document.createElement(type)
  Object.keys(props).forEach(prop => $el[prop] = props[prop])
  $el.append(...children)
  return $el
}

// HTML Elements
const $library = document.getElementById('library')
const $pages = document.getElementById('pages')

/**
 * createBooks
 * Creates a book element for each book in the provided array
 * Returns an array of all created elements. 
 * @param {array} books 
 * @returns {array}
 */
function createBooks (books) {
  return books.map(book => 
    createElement('div', {className: 'book'}, 
      createElement('img', {className: 'img-fluid', src: book.image, alt: book.title})))
}

/**
 * filterBooks
 * Checks each book's title or description contains the query
 * The books that pass are saved to an array and returned
 * @param {array} books 
 * @param {string} query 
 * @returns {array}
 */
function filterBooks (books, query) {
  return books.filter(book => 
    book.title.toLowerCase().includes(query.toLowerCase()) || 
    book.description.toLowerCase().includes(query.toLowerCase()))
}

/**
 * sortBooks
 * Sorts the books array based on the provided property key
 * Returns the sorted books array
 * @param {array} books 
 * @param {string} prop 
 * @returns {array}
 */
function sortBooks (books, prop) {
  return books.toSorted((a, b) => {
    if (a[prop] < b[prop]) {
      return -1
    } else if (a[prop] > b[prop]) {
      return 1
    }

    return 0
  })
}

/**
 * totalPages
 * Calculates the total number of pages for the books in the provided array
 * Returns the total
 * @param {array} books 
 * @returns {number}
 */
function totalPages (books) {
  return books.reduce((total, book) => total + book.pages, 0)
}

// Create Library
const filteredBooks = filterBooks(books, 'cat')
const sortedBooks = sortBooks(filteredBooks, 'title_sort')
const createdBooks = createBooks(sortedBooks)
const pages = totalPages(sortedBooks)
$pages.textContent = `${pages} total pages`
createdBooks.forEach(book => $library.append(book))