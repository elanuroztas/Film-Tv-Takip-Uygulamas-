// ui.js
import { formatDate } from "./utils/date.js";
import { getItems, deleteItemById } from "./localStorage.js";

const itemList = document.getElementById("item-list");
const form = document.getElementById("item-form");

export const renderItem = (item) => {
  const li = document.createElement("li"); 
  li.className = "list-group-item text-white bg-secondary mb-2 fade-in";
  li.setAttribute("data-id", item.id);  //data-id adlı özel bir html attribute(ekstra bir bilgi eklemek) ekliyor.

//    Bu satırda, oluşturulan <li> öğesinin içine HTML biçiminde içerik ekliyorum.
// Başlık, ...bilgisi dinamik olarak yazdırılıyor.
  li.innerHTML = `  
    <div class="d-flex justify-content-between align-items-center">
      <div>
        <h5>${item.title} <span class="badge ${item.status === "İzlendi" ? "badge-watched" : "badge-pending"}">${item.status}</span></h5>
        <p class="mb-1">${item.genre} | ${formatDate(item.date)}</p>

        
        ${item.note ? `<small class="d-block">${item.note}</small>` : ""}
        ${item.rating ? `<small class="d-block">${item.rating}/5</small>` : ""}
      </div>
      <div>
        <button class="btn btn-warning btn-sm me-2 edit-btn">Düzenle</button>
        <button class="btn btn-danger btn-sm delete-btn">Sil</button>
      </div>
    </div>
  `;

  li.querySelector(".delete-btn").addEventListener("click", () => {
    deleteItemById(item.id);
    renderList();
  });

  li.querySelector(".edit-btn").addEventListener("click", () => {
    document.getElementById("title").value = item.title;
    document.getElementById("genre").value = item.genre;
    document.getElementById("date").value = item.date;
    document.getElementById("status").value = item.status;
    document.getElementById("note").value = item.note;
    document.getElementById("rating").value = item.rating;
    form.setAttribute("data-edit-id", item.id);
    form.querySelector("button").textContent = "Güncelle";
  });

  itemList.appendChild(li);//listeye eklenir.
};

export const renderList = () => {
  itemList.innerHTML = "";  //innerhtml mevut içerikleri boşaltır
  const items = getItems();  //liste içindeki tüm öğeleri alınır.
  items.forEach(item => renderItem(item));
};

export const filterList = (searchTerm) => {  //arama terimini alarak filtreleme yapar
  const items = getItems();  //tüm öğeleri içeren bir diziye döndürür
  const filtered = items.filter(item => //belirli bir şarta göre süzerek yeni bir dizi oluşturur
    item.title.toLowerCase().includes(searchTerm.toLowerCase())   //toLowerCase=büyük küçük harf duyarlılığını kaldırır. includes(searchTerm) =eğer başlık içinde arama terimi geçiyorsa
  );
  itemList.innerHTML = "";  //itemlist adlı liste boşaltılır, böylecce eski öğeler kaldırılır
  filtered.forEach(item => renderItem(item));
};

// Görevi: Ekrana yazı yazmak ve butonlara işlev vermek.
// renderItem() → Tek bir öğeyi ekrana yazar (butonlarla birlikte)
// renderList() → Tüm listeyi ekrana yaz
// filterList() → Arama kutusuna göre filtrele
// "Düzenle" butonu tıklanınca → Form otomatik olarak doldurulur.
// "Sil" butonu tıklanınca → O öğe silinir.

