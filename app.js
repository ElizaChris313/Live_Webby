window.addEventListener("load", () => {
    const players = document.querySelectorAll('.player');
  
    players.forEach(player => {
      const audioElement = player.querySelector('audio');
      const playButton = player.querySelector(".player-play-btn");
      const playIcon = playButton.querySelector(".player-icon-play");
      const pauseIcon = playButton.querySelector(".player-icon-pause");
      const progress = player.querySelector(".player-progress");
      const progressFilled = player.querySelector(".player-progress-filled");
      const playerCurrentTime = player.querySelector(".player-time-current");
      const playerDuration = player.querySelector(".player-time-duration");
      const volumeControl = player.querySelector(".player-volume");
  
      const audioCtx = new AudioContext();
      const track = audioCtx.createMediaElementSource(audioElement);
      const gainNode = audioCtx.createGain();
  
      track.connect(gainNode).connect(audioCtx.destination);
  
      // Set times after page load
      setTimes();
  
      // Update progress bar and time values as audio plays
      audioElement.addEventListener("timeupdate", () => {
        progressUpdate();
        setTimes();
      });
  
      // Play button toggle
      playButton.addEventListener("click", () => {
        // Resume AudioContext if needed
        if (audioCtx.state === "suspended") {
          audioCtx.resume();
        }
  
        // Play or pause the track
        if (playButton.dataset.playing === "false") {
          audioElement.play();
          playButton.dataset.playing = "true";
          playIcon.classList.add("hidden");
          pauseIcon.classList.remove("hidden");
        } else {
          audioElement.pause();
          playButton.dataset.playing = "false";
          pauseIcon.classList.add("hidden");
          playIcon.classList.remove("hidden");
        }
      });
  
      // Reset the player when the track ends
      audioElement.addEventListener("ended", () => {
        playButton.dataset.playing = "false";
        pauseIcon.classList.add("hidden");
        playIcon.classList.remove("hidden");
        progressFilled.style.flexBasis = "0%";
        audioElement.currentTime = 0;
        setTimes();
      });
  
      // Update the gainNode value based on the volume control
      volumeControl.addEventListener("input", () => {
        gainNode.gain.value = volumeControl.value;
      });
  
      // Display currentTime and duration properties in real time
      function setTimes() {
        playerCurrentTime.textContent = formatTime(audioElement.currentTime);
        playerDuration.textContent = formatTime(audioElement.duration);
      }
  
      // Format time in mm:ss
      function formatTime(time) {
        const minutes = Math.floor(time / 60);
        const seconds = Math.floor(time % 60);
        return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
      }
  
      // Update player timeline progress visually
      function progressUpdate() {
        const percent = (audioElement.currentTime / audioElement.duration) * 100;
        progressFilled.style.flexBasis = `${percent}%`;
      }
  
      // Scrub player timeline to skip forward and back on click for easier UX
      let mousedown = false;
      function scrub(event) {
        const scrubTime = (event.offsetX / progress.offsetWidth) * audioElement.duration;
        audioElement.currentTime = scrubTime;
      }
      function scrubTouch(event) {
        const touch = event.touches[0];
        const scrubTime = ((touch.clientX - progress.getBoundingClientRect().left) / progress.offsetWidth) * audioElement.duration;
        audioElement.currentTime = scrubTime;
      }
  
        progress.addEventListener("click", scrub);
        progress.addEventListener("mousemove", (e) => mousedown && scrub(e));
        progress.addEventListener("mousedown", () => (mousedown = true));
        progress.addEventListener("mouseup", () => (mousedown = false));
        // Touch events for scrubbing
        progress.addEventListener("touchstart", () => (mousedown = true));
        progress.addEventListener("touchmove", (e) => mousedown && scrubTouch(e));
        progress.addEventListener("touchend", () => (mousedown = false));

                });
            }, false);
  
//fun lil javascript
//still fun
//more fun
//don't fuck with the above

document.addEventListener('DOMContentLoaded', function() {
    const players = document.querySelectorAll('.player',);
    
    // Define the list of messages
    const messages = [
      '❌: Why meeee?',
      '❌: error 816: bruh',
      '❌: nooooooooooooooo',
      '❌: ok, we get it',
      '❌: thats it!',
      '❌: im done',
      '❌: ...',
      '❌: ........',
      '❌: ....................... ............................................ ............................................ ............................................ ............................................ ............................................ ............................................ ............................................ ',
      '❌: 1 day away from retirement :(',
      '❌: thats all',
      '❌: no more',
      '❌: thanks for reading',
      '❌: hire me :)',
      '❌: lets pretend this never happened',
    ];
  
    players.forEach((player) => {
      const boxes = player.querySelectorAll('.small-green-box');
  
      boxes.forEach((box, index) => {
        box.addEventListener('click', function() {
          switch (index) {
            case 0:
              // First box behavior: 50% of viewport width
              player.style.width = '100vw';
              break;
            case 1:
              // Second box behavior: 5% of viewport width
              player.style.width = '15vw';
              break;
            case 2:
              // Third box behavior: transparent and overlay text
              player.style.opacity = '0'; // Semi-transparent
              cycleOverlayText(player); // Add overlay text
              break;
            default:
              // Default behavior
              player.style.opacity = '1'; // Fully opaque
          }
  
          // Restore the original state after 3 seconds
          setTimeout(function() {
            if (window.innerWidth <= 768) {
              // For mobile, reset to 90vw
              player.style.width = '90vw';
            } else {
              // For larger screens, reset to 30vw
              player.style.width = '40vw';
            }
            player.style.opacity = '1'; 
            // Remove overlay text
            const overlayText = player.querySelector('.overlay-text');
            if (overlayText) {
              overlayText.remove();
            }
          }, 3000); // 3000 milliseconds = 3 seconds
        });
      });
    });
  
    // Function to cycle through overlay text messages
    let currentIndex = 0; // Keep track of the current message index
  
    function cycleOverlayText(player) {
      // Add overlay text
      const overlay = document.createElement('div');
      overlay.className = 'overlay-text';
      overlay.textContent = messages[currentIndex];
      player.appendChild(overlay);
  
      // Update the message index for the next click
      currentIndex = (currentIndex + 1) % messages.length;
    }
  });
  
  


