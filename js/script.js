document.addEventListener("DOMContentLoaded", () => {
  // Initialize app
  initializeApp();

  // Mobile menu functionality
  initializeMobileMenu();

  // Dashboard functionality
  initializeDashboard();

  // Study timer functionality
  initializeStudyTimer();

  // Goal management
  initializeGoals();

  // Animations and interactions
  initializeAnimations();
});

// App initialization
function initializeApp() {
  console.log("StudyHub initialized successfully!");

  // Load user preferences
  loadUserPreferences();

  // Update stats on page load
  updateStats();

  // Set up periodic updates
  setInterval(updateStats, 30000); 
}

// Mobile menu functionality
function initializeMobileMenu() {
  const burger = document.getElementById("burger");
  const menuOverlay = document.getElementById("menu-overlay");
  const closeOverlayBtn = menuOverlay?.querySelector(".close-overlay");

  if (!burger || !menuOverlay) return;

  burger.addEventListener("click", () => {
    burger.classList.toggle("active");
    menuOverlay.classList.add("show");
    menuOverlay.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  });

  closeOverlayBtn?.addEventListener("click", closeMenu);

  // Close menu with escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && menuOverlay.classList.contains("show")) {
      closeMenu();
    }
  });

  // Close menu when clicking outside
  menuOverlay.addEventListener("click", (e) => {
    if (e.target === menuOverlay) {
      closeMenu();
    }
  });

  function closeMenu() {
    burger.classList.remove("active");
    menuOverlay.classList.remove("show");
    menuOverlay.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
    burger.focus();
  }
}

// Dashboard functionality
function initializeDashboard() {
  // Sample data - in a real app, this would come from a database
  const dailyGoals = [
  ];

  const upcomingTasks = [
    
  ];

  // Load goals
  loadDailyGoals(dailyGoals);

  // Load upcoming tasks
  loadUpcomingTasks(upcomingTasks);

  // Update progress
  updateProgress();

  // Load motivational quote
  loadDailyQuote();
}

function loadDailyGoals(goals) {
  const goalsList = document.getElementById("daily-goals-list");
  if (!goalsList) return;

  goalsList.innerHTML = "";

  goals.forEach((goal, index) => {
    const li = document.createElement("li");
    li.textContent = goal;
    li.setAttribute("data-goal-id", index);

    // Add click handler to toggle completion
    li.addEventListener("click", () => {
      li.classList.toggle("completed");
      updateProgress();

      // Save to localStorage
      const completedGoals = getCompletedGoals();
      if (li.classList.contains("completed")) {
        completedGoals.add(index);
      } else {
        completedGoals.delete(index);
      }
      localStorage.setItem(
        "completedGoals",
        JSON.stringify([...completedGoals])
      );

      // Add celebration animation
      if (li.classList.contains("completed")) {
        createCelebrationEffect(li);
      }
    });

    // Check if goal was previously completed
    const completedGoals = getCompletedGoals();
    if (completedGoals.has(index)) {
      li.classList.add("completed");
    }

    goalsList.appendChild(li);
  });
}

function loadUpcomingTasks(tasks) {
  const tasksList = document.getElementById("upcoming-tasks-list");
  if (!tasksList) return;

  tasksList.innerHTML = "";

  // Sort tasks by due date
  tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));

  tasks.slice(0, 5).forEach((task) => {
    const li = document.createElement("li");

    const daysUntilDue = Math.ceil(
      (new Date(task.dueDate) - new Date()) / (1000 * 60 * 60 * 24)
    );
    const dueDateText =
      daysUntilDue === 0
        ? "დღეს"
        : daysUntilDue === 1
        ? "ხვალ"
        : daysUntilDue < 0
        ? "გადაცილებული"
        : `${daysUntilDue} დღეში`;

    li.innerHTML = `
            <div class="task-info">
                <span class="task-title">${task.title}</span>
                <span class="task-subject">${task.subject}</span>
            </div>
            <div class="task-meta">
                <span class="task-due-date ${
                  daysUntilDue <= 1 ? "urgent" : ""
                }">${dueDateText}</span>
                <span class="task-priority priority-${task.priority}"></span>
            </div>
        `;

    // Add CSS classes based on urgency
    if (daysUntilDue <= 1) {
      li.classList.add("urgent-task");
    } else if (daysUntilDue <= 3) {
      li.classList.add("soon-task");
    }

    tasksList.appendChild(li);
  });
}

