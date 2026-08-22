const fs = require('fs');
const path = require('path');

const headers = [
  "Handle",
  "Title",
  "Body (HTML)",
  "Vendor",
  "Product Category",
  "Type",
  "Tags",
  "Published",
  "Option1 Name",
  "Option1 Value",
  "Option2 Name",
  "Option2 Value",
  "Option3 Name",
  "Option3 Value",
  "Variant SKU",
  "Variant Grams",
  "Variant Inventory Tracker",
  "Variant Inventory Qty",
  "Variant Inventory Policy",
  "Variant Fulfillment Service",
  "Variant Price",
  "Variant Compare At Price",
  "Variant Requires Shipping",
  "Variant Taxable",
  "Variant Barcode",
  "Image Src",
  "Image Position",
  "Image Alt Text",
  "Gift Card",
  "SEO Title",
  "SEO Description",
  "Google Shopping / Google Product Category",
  "Google Shopping / Gender",
  "Google Shopping / Age Group",
  "Google Shopping / MPN",
  "Google Shopping / AdWords Grouping",
  "Google Shopping / AdWords Labels",
  "Google Shopping / Condition",
  "Google Shopping / Custom Product",
  "Google Shopping / Custom Label 0",
  "Google Shopping / Custom Label 1",
  "Google Shopping / Custom Label 2",
  "Google Shopping / Custom Label 3",
  "Google Shopping / Custom Label 4",
  "Variant Image",
  "Variant Weight Unit",
  "Variant Tax Code",
  "Cost per item",
  "Status"
];

function escapeCsv(val) {
  if (val === undefined || val === null) return "";
  const str = String(val);
  if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

const productsCode = fs.readFileSync(path.join(__dirname, '../data/products.js'), 'utf8');
const productsMatch = productsCode.match(/export const PRODUCTS = (\[[\s\S]*?\]);/);

if (!productsMatch) {
  console.error("Could not find PRODUCTS in products.js");
  process.exit(1);
}

const products = eval(productsMatch[1]);
const csvLines = [headers.join(",")];

products.forEach((p, idx) => {
  const handle = p.id || `ekkayi-item-${idx + 1}`;
  const title = p.title || "";
  const bodyHtml = `<p>${(p.description || "").replace(/\n\n/g, "</p><p>").replace(/\n/g, "<br/>")}</p>`;
  const vendor = "EKKAYI";
  const type = p.groupName || "Furniture";
  const tags = `furniture, ${p.group || 'living'}, luxury, ${p.seatingCapacity || ''}`.replace(/,\s*,/g, ',').trim();
  const price = p.price || 25000;
  const comparePrice = p.originalPrice ? p.originalPrice.replace(/[^0-9]/g, '') : "";
  const sku = `EKKAYI-${1000 + idx}`;
  
  const images = (p.images && p.images.length > 0) ? p.images : [{ filePath: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=1000&q=80", fileName: title }];

  // Primary row (variant 1 + image 1)
  const primaryRow = {
    "Handle": handle,
    "Title": title,
    "Body (HTML)": bodyHtml,
    "Vendor": vendor,
    "Product Category": "Furniture",
    "Type": type,
    "Tags": tags,
    "Published": "TRUE",
    "Option1 Name": "Title",
    "Option1 Value": "Default Title",
    "Option2 Name": "",
    "Option2 Value": "",
    "Option3 Name": "",
    "Option3 Value": "",
    "Variant SKU": sku,
    "Variant Grams": "45000",
    "Variant Inventory Tracker": "shopify",
    "Variant Inventory Qty": "15",
    "Variant Inventory Policy": "deny",
    "Variant Fulfillment Service": "manual",
    "Variant Price": price,
    "Variant Compare At Price": comparePrice,
    "Variant Requires Shipping": "TRUE",
    "Variant Taxable": "TRUE",
    "Variant Barcode": "",
    "Image Src": images[0]?.filePath || "",
    "Image Position": "1",
    "Image Alt Text": title,
    "Gift Card": "FALSE",
    "SEO Title": `${title} | EKKAYI Artisanal Furniture`,
    "SEO Description": p.description ? p.description.slice(0, 160) : title,
    "Google Shopping / Google Product Category": "Furniture",
    "Google Shopping / Gender": "",
    "Google Shopping / Age Group": "",
    "Google Shopping / MPN": sku,
    "Google Shopping / AdWords Grouping": "",
    "Google Shopping / AdWords Labels": "",
    "Google Shopping / Condition": "new",
    "Google Shopping / Custom Product": "",
    "Google Shopping / Custom Label 0": "",
    "Google Shopping / Custom Label 1": "",
    "Google Shopping / Custom Label 2": "",
    "Google Shopping / Custom Label 3": "",
    "Google Shopping / Custom Label 4": "",
    "Variant Image": "",
    "Variant Weight Unit": "kg",
    "Variant Tax Code": "",
    "Cost per item": "",
    "Status": "active"
  };

  const line1 = headers.map(h => escapeCsv(primaryRow[h])).join(",");
  csvLines.push(line1);

  // Additional image rows
  for (let i = 1; i < images.length; i++) {
    const extraImgRow = {
      "Handle": handle,
      "Image Src": images[i].filePath,
      "Image Position": String(i + 1),
      "Image Alt Text": `${title} - View ${i + 1}`
    };
    const extraLine = headers.map(h => escapeCsv(extraImgRow[h] || "")).join(",");
    csvLines.push(extraLine);
  }
});

const outputPath = path.join(__dirname, '../../ekkayi-products-import.csv');
fs.writeFileSync(outputPath, csvLines.join("\n"), "utf8");
console.log(`Generated perfect Shopify CSV at ${outputPath} with ${csvLines.length - 1} rows!`);