// GALLERY JAVASCRIPT
// GALLERY JAVASCRIPT
// GALLERY JAVASCRIPT
// GALLERY JAVASCRIPT
// GALLERY JAVASCRIPT

// Use MutationObserver to detect when galleries are dynamically added
function initializeGalleries() {
  const galleries = document.querySelectorAll('.gallery:not([data-gallery-initialized])');
  
  if (galleries.length === 0) {
    console.log('No new galleries found to initialize');
    return;
  }
  
  console.log(`Initializing ${galleries.length} galleries`);
  
  // Create overlay if it doesn't exist
  let overlay = document.querySelector('.overlay');
  if (!overlay) {
    overlay = document.createElement('div');
    overlay.className = 'overlay';
    document.body.appendChild(overlay);
    console.log('Created overlay element');
  }
  
  galleries.forEach(gallery => {
    // Mark gallery as initialized
    gallery.setAttribute('data-gallery-initialized', 'true');
    
    gallery.addEventListener('click', (e) => {
      console.log('Gallery clicked!');
      
      // Don't trigger if clicking directly on a small-green-box (but allow box-container)
      if (e.target.classList.contains('small-green-box')) {
        console.log('Clicked directly on green box, but still expanding gallery');
      }
      
      e.preventDefault();
      e.stopPropagation();
      
      // Toggle expanded state
      const isExpanded = gallery.classList.contains('expanded');
      
      // Remove expanded from all other galleries
      document.querySelectorAll('.gallery.expanded').forEach(g => {
        if (g !== gallery) {
          g.classList.remove('expanded');
        }
      });
      
      // Toggle this gallery
      gallery.classList.toggle('expanded');
      
      // Toggle overlay
      if (overlay) {
        overlay.classList.toggle('active', gallery.classList.contains('expanded'));
      }
      
      // Toggle body scroll
      document.body.style.overflow = gallery.classList.contains('expanded') ? 'hidden' : '';
      
      console.log('Gallery expanded:', gallery.classList.contains('expanded'));
    });
  });
  
  // Setup overlay click handler (only once)
  if (!overlay.hasAttribute('data-listener-added')) {
    overlay.setAttribute('data-listener-added', 'true');
    overlay.addEventListener('click', () => {
      console.log('Overlay clicked - closing gallery');
      const expandedGallery = document.querySelector('.gallery.expanded');
      if (expandedGallery) {
        expandedGallery.classList.remove('expanded');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
  }
  
  // Setup escape key handler (only once)
  if (!document.hasAttribute('data-escape-listener-added')) {
    document.setAttribute('data-escape-listener-added', 'true');
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        console.log('Escape key pressed');
        const expandedGallery = document.querySelector('.gallery.expanded');
        if (expandedGallery) {
          expandedGallery.classList.remove('expanded');
          const overlay = document.querySelector('.overlay');
          if (overlay) overlay.classList.remove('active');
          document.body.style.overflow = '';
        }
      }
    });
  }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('DOMContentLoaded - setting up gallery observer');
  
  // Initial check for galleries
  initializeGalleries();
  
  // Set up MutationObserver to watch for dynamically added galleries
  const observer = new MutationObserver((mutations) => {
    let shouldCheck = false;
    
    mutations.forEach(mutation => {
      if (mutation.type === 'childList' && mutation.addedNodes.length > 0) {
        shouldCheck = true;
      }
    });
    
    if (shouldCheck) {
      console.log('DOM changed, checking for new galleries');
      initializeGalleries();
    }
  });
  
  // Start observing the document body for changes
  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
  
  // Also check periodically in case MutationObserver misses something
  setTimeout(initializeGalleries, 1000);
  setTimeout(initializeGalleries, 3000);
});

// Also run when window loads completely
window.addEventListener('load', () => {
  console.log('Window loaded - checking for galleries');
  setTimeout(initializeGalleries, 500);
});

// NAVBAR JAVASCRIPT
// NAVBAR JAVASCRIPT
// NAVBAR JAVASCRIPT
// NAVBAR JAVASCRIPT
// NAVBAR JAVASCRIPT

document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.querySelector('.hamburger');
  const navLinks = document.querySelector('.nav-links');
  const dropdownLinks = document.querySelectorAll('[data-dropdown]');

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navLinks.classList.toggle('active');
  });

  dropdownLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        const dropdown = link.nextElementSibling;
        
        // Close all other dropdowns first
        dropdownLinks.forEach(otherLink => {
          if (otherLink !== link) {
            otherLink.nextElementSibling.classList.remove('active');
          }
        });
        
        // Toggle the clicked dropdown
        dropdown.classList.toggle('active');
      }
    });
  });
});