const STORAGE_KEY = "FOODFLOW_ORDERS";

// Initial default orders (20 realistic restaurant orders)
const DEFAULT_ORDERS = [
  { id: "ORD-101", customer: "Kwame Mensah", food: "Banku & Tilapia", table: 3, priority: "VIP", status: "Waiting", time: "10:15 AM" },
  { id: "ORD-102", customer: "Abena Serwaa", food: "Fried Rice & Chicken", table: 7, priority: "Normal", status: "Waiting", time: "10:20 AM" },
  { id: "ORD-103", customer: "Kofi Boateng", food: "Fufu & Light Soup", table: 2, priority: "Normal", status: "Preparing", time: "10:25 AM" },
  { id: "ORD-104", customer: "Akosua Pomaa", food: "Red Red & Plantain", table: 5, priority: "VIP", status: "Completed", time: "10:30 AM" },
  { id: "ORD-105", customer: "Yaw Frimpong", food: "Jollof Rice & Beef", table: 4, priority: "Normal", status: "Waiting", time: "10:32 AM" },
  { id: "ORD-106", customer: "Esi Amponsah", food: "Waakye with Wele & Fish", table: 8, priority: "VIP", status: "Waiting", time: "10:35 AM" },
  { id: "ORD-107", customer: "Kwaku Duah", food: "Banku & Grilled Octopus", table: 1, priority: "Normal", status: "Preparing", time: "10:38 AM" },
  { id: "ORD-108", customer: "Adwoa Ofori", food: "Yam Chips & Red Fish", table: 6, priority: "Normal", status: "Completed", time: "10:40 AM" },
  { id: "ORD-109", customer: "Nana Yaw", food: "Kenkey & Fried Fish", table: 9, priority: "VIP", status: "Waiting", time: "10:42 AM" },
  { id: "ORD-110", customer: "Maame Efua", food: "Ampesi & Kontomire", table: 10, priority: "Normal", status: "Waiting", time: "10:45 AM" },
  { id: "ORD-111", customer: "Kojo Appiah", food: "Fried Yam & Turkey Tail", table: 11, priority: "Normal", status: "Preparing", time: "10:48 AM" },
  { id: "ORD-112", customer: "Afia Sarpong", food: "Jollof Rice & Grilled Chicken", table: 12, priority: "VIP", status: "Completed", time: "10:50 AM" },
  { id: "ORD-113", customer: "Bismark Osei", food: "Banku & Pepper with Shitor", table: 14, priority: "Normal", status: "Waiting", time: "10:52 AM" },
  { id: "ORD-114", customer: "Cynthia Addo", food: "Fried Rice & Pork", table: 15, priority: "Normal", status: "Waiting", time: "10:55 AM" },
  { id: "ORD-115", customer: "Fiifi Baidoo", food: "Fufu & Goat Light Soup", table: 3, priority: "VIP", status: "Preparing", time: "10:58 AM" },
  { id: "ORD-116", customer: "Gifty Tetteh", food: "Waakye & Spaghetti", table: 4, priority: "Normal", status: "Completed", time: "11:00 AM" },
  { id: "ORD-117", customer: "Hassan Alidu", food: "Plain Rice & Stew", table: 8, priority: "Normal", status: "Waiting", time: "11:02 AM" },
  { id: "ORD-118", customer: "Priscilla Ansah", food: "Banku & Crab", table: 5, priority: "VIP", status: "Waiting", time: "11:05 AM" },
  { id: "ORD-119", customer: "Richmond Kwarteng", food: "Indomie & Egg Special", table: 7, priority: "Normal", status: "Preparing", time: "11:08 AM" },
  { id: "ORD-120", customer: "Sandra Owusu", food: "Grilled Tilapia & Chips", table: 2, priority: "VIP", status: "Completed", time: "11:10 AM" }
];

let orders = JSON.parse(localStorage.getItem(STORAGE_KEY)) || DEFAULT_ORDERS;

// Clock Updater
function updateClock() {
  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const timeEl = document.getElementById("time");
  if (timeEl) {
    timeEl.textContent = `${hours}:${minutes} ${ampm}`;
  }
}
setInterval(updateClock, 1000);
updateClock();

// Toast Notification System
function showToast(message) {
  const container = document.getElementById("toast-container");
  if (!container) return;
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `<i class="fa-solid fa-circle-info"></i> ${message}`;
  container.appendChild(toast);
  setTimeout(() => {
    toast.style.opacity = '0';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}

/* ==========================================
    SAVE ORDERS
==========================================*/
function saveOrders() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(orders));
  renderOrders();
}

// Reset Default Orders Function (Linked to top header button)
function resetDefaultOrders() {
  orders = JSON.parse(JSON.stringify(DEFAULT_ORDERS));
  saveOrders();
  showToast("Queue reset to 20 default orders!");
}

/* ==========================================
    RENDER DASHBOARD
==========================================*/
function updateDashboard() {
  const waiting = orders.filter(order => order.status === "Waiting").length;
  const preparing = orders.filter(order => order.status === "Preparing").length;
  const completed = orders.filter(order => order.status === "Completed").length;

  const waitingEl = document.getElementById("waitingCount");
  const preparingEl = document.getElementById("preparingCount");
  const completedEl = document.getElementById("completedCount");
  const totalEl = document.getElementById("totalCount");
  const queueSizeEl = document.getElementById("queueSize");

  if (waitingEl) waitingEl.textContent = waiting;
  if (preparingEl) preparingEl.textContent = preparing;
  if (completedEl) completedEl.textContent = completed;
  if (totalEl) totalEl.textContent = orders.length;
  if (queueSizeEl) queueSizeEl.textContent = `${waiting} Waiting`;
}

