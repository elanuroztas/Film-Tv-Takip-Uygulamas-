// app.js
import { renderList, renderItem, filterList } from "./ui.js";
import { saveItem, updateItem, clearAllItems } from "./localStorage.js";

const form = document.getElementById("item-form");
const searchInput = document.getElementById("search");
const clearAllBtn = document.getElementById("clear-all");

document.addEventListener("DOMContentLoaded", () => renderList());

form.addEventListener("submit", (e) => {
  e.preventDefault();  //form gönderildiğinde sayfanın yenilenmesini engeller (e.preventDefault())
  const title = document.getElementById("title").value.trim();
  const genre = document.getElementById("genre").value.trim();
  const date = document.getElementById("date").value;
  const status = document.getElementById("status").value;
  const note = document.getElementById("note").value.trim();
  const rating = document.getElementById("rating").value;
  const id = form.getAttribute("data-edit-id");  //eğer form da düzenleme yapılacaksa ID burda tutulur.

  if (!title || !genre) return alert("Lütfen gerekli alanları doldurun!");

  const item = {
    id: id ? Number(id) : Date.now(),
    title, genre, date, status, note, rating
  };

  if (id) {
    updateItem(item); //eğer düzenleme yapılıyorsa updateItem, değilse saveItem çağrılır.
    form.removeAttribute("data-edit-id");
    form.querySelector("button").textContent = "Listeye Ekle"; //buton yazısı tekrar "listeye ekle olarak ayarlanır"
  } else {
    saveItem(item);
  }

  form.reset(); 
  renderList(); 
});

searchInput.addEventListener("input", () => {  
  filterList(searchInput.value.trim());  
});

clearAllBtn.addEventListener("click", () => {
  if (confirm("Tüm listeyi silmek istediğine emin misin?")) {  
    clearAllItems(); 
    renderList(); 
  }
});


