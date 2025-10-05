const ddd = [
  "beauty",
  "fragrances",
  "furniture",
  "groceries",
  "home-decoration",
  "kitchen-accessories",
  "laptops",
  "mens-shirts",
  "mens-shoes",
  "mens-watches",
  "mobile-accessories",
  "motorcycle",
  "skin-care",
  "smartphones",
  "sports-accessories",
  "sunglasses",
  "tablets",
  "tops",
  "vehicle",
  "womens-bags",
  "womens-dresses",
  "womens-jewellery",
  "womens-shoes",
  "womens-watches"
]

const goo = []

for (let i = 0; i < ddd.length; i++) {
    ddd[i].split('-').forEach(word => {
        if (!goo.includes(word)) {
            goo.push(word);
        }
    });
}

console.log(goo);
    