/* ==========================================
    RENDER ORDERS
==========================================*/
function renderOrders(list = orders) {
  const container = document.getElementById("orderList");
  if (!container) return;

  container.innerHTML = "";

  if (list.length === 0) {
    container.innerHTML = `
      <div class="empty">
          <i class="fa-solid fa-bowl-food"></i>
          <h3>No Orders Found</h3>
          <p>Try adding a new order or click 'Reset 20 Defaults'.</p>
      </div>
    `;
    updateDashboard();
    return;
  }

  list.forEach(order => {
    let badgeColor = "status waiting-status";
    if (order.status === "Preparing") {
      badgeColor = "status preparing-status";
    } else if (order.status === "Completed") {
      badgeColor = "status completed-status";
    }

    container.innerHTML += `
      <div class="order-card">
          <div class="order-top">
              <span class="order-id">
                  ${order.id} ${order.priority === 'VIP' ? '<span style="color:var(--orange); font-size:0.75rem;">★ VIP</span>' : ''}
              </span>
              <span class="${badgeColor}">
                  ${order.status}
              </span>
          </div>
          <div class="order-details">
              <div class="detail">
                  <strong>Customer</strong><br>
                  ${order.customer}
              </div>
              <div class="detail">
                  <strong>Food</strong><br>
                  ${order.food}
              </div>
              <div class="detail">
                  <strong>Table</strong><br>
                  Table ${order.table}
              </div>
              <div class="detail">
                  <strong>Priority</strong><br>
                  ${order.priority}
              </div>
              <div class="detail">
                  <strong>Time</strong><br>
                  ${order.time}
              </div>
          </div>
      </div>
    `;
  });

  updateDashboard();
}

/* ==========================================
    FIFO QUEUE ACTIONS
==========================================*/
function enqueueOrder() {
  const customerInput = document.getElementById("customerName");
  const foodInput = document.getElementById("foodOrder");
  const tableInput = document.getElementById("tableNumber");
  const priorityInput = document.getElementById("priority");

  const customer = customerInput.value.trim();
  const food = foodInput.value.trim();
  const table = tableInput.value.trim();
  const priority = priorityInput.value;

  if (!customer || !food || !table) {
    showToast("Please fill in all order fields!");
    return;
  }

  const now = new Date();
  let hours = now.getHours();
  const minutes = now.getMinutes().toString().padStart(2, '0');
  const ampm = hours >= 12 ? 'PM' : 'AM';
  hours = hours % 12 || 12;
  const timeStr = `${hours}:${minutes} ${ampm}`;

  const newOrder = {
    id: "ORD-" + Math.floor(100 + Math.random() * 900),
    customer,
    food,
    table,
    priority,
    status: "Waiting",
    time: timeStr
  };

  if (priority === "VIP") {
    const firstNormalIndex = orders.findIndex(o => o.priority === "Normal" && o.status === "Waiting");
    if (firstNormalIndex !== -1) {
      orders.splice(firstNormalIndex, 0, newOrder);
    } else {
      orders.push(newOrder);
    }
  } else {
    orders.push(newOrder);
  }

  customerInput.value = "";
  foodInput.value = "";
  tableInput.value = "";

  saveOrders();
  showToast(`Order ${newOrder.id} successfully added!`);
}

function processNextOrder() {
  const nextWaiting = orders.find(o => o.status === "Waiting");
  if (!nextWaiting) {
    showToast("No waiting orders in queue!");
    return;
  }
  nextWaiting.status = "Preparing";
  saveOrders();
  showToast(`Order ${nextWaiting.id} is now Preparing!`);
}

function completeFrontOrder() {
  const nextPreparing = orders.find(o => o.status === "Preparing") || orders.find(o => o.status === "Waiting");
  if (!nextPreparing) {
    showToast("No active orders to complete!");
    return;
  }
  nextPreparing.status = "Completed";
  saveOrders();
  showToast(`Order ${nextPreparing.id} marked as Completed!`);
}

function viewRearOrder() {
  const activeOrders = orders.filter(o => o.status !== "Completed");
  if (activeOrders.length === 0) {
    showToast("Queue is currently empty!");
    return;
  }
  const rearOrder = activeOrders[activeOrders.length - 1];
  showToast(`Rear Order: ${rearOrder.id} (${rearOrder.customer})`);
}

function clearQueue() {
  if (confirm("Are you sure you want to clear all completed and pending orders?")) {
    orders = [];
    saveOrders();
    showToast("Queue has been cleared.");
  }
}

/* ==========================================
    SEARCH FILTER LISTENER
==========================================*/
const searchInput = document.getElementById("searchInput");
if (searchInput) {
  searchInput.addEventListener("input", function () {
    const keyword = this.value.toLowerCase();
    const filtered = orders.filter(order =>
      order.customer.toLowerCase().includes(keyword) ||
      order.food.toLowerCase().includes(keyword) ||
      order.id.toLowerCase().includes(keyword) ||
      String(order.table).includes(keyword)
    );
    renderOrders(filtered);
  });
}

// Initial Render on load
document.addEventListener("DOMContentLoaded", () => {
  renderOrders();
});