function updateProgress() {
  const totalGoals = document.querySelectorAll("#daily-goals-list li").length;
  const completedGoals = document.querySelectorAll(
    "#daily-goals-list li.completed"
  ).length;
  const progressPercent =
    totalGoals > 0 ? Math.round((completedGoals / totalGoals) * 100) : 0;

  // Update progress bar
  const progressBar = document.getElementById("progress-bar");
  const progressText = document.getElementById("progress-text");
  const completedCount = document.getElementById("completed-count");
  const totalCount = document.getElementById("total-count");

  if (progressBar) {
    progressBar.style.width = progressPercent + "%";
  }

  if (progressText) {
    progressText.textContent = `თქვენი პროგრესი: ${progressPercent}%`;
  }

  if (completedCount) {
    completedCount.textContent = completedGoals;
  }

  if (totalCount) {
    totalCount.textContent = totalGoals;
  }
}

function loadDailyQuote() {
  const quotes = [
    {
      text: "განათლება არის ყველაზე ძლიერი იარაღი, რომლითაც შეგიძლია შეცვალო მსოფლიო.",
      author: "ნელსონ მანდელა",
    },
    {
      text: "ყველა დიდი მიღწევა თავდაპირველად იყო შეუძლებლად მიჩნეული.",
      author: "ნაპოლეონ ჰილი",
    },
    {
      text: "ცოდნა არის ძალა, მაგრამ ცოდნის გამოყენება არის ძალაუფლება.",
      author: "ფრენსის ბეკონი",
    },
    {
      text: "წარმატება არის სამუშაოს შედეგი, არა ნიჭის.",
      author: "თომას ედისონი",
    },
    {
      text: "ერთადერთი შეცდომა რაც შეგიძლია ჩაიდინო არის ის, რომ არაფერი არ სცადო.",
      author: "ალბერტ აინშტაინი",
    },
    {
      text: "წარმოსახვა ცოდნაზე მნიშვნელოვანია.",
      author: "ალბერტ აინშტაინი",
    }
  ];

  const today = new Date().getDate();
  const todayQuote = quotes[today % quotes.length];

  const quoteElement = document.querySelector("#daily-quote p");
  const authorElement = document.querySelector("#daily-quote cite");

  if (quoteElement && authorElement) {
    quoteElement.textContent = `"${todayQuote.text}"`;
    authorElement.textContent = `- ${todayQuote.author}`;
  }
}

