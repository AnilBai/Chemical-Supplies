let data = [{
  chemicalName: 'Ammonium Persulfate',
  vendor: 'LG Chem',
  density: '3525.92',
  viscosity: '60.361',
  packaging: 'Bag',
  packSize: '100.00',
  unit: 'kg',
  quantity: '6495.18'
},
{
  chemicalName: 'Caustic Potash',
  vendor: 'Formosa',
  density: '3172.15',
  viscosity: '48.22',
  packaging: 'Bag',
  packSize: '100.00',
  unit: 'kg',
  quantity: '8751.90'
},
];

let selectedRows = [];

function reassignIds() {
data.forEach((item, index) => {
  item.id = index + 1;
});
}

function renderTableData(data) {
const tableBody = document.querySelector("#chemicalTable tbody");
tableBody.innerHTML = '';

reassignIds();

data.forEach((item, index) => {
  const row = document.createElement('tr');
  row.dataset.index = index;
  row.innerHTML = `
  <td>${item.id}</td>
  <td>${item.chemicalName}</td>
  <td>${item.vendor}</td>
  <td>${item.density}</td>
  <td>${item.viscosity}</td>
  <td>${item.packaging}</td>
  <td>${item.packSize}</td>
  <td>${item.unit}</td>
  <td>${item.quantity}</td>
`;

  row.addEventListener('click', (event) => {
      if (event.ctrlKey || event.metaKey) {
          toggleRowSelection(row, index);
      } else if (event.shiftKey && selectedRows.length > 0) {
          const lastIndex = selectedRows[selectedRows.length - 1];
          const thisIndex = index;
          const start = Math.min(lastIndex, thisIndex);
          const end = Math.max(lastIndex, thisIndex);

          for (let i = start; i <= end; i++) {
              const rowToSelect = document.querySelector(`tr[data-index="${i}"]`);
              rowToSelect.classList.add('selected');
              if (!selectedRows.includes(i)) selectedRows.push(i);
          }
      } else {
          document.querySelectorAll('tr').forEach(tr => tr.classList.remove('selected'));
          selectedRows = [];
          toggleRowSelection(row, index);
      }
  });

  tableBody.appendChild(row);
});
}

function toggleRowSelection(row, index) {
row.classList.toggle('selected');
if (!selectedRows.includes(index)) {
  selectedRows.push(index);
} else {
  selectedRows = selectedRows.filter(i => i !== index);
}
}

renderTableData(data);

function sortTable(column) {
const isAscending = this.classList.toggle('asc');
data.sort((a, b) => {
  if (a[column] > b[column]) return isAscending ? 1 : -1;
  if (a[column] < b[column]) return isAscending ? -1 : 1;
  return 0;
});
renderTableData(data);
}

document.getElementById('sortId').addEventListener('click', () => sortTable.call(event.target, 'id'));
document.getElementById('sortChemicalName').addEventListener('click', () => sortTable.call(event.target, 'chemicalName'));
document.getElementById('sortVendor').addEventListener('click', () => sortTable.call(event.target, 'vendor'));

document.getElementById('addRow').addEventListener('click', () => {
const newRow = {
  chemicalName: prompt("Enter Chemical Name:"),
  vendor: prompt("Enter Vendor Name:"),
  density: prompt("Enter Density:"),
  viscosity: prompt("Enter Viscosity:"),
  packaging: prompt("Enter Packaging Type:"),
  packSize: prompt("Enter Pack Size:"),
  unit: prompt("Enter Unit:"),
  quantity: prompt("Enter Quantity:")
};

if (newRow.chemicalName && newRow.vendor) {
  data.push(newRow);
  renderTableData(data);
} else {
  alert("Invalid data");
}
});

document.getElementById('deleteRow').addEventListener('click', () => {
if (selectedRows.length > 0) {
  selectedRows.sort((a, b) => b - a);
  selectedRows.forEach(rowIndex => {
      data.splice(rowIndex, 1);
  });
  selectedRows = [];
  renderTableData(data);
} else {
  alert("Please select rows to delete.");
}
});

document.getElementById('moveRowUp').addEventListener('click', () => {
if (selectedRows.length > 0) {
  selectedRows.sort((a, b) => a - b);
  selectedRows.forEach(rowIndex => {
      if (rowIndex > 0) {
          [data[rowIndex], data[rowIndex - 1]] = [data[rowIndex - 1], data[rowIndex]];
      }
  });
  renderTableData(data);
} else {
  alert("Please select rows to move.");
}
});

document.getElementById('moveRowDown').addEventListener('click', () => {
if (selectedRows.length > 0) {
  selectedRows.sort((a, b) => b - a);
  selectedRows.forEach(rowIndex => {
      if (rowIndex < data.length - 1) {
          [data[rowIndex], data[rowIndex + 1]] = [data[rowIndex + 1], data[rowIndex]];
      }
  });
  renderTableData(data);
} else {
  alert("Please select rows to move.");
}
});

document.getElementById('refreshData').addEventListener('click', () => {
renderTableData(data);
selectedRows = [];
});

document.getElementById('saveData').addEventListener('click', () => {
localStorage.setItem('chemicalData', JSON.stringify(data));
alert("Data saved!");
});

window.addEventListener('load', () => {
const savedData = JSON.parse(localStorage.getItem('chemicalData'));
if (savedData) {
  data = savedData;
  renderTableData(data);
}
});