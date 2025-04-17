// localStorage.js
export const getItems = () => {
  return JSON.parse(localStorage.getItem("watchlist")) || [];
};

export const saveItem = (item) => {
  const items = getItems();  //getItems ile daha önce saklanmış öğeleri alınıyor
  items.push(item);
  localStorage.setItem("watchlist", JSON.stringify(items));
//yerel depoya saklıyoruz.       
};

export const deleteItemById = (id) => {
  const items = getItems().filter(item => item.id !== id);
//localStorage deki tüm öğeleri alıyor,id ile eşlesen öğe listeden çıkarılır.
  localStorage.setItem("watchlist", JSON.stringify(items));
};

export const updateItem = (updatedItem) => {
  const items = getItems().map(item =>
    item.id === updatedItem.id ? updatedItem : item
  //eğer güncellenmek istenen öğenin id'sine eşitse, updateItem ile değiştiriliyor.
  );
  localStorage.setItem("watchlist", JSON.stringify(items));
};

export const clearAllItems = () => {
  localStorage.removeItem("watchlist");
};

// Görevi: Verileri tarayıcıda saklar.
// getItems() → Listeyi al
// saveItem() → Yeni öğe ekle
// deleteItemById() → ID’si verilen öğeyi sil
// updateItem() → Öğeyi güncelle
// clearAllItems() → Tüm listeyi temizle