// Study timer functionality
function initializeStudyTimer() {
  const timerBtn = document.getElementById("study-timer-btn");
  const modal = document.getElementById("study-timer-modal");
  const closeBtn = modal?.querySelector(".modal-close");

  if (!timerBtn || !modal) return;

  let timerInterval;
  let timeLeft = 25 * 60; 
  let isRunning = false;

  const minutesDisplay = document.getElementById("timer-minutes");
  const secondsDisplay = document.getElementById("timer-seconds");
  const startBtn = document.getElementById("timer-start");
  const pauseBtn = document.getElementById("timer-pause");
  const resetBtn = document.getElementById("timer-reset");
  const durationInput = document.getElementById("timer-duration");

  // Open modal
  timerBtn.addEventListener("click", () => {
    modal.classList.add("show");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
    updateTimerDisplay();
  });

  // Close modal
  closeBtn?.addEventListener("click", closeModal);
  modal?.addEventListener("click", (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("show")) {
      closeModal();
    }
  });

  function closeModal() {
    modal.classList.remove("show");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Timer controls
  startBtn?.addEventListener("click", startTimer);
  pauseBtn?.addEventListener("click", pauseTimer);
  resetBtn?.addEventListener("click", resetTimer);
  durationInput?.addEventListener("change", updateDuration);

  function startTimer() {
    if (!isRunning) {
      isRunning = true;
      startBtn.disabled = true;
      pauseBtn.disabled = false;

      timerInterval = setInterval(() => {
        timeLeft--;
        updateTimerDisplay();

        if (timeLeft <= 0) {
          completeTimer();
        }
      }, 1000);
    }
  }

  function pauseTimer() {
    if (isRunning) {
      isRunning = false;
      clearInterval(timerInterval);
      startBtn.disabled = false;
      pauseBtn.disabled = true;
    }
  }

  function resetTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    timeLeft = parseInt(durationInput?.value || 25) * 60;
    updateTimerDisplay();
    startBtn.disabled = false;
    pauseBtn.disabled = true;
  }

  function updateDuration() {
    if (!isRunning) {
      timeLeft = parseInt(durationInput?.value || 25) * 60;
      updateTimerDisplay();
    }
  }

  function updateTimerDisplay() {
    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    if (minutesDisplay) {
      minutesDisplay.textContent = minutes.toString().padStart(2, "0");
    }
    if (secondsDisplay) {
      secondsDisplay.textContent = seconds.toString().padStart(2, "0");
    }

    // Update page title when timer is running
    if (isRunning) {
      document.title = `${minutes.toString().padStart(2, "0")}:${seconds
        .toString()
        .padStart(2, "0")} - StudyHub`;
    } else {
      document.title = "StudyHub - სასწავლო პროცესის მართვა";
    }
  }

  function completeTimer() {
    isRunning = false;
    clearInterval(timerInterval);
    startBtn.disabled = false;
    pauseBtn.disabled = true;

    // Reset title
    document.title = "StudyHub - სასწავლო პროცესის მართვა";

    // Show completion notification
    showNotification("სესია დასრულდა! შესვენების დროა.", "success");

    // Play notification sound (optional)
    playNotificationSound();

    // Reset timer
    setTimeout(() => {
      resetTimer();
    }, 2000);
  }
}

// Goal management
function initializeGoals() {
  const addGoalBtn = document.getElementById("add-goal-btn");

  addGoalBtn?.addEventListener("click", () => {
    const goalText = prompt("შეიყვანეთ ახალი მიზანი:");
    if (goalText && goalText.trim()) {
      addNewGoal(goalText.trim());
    }
  });
}

function addNewGoal(goalText) {
  const goalsList = document.getElementById("daily-goals-list");
  if (!goalsList) return;

  const li = document.createElement("li");
  li.textContent = goalText;

  const goalId = Date.now(); 
  li.setAttribute("data-goal-id", goalId);

  // Add click handler
  li.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateProgress();

    // Save state
    const completedGoals = getCompletedGoals();
    if (li.classList.contains("completed")) {
      completedGoals.add(goalId);
      createCelebrationEffect(li);
    } else {
      completedGoals.delete(goalId);
    }
    localStorage.setItem("completedGoals", JSON.stringify([...completedGoals]));
  });

  goalsList.appendChild(li);
  updateProgress();

  // Save goals to localStorage
  const customGoals = getCustomGoals();
  customGoals.push({ id: goalId, text: goalText });
  localStorage.setItem("customGoals", JSON.stringify(customGoals));

  // Add entrance animation
  li.style.opacity = "0";
  li.style.transform = "translateY(-20px)";
  setTimeout(() => {
    li.style.transition = "all 0.3s ease";
    li.style.opacity = "1";
    li.style.transform = "translateY(0)";
  }, 10);
}

// Utility functions
function getCompletedGoals() {
  const saved = localStorage.getItem("completedGoals");
  return new Set(JSON.parse(saved || "[]"));
}

function getCustomGoals() {
  const saved = localStorage.getItem("customGoals");
  return JSON.parse(saved || "[]");
}

