// date.js
export const formatDate = (input) => {
  if (!input) return "Tarih Yok";  
  const date = new Date(input);  
  return date.toLocaleDateString("tr-TR", {  
    year: "numeric",  
    month: "long",  
    day: "numeric"  
  });
};

