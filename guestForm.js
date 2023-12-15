// import { createGuestList } from './data/guestdata.js'
const createGuestList = require('./data/guestdata.js')

const guestList = createGuestList()
function guestForm() {
  //provide initial guests data list created from GuestManagement class
  let guests = guestList

  // 1. register event for searching and adding
  function registerEventHandling() {
    const search = document.querySelector('#search-input')
    search.addEventListener('keyup', searchGuest)
    const addBtn = document.querySelector('#add-guest-btn')
    addBtn.addEventListener('click', addGuest)
  }

  // 2. Function to display one guest in the display area
  function displayGuest(guestItem) {
    const disDiv = document.querySelector('#display-area')
    const newG = document.createElement('div')
    const span1 = document.createElement('span')
    span1.textContent = `${guestItem.firstname} ${guestItem.lastname}`
    newG.appendChild(span1)

    const span2 = document.createElement('span')
    span2.setAttribute('class', 'remove-icon')
    span2.setAttribute('id', `${guestItem.firstname}-${guestItem.lastname}`)
    span2.setAttribute('style', 'cursor:pointer;color:red')
    span2.textContent = '[X]'
    span2.addEventListener('click', (event) => {
      removeGuest(event)
    })
    newG.appendChild(span2)

    disDiv.appendChild(newG)
  }

  // 3. Function to display all existing guests in the display area
  function displayGuests(guestResult) {
    const disDiv = document.querySelector('#display-area')
    disDiv.textContent = ''
    guestResult.forEach((x) => {
      displayGuest(x)
    })
  }

  // 4. Function to search and display matching guests
  function searchGuest(event) {
    const search = guestList.searchGuests(event.target.value)
    displayGuests(search)
  }

  // 5. Function to add a new guest
  function addGuest() {
    const fName = document.querySelector('#firstname-input')
    const lName = document.querySelector('#lastname-input')
    const addNewG = guests.addNewGuest(fName.value, lName.value)
    const newGuestObject = addNewG[addNewG.length - 1]
    displayGuest(newGuestObject)
    fName.value = ''
    lName.value = ''
  }

  // 6. Function to remove a guest
  function removeGuest(event) {
    const btnFire = event.target
    const deleteGuest = btnFire.id
    const FL = deleteGuest.split('-')
    const guestObj = { firstname: FL[0], lastname: FL[1] }
    guests.removeGuest(guestObj)
    displayGuests(guests.getAllGuests())
  }

  return {
    registerEventHandling,
    displayGuests,
    searchGuest,
    addGuest,
    removeGuest,
  }
}
module.exports = guestForm
// export { guestForm }
// const { registerEventHandling, displayGuests } = guestForm()
// registerEventHandling()
// displayGuests(guestList.getAllGuests())