function updateStats() {
  // რეალური საგნების მიღება add.js-სთან შესაბამისი key-ით
  const subjectsFromStorage = JSON.parse(localStorage.getItem('studyHubSubjects') || '[]');
  const totalSubjectsCount = subjectsFromStorage.length;

  // დავალებების დათვლა (თუ subjects-ში assignments-ების სტრუქტურა არსებობს)
  let completedTasksCount = 0;
  let pendingTasksCount = 0;
  
  subjectsFromStorage.forEach(subject => {
    if (subject.assignments && Array.isArray(subject.assignments)) {
      subject.assignments.forEach(assignment => {
        if (assignment.completed) {
          completedTasksCount++;
        } else {
          pendingTasksCount++;
        }
      });
    }
  });

  // თუ assignments არ არსებობს, ვიყენებთ მოცემულ default მნიშვნელობებს ან ვუმატებთ ფუნქციონალს
  if (completedTasksCount === 0 && pendingTasksCount === 0) {
    // Default values ან localStorage-დან სხვა წყაროები
    completedTasksCount = parseInt(localStorage.getItem("completedTasks") || "0");
    pendingTasksCount = parseInt(localStorage.getItem("pendingTasks") || "0");
  }

  // Update header stats
  const totalSubjects = document.getElementById("total-subjects");
  const completedTasks = document.getElementById("completed-tasks");
  const pendingTasks = document.getElementById("pending-tasks");

  if (totalSubjects) totalSubjects.textContent = totalSubjectsCount;
  if (completedTasks) completedTasks.textContent = completedTasksCount;
  if (pendingTasks) pendingTasks.textContent = pendingTasksCount;

  // localStorage-ში სტატისტიკის შენახვა სინქრონიზაციისთვის
  localStorage.setItem("totalSubjects", totalSubjectsCount.toString());
  localStorage.setItem("completedTasks", completedTasksCount.toString());
  localStorage.setItem("pendingTasks", pendingTasksCount.toString());
}
function loadUserPreferences() {
  // Load any saved user preferences
  const preferences = JSON.parse(
    localStorage.getItem("userPreferences") || "{}"
  );

  // Apply preferences
  if (preferences.notifications) {
    requestNotificationPermission();
  }
}

function createRippleEffect(element) {
  const ripple = document.createElement("span");
  ripple.classList.add("ripple");
  element.style.position = "relative";
  element.style.overflow = "hidden";
  element.appendChild(ripple);

  setTimeout(() => {
    ripple.remove();
  }, 600);
}

function createCelebrationEffect(element) {
  // Create confetti effect
  const rect = element.getBoundingClientRect();
  const centerX = rect.left + rect.width / 2;
  const centerY = rect.top + rect.height / 2;

  for (let i = 0; i < 6; i++) {
    const confetti = document.createElement("div");
    confetti.innerHTML = "🎉";
    confetti.style.position = "fixed";
    confetti.style.left = centerX + "px";
    confetti.style.top = centerY + "px";
    confetti.style.fontSize = "20px";
    confetti.style.pointerEvents = "none";
    confetti.style.zIndex = "9999";
    confetti.style.transition = "all 1s ease-out";

    document.body.appendChild(confetti);

    setTimeout(() => {
      const angle = (i / 6) * 2 * Math.PI;
      const distance = 100;
      confetti.style.transform = `translate(${Math.cos(angle) * distance}px, ${
        Math.sin(angle) * distance
      }px) rotate(${Math.random() * 360}deg)`;
      confetti.style.opacity = "0";
    }, 10);

    setTimeout(() => {
      confetti.remove();
    }, 1000);
  }
}

function showNotification(message, type = "info") {
  // Create notification element
  const notification = document.createElement("div");
  notification.className = `notification notification-${type}`;
  notification.innerHTML = `
        <span class="notification-message">${message}</span>
        <button class="notification-close" aria-label="დახურვა">✕</button>
    `;

  // Add styles
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--card-bg-light);
        color: var(--text-light);
        padding: 1rem 1.5rem;
        border-radius: var(--border-radius);
        box-shadow: var(--shadow-light);
        border-left: 4px solid var(--${
          type === "success"
            ? "secondary"
            : type === "error"
            ? "accent"
            : "primary"
        }-color);
        z-index: 10000;
        display: flex;
        align-items: center;
        gap: 1rem;
        max-width: 300px;
        animation: slideInRight 0.3s ease-out;
    `;

  document.body.appendChild(notification);

  // Close functionality
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.style.animation = "slideOutRight 0.3s ease-out";
    setTimeout(() => notification.remove(), 300);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.style.animation = "slideOutRight 0.3s ease-out";
      setTimeout(() => notification.remove(), 300);
    }
  }, 5000);
}

function playNotificationSound() {
  // Create audio context for notification sound
  if (
    typeof AudioContext !== "undefined" ||
    typeof webkitAudioContext !== "undefined"
  ) {
    const audioContext = new (AudioContext || webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
    oscillator.frequency.setValueAtTime(600, audioContext.currentTime + 0.1);

    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(
      0.01,
      audioContext.currentTime + 0.3
    );

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  }
}

function requestNotificationPermission() {
  if ("Notification" in window && Notification.permission === "default") {
    Notification.requestPermission();
  }
}

function initializeAnimations() {
  // Add CSS for animations
  const style = document.createElement("style");
  style.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(100%);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(100%);
                opacity: 0;
            }
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.6);
            transform: scale(0);
            animation: rippleEffect 0.6s linear;
            pointer-events: none;
        }
        
        @keyframes rippleEffect {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
        
        .urgent-task {
            border-left-color: #ef4444 !important;
            background-color: rgba(239, 68, 68, 0.1) !important;
        }
        
        .soon-task {
            border-left-color: #f59e0b !important;
            background-color: rgba(245, 158, 11, 0.1) !important;
        }
        
        .task-info {
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
        }
        
        .task-title {
            font-weight: 600;
        }
        
        .task-subject {
            font-size: 0.8rem;
            opacity: 0.7;
        }
        
        .task-meta {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            font-size: 0.8rem;
        }
        
        .task-due-date.urgent {
            color: #ef4444;
            font-weight: 600;
        }
        
        .task-priority {
            width: 8px;
            height: 8px;
            border-radius: 50%;
        }
        
        .priority-high {
            background-color: #ef4444;
        }
        
        .priority-medium {
            background-color: #f59e0b;
        }
        
        .priority-low {
            background-color: #10b981;
        }
        
        .notification {
            animation: slideInRight 0.3s ease-out;
        }
    `;
  document.head.appendChild(style);

  // Intersection Observer for scroll animations
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = "1";
        entry.target.style.transform = "translateY(0)";
      }
    });
  }, observerOptions);

  // Observe elements for animation
  document
    .querySelectorAll(".feature-card, .dashboard-section")
    .forEach((el) => {
      el.style.opacity = "0";
      el.style.transform = "translateY(20px)";
      el.style.transition = "all 0.6s ease-out";
      observer.observe(el);
    });
}

// Export functions for use in other files
window.StudyHub = {
  showNotification,
  updateStats,
  createCelebrationEffect,
};

// სინქრონიზაციის event listeners-ების დამატება script.js-ში

// add.js-დან მომავალი custom events
window.addEventListener("subjectsUpdated", (e) => {
  console.log("Dashboard სინქრონიზაცია - საგნები განახლდა:", e.detail);
  updateStats();
});

// localStorage სინქრონიზაცია სხვა tabs-თან
window.addEventListener("storage", (e) => {
  if (e.key === "studyHubSubjects") {
    console.log("Dashboard - სტორიჯი განახლდა სხვა tab-იდან");
    updateStats();
  }
});

// BroadcastChannel სინქრონიზაცია
if (window.BroadcastChannel) {
  try {
    const channel = new BroadcastChannel('studyHub');
    channel.addEventListener('message', (e) => {
      if (e.data.type === 'dataSync') {
        console.log("Dashboard BroadcastChannel სინქრონიზაცია:", e.data);
        updateStats();
      }
    });
  } catch (error) {
    console.log("BroadcastChannel მხარდაჭერა არ არის:", error);
  }
}
